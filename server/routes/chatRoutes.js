const express = require('express')
const router = express.Router()

const User = require('../Models/UserSchema')
const Chat = require('../Models/ChatSchema')
const { authenticate } = require('../Middlewares/Authenticate')
const { CheckMembership } = require('../Middlewares/GroupMember')

// Send Message
router.post('/', authenticate, CheckMembership,
    async (req, res) => {
        try {
            const { message } = req.body
            let id;
            if (req.data.user) {
                id = req.data.user.id;
                const chat = new Chat({ message, sender_type: 'User', userId: id })
                await chat.save();
                await User.findByIdAndUpdate(id, { $push: { chats: chat._id } })
                res.json({ sender: 'User', id, chatId: chat._id, chatSaved: true });
            } else {
                id = req.data.ngo.id;
                const chat = new Chat({ message, sender_type: 'NGO', userId: id })
                await chat.save();
                await NGO.findByIdAndUpdate(id, { $push: { chats: chat._id } })
                res.json({ sender: 'NGO', id, chatId: chat._id, chatSaved: true });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

module.exports = router
