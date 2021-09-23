const express = require('express');
const cards = require('../schemas/cards')
const router = express.Router();


router.post('/submit',async(req,res)=>{
    console.log(req.body);
    const { title, desc, author, pw } = req.body;
    const date = new Date();
    const submitTime = date.getTime();
    console.log(submitTime)
    await cards.create({title:title, desc:desc, submitTime:submitTime, author:author, pw:pw})
    res.send({result:"success"});
})

module.exports = router;