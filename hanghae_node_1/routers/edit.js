const express = require('express');
const cards = require('../models/cards');
const router = express.Router();
const tokenController = require('./controllers/token');

//페이지 랜더링
router.get('/', tokenController.authToken, async (req, res) => {
    const { cardId } = req.query;
    card = await cards.findOne({ _id: cardId });
    res.render('edit', { card });
});

//api통신
router
    .route('/edt/:cardId')
    //수정
    .patch(async (req, res) => {
        const { cardId } = await req.params;
        console.log(req.params);
        const { pw, title, desc, author } = req.body;
        const cardsExist = await cards.find({ _id: cardId, pw: pw });
        if (cardsExist.length) {
            await cards.updateOne(
                { _id: cardId },
                { $set: { title, desc, author } }
            );
            res.send({ result: 'success' });
        } else {
            res.send({
                result: 'fail',
            });
        }
    });
//삭제

module.exports = router;
