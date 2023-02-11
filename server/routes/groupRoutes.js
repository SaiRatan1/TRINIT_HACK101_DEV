const express = require('express')
const router = express.Router()
const { authenticateNGO, authenticateUser, authenticate } = require('../Middlewares/Authenticate')
const { CheckMembership } = require('../Middlewares/GroupMember')
const Group = require('../Models/GroupSchema')
const NGO = require('../Models/NGOSchema')
const User = require('../Models/UserSchema')

// create group
router.post('/create', authenticateNGO,
    async (req, res) => {
        try {
            const { name } = req.body
            const admin = req.data.ngo.id;
            const group = new Group({ name, admin })
            await group.save();
            const ngo = await NGO.findByIdAndUpdate(admin, { $set: { group: group._id } })
            console.log(group)
            res.json(group)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

// View Group
router.get('/:id', authenticate, CheckMembership,
    async (req, res) => {
        try {
            const group = await Group.findById(req.params.id).populate({ path: 'chatsId', select: 'message', populate: { path: 'userId', select: 'name' } })
            if (!group) res.status(404).send("Group Not Found");
            return res.json({ found: true, group })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

// join group
router.put('/:id/join', authenticateUser,
    async (req, res) => {
        try {
            const userId = req.data.user.id;
            const group = await Group.findByIdAndUpdate(req.params.id, { $push: { userId } })
            if (!group) return res.status(404).send('No such group exists')
            await User.findByIdAndUpdate(userId, { $push: { groups: req.params.id } })
            res.json({ groupId: req.params.id, joined: true })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

// Delete group
router.delete('/delete/:id', authenticateNGO,
    async (req, res) => {
        try {
            const group = await Group.findById(req.params.id)
            if (!group) return res.status(404).send('No such group exists')
            if (group.admin !== req.data.ngo.id) return res.status(404).send('Not Authorizeded')
            const deletedGrp = await Group.findByIdAndDelete(req.params.id)
            for (let userid in deletedGrp.members) {
                await User.findByIdAndUpdate(userid, { $pull: { groups: req.params.id } })
            }
            res.json({ msg: "group deleted", deletedGrp, success: true });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

// exit group
router.put('/:id/exit', authenticateUser,
    async (req, res) => {
        try {
            const userId = req.data.user.id;
            const group = await Group.findByIdAndUpdate(req.params.id, { $pull: { members: userid } })
            if (!group) return res.status(404).send('No such group exists')
            await User.findByIdAndUpdate(userId, { $pull: { groups: req.params.id } })
            res.json({ success: true });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

module.exports = router