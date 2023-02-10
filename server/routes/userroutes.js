const express = require('express')
const router = express.Router()
const User = require('../Models/UserSchema')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const authenticate = require('../Middlewares/Authenticate')

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
            const authtoken = jwt.sign(data, JWT_KEY);
            res.json({ authtoken })
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
            if (!user)
                return res.status(400).json({ error: "Please try to login with correct credentials" });
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
            res.json({ success, authtoken })

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

module.exports = router