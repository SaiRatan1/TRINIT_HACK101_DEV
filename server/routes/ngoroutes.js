const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const NGO = require('../Models/NGOSchema')
const bcrypt = require('bcrypt')
mongoose.set('strictQuery', true)

// FETCH MULTIPLE NGOS
router.get('/fetchallngo', async (req, res) => {
    try {
        const ngos = await NGO.find();
        res.json(ngos);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})


// ADD NGO
router.post('/addngo',
    async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            req.body.password = secPass
            const ngo = new NGO(req.body)
            await ngo.save()
            res.json(ngo)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

// GET ONE NGO USING ID
router.get('/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const ngo = await NGO.findById(id);
            res.json(ngo);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
)

module.exports = router;