const express = require('express')
const router = express.Router()
const User = require('../Models/UserSchema')
const NGO = require('../Models/NGOSchema')

router.get('/:query?',
    async (req, res) => {
        try {
            const { query } = req.query
            let arr = ['.*', query, '.*']
            const reg = new RegExp(arr.join(''))
            const NGOS = await NGO.find({ "name": { $regex: reg, $options: 'is' } })
            if (NGOS === undefined) return res.status(500).send("Internal Server Error")
            return res.json(NGOS)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

module.exports = router