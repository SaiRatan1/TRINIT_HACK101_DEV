const express = require('express')
const router = express.Router()
const User = require('../Models/UserSchema')
const NGO = require('../Models/NGOSchema')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const { authenticate } = require('../Middlewares/Authenticate')

const maxAge = 24 * 60 * 60
// CREATE USER ACCOUNT
router.post('/create',
    async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            req.body.password = secPass
            const user = new User(req.body)
            await user.save()
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_KEY, { expiresIn: maxAge });
            res.cookie('jwt', authtoken, { httpOnly: true, maxAge: maxAge * 1000 })
            res.json({ authtoken, success: true })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

router.post('/login',
    async (req, res) => {
        try {
            let success = false;
            const { email, password } = req.body
            const user = await User.findOne({ email: email })
            if (!user) {
                const ngo = await NGO.findOne({ email })
                if (!ngo)
                    return res.status(400).json({ error: "Please try to login with correct credentials" });
                const passwordCompare = await bcrypt.compare(password, ngo.password);
                if (!passwordCompare) {
                    success = false
                    return res.status(400).json({ success, error: "Please try to login with correct credentials" });
                }
                success = true;
                const data = {
                    ngo: {
                        id: ngo.id
                    }
                }
                const authtoken = jwt.sign(data, JWT_KEY);
                res.cookie('jwt', authtoken, { httpOnly: true, maxAge: maxAge * 1000 })
                res.json({ success, ngoId: ngo.id, accountType: 'ngo' })
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }
            success = true;
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_KEY);
            res.cookie('jwt', authtoken, { httpOnly: true, maxAge: maxAge * 1000 })
            res.json({ success, userId: user.id, accountType: 'user' })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

// FETCH USER DATA WITH ID
router.get('/user/:id', authenticate,
    async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id).select('-password');
            if (!user) {
                return res.status(404).json({ error: "Page Not Found" });
            }
            return res.json(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

// logout
router.get('/logout',
    async (req, res) => {
        try {
            res.cookie('jwt', '', { maxAge: 1 })
            res.json({ logout: true })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

module.exports = router