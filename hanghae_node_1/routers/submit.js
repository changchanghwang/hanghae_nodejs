const express = require('express');
const Card = require('../models/card');
const router = express.Router();
const loginAuth = require('../middlewares/loginAuth/loginAuth');

router.get('/', loginAuth.authTokenForRender, (req, res) => {
    res.render('submit');
});

router.post('/submit', loginAuth.authTokenForSend, async (req, res) => {
    const { title, desc, pw } = req.body;
    const author = req.userInfo.id;
    const date = new Date();
    let now = date.toLocaleString();
    await Card.create({
        title,
        desc,
        date:now,
        author,
        pw,
    });
    res.send({ result: 'success' });
});

module.exports = router;
