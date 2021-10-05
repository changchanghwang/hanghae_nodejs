const express = require('express');
const router = express.Router();
const cards = require('../models/cards');
const jwt = require('jsonwebtoken');
const loginAuth = require('../middlewares/loginAuth/loginAuth');
const likes = require('../models/likes');

router.get('/', async (req, res) => {
    let card = await cards.find({}).sort('-submitTime');
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
    const likeExist = await likes.findOne({ cardId, userId });
    if (!likeExist) {
        await likes.create({ cardId, userId });
        let like = await likes.countDocuments({ cardId });
        await cards.updateOne({ _id: cardId }, { $set: { like } });
        res.send({ result: 'success' });
    } else if (likeExist) {
        await likes.deleteOne({ cardId, userId });
        let like = await likes.countDocuments({ cardId });
        await cards.updateOne({ _id: cardId }, { $set: { like } });
        res.send({ result: 'cancel'})
    }
});

module.exports = router;
