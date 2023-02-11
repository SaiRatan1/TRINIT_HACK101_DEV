const express = require('express')
const router = express.Router()
const User = require('../Models/UserSchema')
const NGO = require('../Models/NGOSchema')

router.get('/:q?',
    async (req, res) => {
        try {
            const { q } = req.query
            let arr = ['.*', q, '.*']
            const reg = new RegExp(arr.join(''))
            const NGOS = await NGO.find({ "name": { $regex: reg, $options: 'is' } })
            if (NGOS === undefined) return res.status(500).send("Internal Server Error")
            return res.json({ results: NGOS.length, NGOS })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

module.exports = router