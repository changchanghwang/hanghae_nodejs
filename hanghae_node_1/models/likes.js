const mongoose = require('mongoose');

const { Schema } = mongoose;
const likeSchema = new Schema({
    cardId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("likes", likeSchema);