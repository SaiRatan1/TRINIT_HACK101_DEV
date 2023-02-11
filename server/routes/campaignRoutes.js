const express = require('express');
const { authenticateNGO } = require('../Middlewares/Authenticate');
const Campaign = require('../Models/CampaignSchema');
const NGO = require('../Models/NGOSchema');
const router = express.Router()

// Create Campaign
router.post('/create', authenticateNGO,
    async (req, res) => {
        try {
            const id = req.data.ngo.id;
            const campaign = new Campaign({ ...req.body, hostedBy: id })
            await campaign.save()
            const ngo = await NGO.findByIdAndUpdate(id, { $push: { campaigns: campaign._id } })
            res.json({ success: true, campaign })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

//Delete Campaign
router.delete('/:id', authenticateNGO,
    async (req, res) => {
        try {
            const { id } = req.params
            const campaign = await Campaign.findByIdAndDelete(id);
            if (!campaign) return res.status(404).send("No Camapign found")
            res.json({ deleted: true, campaign })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

// View Campaign
router.get('/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const campaign = await Campaign.findById(id)
            if (!campaign) res.status(404).send("No Camapign found")
            res.json(campaign)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)
module.exports = router