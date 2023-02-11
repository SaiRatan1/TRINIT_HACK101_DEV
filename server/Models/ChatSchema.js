const mongoose = require('mongoose')
const { Schema } = mongoose;

const chatSchema = new Schema({
    sender_type: String,
    userId: {
        type: Schema.Types.ObjectId,
        refPath: 'sender_type',
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat