const mongoose = require('mongoose');

const { Schema } = mongoose;
const cardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    submitTime:{
        type:Number,
        required: true
    }
})

module.exports = mongoose.model("cards", cardSchema);