const express = require('express');
const cards = require('../schemas/cards');
const router = express.Router();

router.get('/', async(req, res)=>{
    const {cardId} = req.query;
    card = await cards.findOne({_id:cardId})
    res.render('edit', {card})
})

module.exports = router;