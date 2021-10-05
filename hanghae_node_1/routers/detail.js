const express = require('express');
const cards = require('../models/cards');
const comments = require('../models/comment');
const router = express.Router();
const loginAuth = require('../middlewares/loginAuth/loginAuth');
const jwt = require('jsonwebtoken');
const likes = require('../models/likes');

router.route('/').get(async (req, res) => {
    const { cardId } = req.query;
    const cookie = req.cookies.login_token;
    let id = '';
    if (cookie === undefined) {
        card = await cards.findOne({ _id: cardId });
        const ment = await comments
            .find({ cardId: cardId })
            .sort('-submitTime');
        res.render('detail', { card, ment, id });
    } else {
        card = await cards.findOne({ _id: cardId });
        id = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET).id;
        const ment = await comments
            .find({ cardId: cardId })
            .sort('-submitTime');
        res.render('detail', { card, ment, id });
    }
});

router.delete(
    '/del/:cardId',
    loginAuth.authTokenForSend,
    async (req, res) => {
        const { cardId } = req.params;
        const { pw } = req.body;
        const cardExist = await cards.find({ _id: cardId, pw: pw });
        if (cardExist.length) {
            await cards.deleteOne({ _id: cardId });
            await comments.deleteMany({ cardId: cardId });
            await likes.deleteMany({cardId});
            res.send({ result: 'success' });
        } else {
            res.send({ result: 'Fail' });
        }
    }
);
module.exports = router;
