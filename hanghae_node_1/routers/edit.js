const express = require('express');
const cards = require('../models/card');
const router = express.Router();
const loginAuth = require('../middlewares/loginAuth/loginAuth');
const { cardSchema } = require('./joi');

//페이지 랜더링
router.get('/', loginAuth.authTokenForRender, async (req, res) => {
    const { cardId } = req.query;
    card = await cards.findOne({ where: { id: cardId } });
    res.render('edit', { card });
});

//api통신
router
    .route('/edt/:cardId')
    //수정
    .patch(async (req, res) => {
        const { cardId } = await req.params;
        const { pw, title, desc } = await cardSchema.validateAsync(req.body);
        const cardsExist = await cards.findAll({ id: cardId, pw });
        if (cardsExist.length) {
            await cards.update({ title, desc }, { where: { id: cardId } });
            res.send({ result: 'success' });
        } else {
            res.send({
                result: 'fail',
            });
        }
    });
//삭제

module.exports = router;
