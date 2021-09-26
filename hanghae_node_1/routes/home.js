const express = require('express');
const router = express.Router();
const cards = require('../schemas/cards')

router.get('/', async(req,res)=>{
    let card = await cards.find({}).sort("-submitTime");
    res.render('home',{card})
})

router.get('/submit', (req,res)=>{
    res.render('submit')
})

module.exports = router;