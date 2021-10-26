const passport = require('passport');
const local = require('./localStrategy');
// const kakao = require('./kakoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    //user => 로그인 사용자 정보
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { userId: id } })
      .then((user) => done(null, user)) //==>user는 req.user에 저장됨
      .catch((err) => done(err));
  });

  local();
  // kakao();
};
