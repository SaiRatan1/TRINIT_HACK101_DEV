const mongoose = require('mongoose')
const { Schema } = mongoose;

const groupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'NGO',
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    chatsId: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }]
})

const Group = mongoose.model('Group', groupSchema);
module.exports = Group