const mongoose = require('mongoose');

const { Schema } = mongoose;
const commentsSchema = new Schema({
    comment:{
        type:String,
        required:true
    },
    cardId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cards',
        required:true
    },
    date:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
    },
    submitTime:{
        type:Number,
        required:true
    },
    ParentComment:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    },
    commentDepth:{
        type:Number,
        default:0
    },
    commentNumber:{
        type:Number,
    },
    edited:{
        type:Boolean,
        default:false,
    },
    editedTime:{
        type:String,
    },
})

module.exports = mongoose.model("comment", commentsSchema);