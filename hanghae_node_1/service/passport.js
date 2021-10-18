const passport = require('passport');
const GitHubStrategy = require('passport-github');
const User = require('../models/user');
require('dotenv').config();
const token = require('../routers/controllers/tokenControllers/token');

//strategy를 미들웨어로
passport.use(
  new GitHubStrategy.Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // profile로 들어온 사용자 정보를 활용
        const { name, login: githubID, html_url: githubURL } = profile._json;
        console.log(profile._json);
        // 연결해둔 DB 내 User에서 검색
        let user = await User.findOne({ wehre: { githubID } });
        let tokens = await token.generateAccessToken(githubID);
        // User에 없으면 추가로 저장
        if (!user) {
          user = new User({
            userId: name,
            pw: 'asdf',
            githubID,
          }).save();
        }
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);
// user를 session에 저장
passport.serializeUser((user, done) => {
  done(null, user);
});
// 로그인 성공 후, 페이지 접근 시 수행됨. session에 저장된 값을 이용해 DB에서 사용자 정보를 가져와 Request에 넘겨준다
passport.deserializeUser((user, done) => {
  done(null, user);
});
