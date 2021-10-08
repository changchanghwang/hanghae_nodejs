const express = require('express');
const Card = require('../models/card');
const Comment = require('../models/comment');
const router = express.Router();
const loginAuth = require('../middlewares/loginAuth/loginAuth');
const jwt = require('jsonwebtoken');
const Like = require('../models/like');

router.route('/').get(async (req, res) => {
    const { cardId } = req.query;
    const cookie = req.cookies.login_token;
    let id = '';
    if (cookie === undefined) {
        const card = await Card.findOne({ where: { id: cardId } });
        const ment = await Comment.findAll({
            where: { cardId },
            order: [['id', 'DESC']],
        });
        res.render('detail', { card, ment, id });
    } else {
        const card = await Card.findOne({ where: { id: cardId } });
        id = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET).id;
        const ment = await Comment.findAll({
            where: { cardId },
            order: [['id', 'DESC']],
        });
        res.render('detail', { card, ment, id });
    }
});

router.delete('/del/:cardId', loginAuth.authTokenForSend, async (req, res) => {
    const { cardId } = req.params;
    const { pw } = req.body;
    const cardExist = await Card.findOne({ where: { id: cardId, pw: pw } });
    if (cardExist) {
        await Card.destroy({ where: { id: cardId } });
        await Comment.destroy({ where: { cardId } });
        await Like.destroy({ where: { cardId } });
        res.status(200).send({ result: 'success' });
    } else {
        res.status(400).send({ result: 'Fail' });
    }
});
module.exports = router;
