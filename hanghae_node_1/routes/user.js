const express = require('express');
const router = express.Router();


router.get('/signup', async(req, res)=>{
    res.render('signup')
})

router.get('/signin', async(req, res)=>{
    res.render('signin')
})

module.exports = router;