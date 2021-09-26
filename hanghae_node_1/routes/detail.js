const express = require('express');
const cards = require('../schemas/cards');
const comments = require('../schemas/comment')
const router = express.Router();

router.post('/', async(req,res,next)=>{
    const {comment, cardId, commentDepth} = req.body;
    if(comment==""){
        console.log('error')
        res.send({result: "error"})
    }else{
        const date = new Date();
        let now = date.toLocaleString();
        const submitTime = date.getTime();
        const commentNumber = await comments.find({}).count();
        await comments.create({comment:comment, cardId:cardId, date:now,submitTime:submitTime,commentDepth:commentDepth, commentNumber:commentNumber});
        res.send({result:'success'});
    }
})

router.get('/', async(req, res)=>{
    const {cardId} = req.query;
    card = await cards.findOne({_id:cardId})
    const ment = await comments.find({cardId:cardId});
    res.render('detail', {card, ment})
})

module.exports = router;