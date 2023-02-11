const express = require('express');
const { authenticateNGO } = require('../Middlewares/Authenticate');
const Campaign = require('../Models/CampaignSchema');
const router = express.Router()

// Create Campaign
router.post('/create', authenticateNGO,
    async (req, res) => {
        try {
            const id = req.data.ngo.id;
            const campaign = new Campaign({ ...req.body, hostedBy: id })
            await campaign.save()
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
module.exports = router