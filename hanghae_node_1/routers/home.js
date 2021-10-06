const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const jwt = require('jsonwebtoken');
const loginAuth = require('../middlewares/loginAuth/loginAuth');
const Like = require('../models/like');

router.get('/', async (req, res) => {
    let card = await Card.findAll({ order: [['id', 'DESC']] });
    const cookie = req.cookies.login_token;
    let id = '';
    if (cookie === undefined) {
        res.render('home', { card, id });
    } else {
        id = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET).id;
        res.render('home', { card, id });
    }
});
router.get('/logout', async (req, res) => {
    res.clearCookie('login_token');
    res.send({ result: 'success' });
});
router.post('/like', loginAuth.authTokenForSend, async (req, res) => {
    const { cardId } = req.body;
    const userId = req.userInfo.id;
    const likeExist = await Like.findOne({ where: { cardId, userId } });
    if (!likeExist) {
        await Like.create({ cardId, userId });
        let like = await Like.count({ where: { cardId } });
        await Card.update({ like }, { where: { id:cardId } });
        res.send({ result: 'success' });
    } else if (likeExist) {
        await Like.destroy({ where: { cardId, userId } });
        let like = await Like.count({ where: { cardId } });
        await Card.update({ like }, { where: { id:cardId } });
        res.send({ result: 'cancel' });
    }
});

module.exports = router;
