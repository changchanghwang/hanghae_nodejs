const express = require('express');
const cards = require('../schemas/cards');
const router = express.Router();

router.get('/', async(req, res)=>{
    const {cardId} = req.query;
    console.log(req.query);
    card = await cards.findOne({_id:cardId})
    res.render('detail', {card})
})

module.exports = router;