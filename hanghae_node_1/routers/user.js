const express = require('express');
const router = express.Router();
const users = require('../models/user');
const tokenController = require('./controllers/token');
const signupAuth = require('./controllers/signupValidation');

router
    .route('/signup')
    .get(async (req, res) => {
        res.render('signup');
    })
    .post(async (req, res) => {
        const { id, pw, pwCheck } = req.body;
        if (signupAuth.idAuth(id) && signupAuth.pwAuth(id, pw, pwCheck)) {
            let isExist = await users.find({ id });
            if (!isExist.length) {
                await users.create({ id, pw });
                res.send({ result: 'success' });
            } else {
                res.send({
                    result: 'Fail',
                    msg: '중복되는 아이디가 있습니다.',
                });
            }
        } else {
            res.send({
                result: 'Fail',
                msg: '아이디 또는 패스워드를 확인해주세요.',
            });
        }
    });

router
    .route('/signin')
    .get(async (req, res) => {
        res.render('signin');
    })
    .post(async (req, res, next) => {
        const { id, pw } = req.body;
        try {
            let isExist = await users.find({ id, pw });
            if (isExist.length) {
                let accessToken = tokenController.generateAccessToken(id);
                await res.cookie('login_token', accessToken, {
                    maxAge: 50 * 60 * 1000,
                    httpOnly: true,
                });
                // res.redirect('/');
                res.send({result:"success"})
            } else {
                // res.writeHead(200, {
                //     'Content-Type': 'text/html; charset=utf-8',
                // });
                // res.write(
                //     "<script>alert('아이디 또는 패스워드를 확인해주세요.'); window.location.href='/user/signin'</script>"
                // );
                res.send({result:"Fail"})
            }
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
