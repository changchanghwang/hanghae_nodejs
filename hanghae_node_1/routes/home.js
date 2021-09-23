const express = require('express');
const router = express.Router();
const cards = require('../schemas/cards')

router.get('/', async(req,res)=>{
    let card = await cards.find({}).sort("-submitTime");
    console.log(card[0].title)
    res.render('home',{card})
})
// router.get('/view',async(req,res)=>{
//     res.json({card:card});
// })

module.exports = router;