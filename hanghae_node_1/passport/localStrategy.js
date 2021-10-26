const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = () => {
  passport.use(
    new LocalStrategy({
      usernameField: 'userId',
      passwordField: 'pw',
    })
  ),
    async (userId, password, done) => {
      try {
        const existUser = await User.findOne({ where: { userId, password } });
        if (existUser) {
          done(null, existUser);
        } else {
          done(null, false, { message: '로그인 확인' });
        }
      } catch (err) {
        console.error(err);
        done(err);
      }
    };
};
