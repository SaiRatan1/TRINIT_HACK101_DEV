const Group = require("../Models/GroupSchema")

const CheckMembership = async (req, res) => {
    const group = await Group.findById(req.param.id);
    if (!group) res.status(404).send("Group Not Found");
    if (req.data.ngo) {
        if (group.admin !== req.data.ngo.id) res.status(404).send("Not Authorized")
    }
    if (req.data.user) {
        if (!group.members.includes(req.data.user.id)) res.status(404).send("Not Authorized")
    }
    next()
}

module.exports = { CheckMembership }