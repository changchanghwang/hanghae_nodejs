const express = require('express');
const cards = require('../models/cards');
const router = express.Router();
const loginAuth = require('../middlewares/loginAuth/loginAuth');

router.get('/', loginAuth.authTokenForRender, (req, res) => {
    res.render('submit');
});

router.post('/submit',loginAuth.authTokenForSend, async (req, res) => {
    const { title, desc, pw } = req.body;
    const author = req.userInfo.id
    const date = new Date();
    let now = date.toLocaleString();
    const submitTime = date.getTime();
    await cards.create({
        title: title,
        desc: desc,
        date: now,
        submitTime: submitTime,
        author: author,
        pw: pw,
    });
    res.send({ result: 'success' });
});

module.exports = router;
