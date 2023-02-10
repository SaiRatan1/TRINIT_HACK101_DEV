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
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
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
    }
})

const NGO = mongoose.model('NGO', ngoSchema);
module.exports = NGO;
