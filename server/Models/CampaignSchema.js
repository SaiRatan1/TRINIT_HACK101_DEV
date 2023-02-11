const mongoose = require('mongoose')
const { Schema } = mongoose;

const campaignSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    endingTime: {
        type: String,
        required: true
    },
    collectedFund: {
        type: Number,
        default: 0
    },
    reqFund: {
        type: Number,
        required: true
    },
    hostedBy: {
        type: Schema.Types.ObjectId,
        ref: 'NGO',
        required: true
    },
    paymentLink: {
        type: String,
        required: true
    }
})

const Campaign = mongoose.model('Campaign', campaignSchema)

module.exports = Campaign