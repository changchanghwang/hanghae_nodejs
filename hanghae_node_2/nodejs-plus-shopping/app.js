const Http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const { Op } = require('sequelize');
const { User, Goods, Cart } = require('./models');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const authMiddleware = require('./middlewares/auth-middleware');
const { disconnect } = require('process');

const app = express();
const http = Http.createServer(app);
const router = express.Router();

//회원가입
router.post('/users', async (req, res) => {
    const { nickname, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: '패스워드 확인란과 일치하지 않습니다.',
        });
        return;
    }
    const existUsers = await User.findAll({
        where: {
            [Op.or]: [{ nickname }, { email }],
        },
    });
    if (existUsers.length) {
        res.status(400).send({
            eroorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.',
        });
        return;
    }

    await User.create({ email, nickname, password });

    res.status(201).send({ result: 'success signup!' });
});

//로그인
const postAuthSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
router.post('/auth', async (req, res) => {
    try {
        const { email, password } = await postAuthSchema.validateAsync(
            req.body
        );
        const user = await User.findOne({ where: { email, password } });
        console.log(user);
        if (!user) {
            res.status(401).send({
                errorMessage: '이메일 또는 패스워드를 확인해주세요.',
            });
            return;
        }

        const token = jwt.sign({ userId: user.userId }, 'secret_key');
        res.send({
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            errorMessage: '에러',
        });
    }
});

//로그인 시 인증
router.get('/users/me', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user: {
            email: user.email,
            nickname: user.nickname,
        },
    });
});

//장바구니 뷰
router.get('/goods/cart', authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const cart = await Cart.findAll({
        where: { userId },
    });

    const goodsIds = cart.map((c) => c.goodsId);
    console.log(goodsIds);
    // 루프 줄이기 위해 Mapping 가능한 객체로 만든것
    const goodsKeyById = await Goods.findAll({
        where: {
            goodsId: goodsIds,
        },
    }).then((goods) =>
        goods.reduce(
            (prev, g) => ({
                ...prev,
                [g.goodsId]: g,
            }),
            {}
        )
    );
    res.send({
        cart: cart.map((c) => ({
            quantity: c.quantity,
            goods: goodsKeyById[c.goodsId],
        })),
    });
});

//디테일 뷰
router.get('/goods/:goodsId', async (req, res) => {
    const { goodsId } = req.params;
    let goods = await Goods.findOne({ where: { goodsId } });
    res.json({ goods: goods });
});

//물건뷰
router.get('/goods', authMiddleware, async (req, res) => {
    try {
        const { category } = req.query;
        console.log(req.query);
        console.log(typeof req.query);
        const goods = await Goods.findAll({
            order: [['goodsId', 'DESC']],
            where: category ? { category } : undefined,
        });
        res.json({ goods: goods });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//장바구니 담기
router.put('/goods/:goodsId/cart', authMiddleware, async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;
    const { userId } = res.locals.user;

    let isCart = await Cart.findAll({ where: { goodsId, userId } });
    if (isCart.length) {
        let item = await Cart.findOne({ where: { goodsId, userId } });
        let newItemQuantity = Number(item.quantity) + Number(quantity);
        await Cart.updateOne(
            { quantity: newItemQuantity },
            { where: { goodsId, userId } }
        );
    } else {
        await Cart.create({ goodsId: goodsId, quantity: quantity, userId });
    }
    res.send({ result: 'success' });
});

//삭제
router.delete('/goods/:goodsId/cart', authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { goodsId } = req.params;

    const isGoodsInCart = await Cart.findOne({ where: { goodsId, userId } });
    if (isGoodsInCart.length > 0) {
        await Cart.destroy({ where: { goodsId } });
    }

    res.send({ result: 'success' });
});

app.use('/api', express.urlencoded({ extended: false }), router);
app.use(express.static('assets'));

module.exports = http;