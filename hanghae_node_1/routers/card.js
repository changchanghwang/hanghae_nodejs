const express = require('express');
const cards = require('../schemas/cards')
const router = express.Router();

router.post('/submit',async(req,res)=>{
    const { title, desc, author, pw } = req.body;
    const date = new Date();
    let now = date.toLocaleString();
    const submitTime = date.getTime();
    await cards.create({title:title, desc:desc,date:now, submitTime:submitTime, author:author, pw:pw})
    res.send({result:"success"});
})

router.get('/detail/:cardId', async(req, res)=>{
    const {cardId} = req.params;
    const card = await cards.findOne({"_id":cardId});
    console.log(card)
    res.send({card:card})
})

router.patch('/detail/:cardId', async(req, res)=>{
    const {cardId} = req.params;
    const {pw, title, desc, author} = req.body;
    console.log(cardId, pw);
    const cardsExist = await cards.find({'_id':cardId, pw:pw})
    if(cardsExist.length > 0){
        await cards.updateOne({'_id':cardId},{$set:{title, desc, author}})
    }
    const card = await cards.find({'_id':cardId})
    res.send({result:"success", card:card})
})

router.delete('/detail/:cardId', async(req, res)=>{
    const {cardId} = req.params;
    const {pw} = req.body
    const cardExist = await cards.find({"_id":cardId, "pw":pw});
    if(cardExist.length >0){
        await cards.deleteOne({"_id":cardId});
        res.send({result:"success"})
    }
})

module.exports = router;