const express = require('express');
const Card = require('../models/card');
const router = express.Router();
const loginAuth = require('../middlewares/loginAuth/loginAuth');
const { cardSchema } = require('./joi');

router.get('/', loginAuth.authTokenForRender, (req, res) => {
    res.render('submit');
});

router.post('/submit', loginAuth.authTokenForSend, async (req, res) => {
    const { title, desc, pw } = await cardSchema.validateAsync(req.body);
    const author = req.userInfo.id;
    const date = new Date();
    let now = date.toLocaleString();
    await Card.create({
        title,
        desc,
        date: now,
        author,
        pw,
    });
    res.status(200).send({ result: 'success' });
});

module.exports = router;
