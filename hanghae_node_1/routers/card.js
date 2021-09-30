const express = require('express');
const cards = require('../schemas/cards');
const comments = require('../schemas/comment');
const router = express.Router();

router.post('/submit',async(req,res)=>{
    const { title, desc, author, pw } = req.body;
    console.log(req.body);
    console.log(title);
    const date = new Date();
    let now = date.toLocaleString();
    const submitTime = date.getTime();
    await cards.create({title:title, desc:desc,date:now, submitTime:submitTime, author:author, pw:pw})
    res.send({result:"success"});
})



router.route('/detail/:cardId')
    .get(async(req,res)=>{
        const {cardId} = req.params;
        const card = await cards.findOne({"_id":cardId});
        res.send({card:card})
    })
    .patch(async(req,res)=>{
        const {cardId} = await req.query;
        console.log(req.query);
        const {pw, title, desc, author} = req.body;
        console.log(req.body);
        console.log(pw, title, desc, author)
        const cardsExist = await cards.find({'_id':cardId, pw:pw})
        console.log(cardsExist);
        if(cardsExist.length > 0){
            await cards.updateOne({'_id':cardId},{$set:{title, desc, author}})
            res.send({result:"success"})
        }else{
            res.send({
                result:"fail"
            })
        }
    })
    .delete(async(req,res)=>{
        const {cardId} = req.params;
        const {pw} = req.body
        const cardExist = await cards.find({"_id":cardId, "pw":pw});
        if(cardExist.length >0){
            await cards.deleteOne({"_id":cardId});
            await comments.deleteMany({"cardId":cardId});
            res.send({result:"success"})
        }else{
            res.send({result:"fail"})
        }
    })


// router.get('/detail/:cardId', async(req, res)=>{
//     const {cardId} = req.params;
//     const card = await cards.findOne({"_id":cardId});
//     res.send({card:card})
// })

// router.patch('/detail/:cardId', async(req, res)=>{
//     const {cardId} = req.params;
//     const {pw, title, desc, author} = req.body;
//     const cardsExist = await cards.find({'_id':cardId, pw:pw})
//     if(cardsExist.length > 0){
//         await cards.updateOne({'_id':cardId},{$set:{title, desc, author}})
//         res.send({result:"success"})
//     }else{
//         res.send({
//             result:"fail"
//         })
//     }
// })

// router.delete('/detail/:cardId', async(req, res)=>{
//     const {cardId} = req.params;
//     const {pw} = req.body
//     const cardExist = await cards.find({"_id":cardId, "pw":pw});
//     if(cardExist.length >0){
//         await cards.deleteOne({"_id":cardId});
//         await comments.deleteMany({"cardId":cardId});
//         res.send({result:"success"})
//     }else{
//         res.send({result:"fail"})
//     }
// })

module.exports = router;