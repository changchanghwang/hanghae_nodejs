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
},
// {toObject:{virtuals:true}, toJSON:{virtuals: true}}
// );
// commentsSchema.virtual('comments',{
//     ref: 'comment',
//     localField: '_id',
//     foreignField: 'parentComment',
// });

// commentsSchema
//     .virtual('childComments')
//     .get(function(){
//         return this._childComments;
//     })
//     .set(function(v){
//         this._childComments == v;
//     }
)

module.exports = mongoose.model("comment", commentsSchema);