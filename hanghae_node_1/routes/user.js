const express = require('express');
const users = require('../schemas/user');
const generateAccessToken = require('../token/token');
const router = express.Router();


router.get('/signup', async(req, res)=>{
    res.render('signup')
})
router.post('/signup', async(req,res)=>{
    const {id, pw} =req.body;
    let isExist = await users.find({id});
    console.log(isExist.length);
    if(isExist.length==0){
        await users.create({id, pw});
        res.send({result:'success'});
    }else{
        res.send({result:'Fail'});
    }
})

router.get('/signin', async(req, res)=>{
    res.render('signin')
})
router.post('/signin',async(req, res)=>{
    const {id, pw} = req.body;
    let isExist = await users.find({id});
    if(isExist.length > 0){
        let accessToken = generateAccessToken(id);
        res.send({result:"success", accessToken:accessToken});
    }else{
        res.send("Fail");
    }
})


module.exports = router;