const express = require('express');
const router = express.Router();
const { signupPost } = require('../service/signup/signupPost');
const { signinPost } = require('../service/signin/signinPost');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/passportLogin');

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  const { userId, pw, pwCheck } = req.body;
  if (pw === pwCheck) {
    try {
      const existUser = await User.findOne({ where: { userId } });
      if (existUser) {
        res.status(400).send({
          result: 'Fail',
          msg: '중복되는 아이디가 있습니다.',
        });
      }
      await User.create({
        userId,
        pw,
      });
    } catch (err) {
      next(err);
    }
  }
});

router.post('/signin', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(400).send({ result: 'Fail' });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).send({ result: 'success' });
    });
  });
});

router.route('/signup').get(async (req, res) => {
  res.render('signup');
});
//   .post(signupPost);

router.route('/signin').get(async (req, res) => {
  res.render('signin');
});
//   .post(signinPost);

module.exports = router;
