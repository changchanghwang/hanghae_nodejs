const express = require('express');
const cards = require('../models/cards');
const router = express.Router();
const tokenController = require('./controllers/token');

router.get('/', tokenController.authToken, (req, res) => {
    res.render('submit');
});

router.post('/submit', async (req, res) => {
    const { title, desc, author, pw } = req.body;
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
