const User = require('../../models/user');
const token = require('../../routers/controllers/tokenControllers/token');
const {loginSchema} = require('../../routers/joi');

exports.signinPost = async (req, res, next) => {
    console.log(req.body);
    const { userId, pw } = await loginSchema.validateAsync(req.body);
    try {
        let isExist = await User.findOne({where:{ userId, pw }});
        if (isExist) {
            let accessToken = token.generateAccessToken(userId);
            await res.cookie('login_token', accessToken, {
                maxAge: 50 * 60 * 1000,
                httpOnly: true,
            });
            res.send({ result: 'success' });
        } else {
            res.send({ result: 'Fail' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
