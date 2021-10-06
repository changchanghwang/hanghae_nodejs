const express = require('express');
const router = express.Router();
const { signupPost } = require('../service/signup/signupPost');
const { signinPost } = require('../service/signin/signinPost')

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
    .post(signinPost);

module.exports = router;
