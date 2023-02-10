const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
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
    paymentUPI: {
        type: String,
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;