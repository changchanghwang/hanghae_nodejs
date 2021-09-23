const express = require('express');
const router = express.Router();

router.get('/submit', (req,res)=>{
    res.render('submit')
})

module.exports = router;