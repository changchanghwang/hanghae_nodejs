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
    },
    author:{
        type:String,
        required: true
    },
    pw:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("cards", cardSchema);