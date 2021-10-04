const express = require('express');
const router = express.Router();
const users = require('../models/user');
const tokenController = require('./controllers/token');
const { signupPost } = require('../service/signupPost');

router
    .route('/signup')
    .get(async (req, res) => {
        res.render('signup');
    })
    .post(signupPost);

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
                res.send({ result: 'success' });
            } else {
                res.send({ result: 'Fail' });
            }
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
