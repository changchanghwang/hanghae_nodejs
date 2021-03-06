const jwt = require('jsonwebtoken');
require('dotenv').config();

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
            res.status(401).send({ result: 'Error' });
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
};
