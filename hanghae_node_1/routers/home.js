const express = require('express');
const router = express.Router();
const cards = require('../models/cards');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    let card = await cards.find({}).sort('-submitTime');
    const cookie = req.cookies.login_token;
    let id = '';
    if(cookie === undefined){
        res.render('home', { card, id });
    }else{
        id = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET).id;
        res.render('home', {card, id} )
    }
});
router.get('/logout', async(req,res)=>{
    res.clearCookie('login_token')
    res.send({result:"success"})
})

module.exports = router;
