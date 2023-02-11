const mongoose = require('mongoose')
const { Schema } = mongoose;

const ngoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    website: {
        type: String
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    regNo: {
        type: String,
        required: true
    },
    panNo: {
        type: String,
        required: true
    },
    socialLinks: [{
        type: String
    }],
    category: {
        type: String,
        required: true
    },
    typeOfNGO: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    paymentUPI: {
        type: String,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    campaigns: [{
        type: Schema.Types.ObjectId,
        ref: 'Campaign'
    }]
})

const NGO = mongoose.model('NGO', ngoSchema);
module.exports = NGO;
