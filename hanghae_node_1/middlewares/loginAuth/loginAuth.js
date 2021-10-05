const jwt = require('jsonwebtoken');
require('dotenv').config();

//db 접근하는 코드는 엉망진창이라서 다시해야됨.
//테스트 db나 목을 구분지어서 사용해야 될 것 같음. mysql로 db 바꾸고 수정 예정

module.exports = {
    authTokenForRender(req, res, next) {
        const cookie = req.cookies.login_token;
        if (cookie === undefined) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(
                "<script>alert('로그인 해주세요.'); window.location.href='/user/signin'</script>"
            );
        } else {
            try {
                jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
                next();
            } catch (error) {
                next(error);
            }
        }
    },
    authTokenForSend(req, res, next) {
        const cookie = req.cookies.login_token;
        if (cookie === undefined) {
            res.send({ result: 'Error' });
        } else {
            try {
                req.userInfo = jwt.verify(
                    cookie,
                    process.env.ACCESS_TOKEN_SECRET
                );
                next();
            } catch (error) {
                next(error);
            }
        }
    },
}