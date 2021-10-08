const User = require('../../models/user');
const token = require('../../routers/controllers/tokenControllers/token');
const { loginSchema } = require('../../routers/joi');

exports.signinPost = async (req, res, next) => {
    const { userId, pw } = await loginSchema.validateAsync(req.body);
    try {
        let isExist = await User.findOne({ where: { userId, pw } });
        if (isExist) {
            let accessToken = token.generateAccessToken(userId);
            await res.cookie('login_token', accessToken, {
                maxAge: 50 * 60 * 1000,
                httpOnly: true,
            });
            res.status(200).send({ result: 'success' });
        } else {
            res.status(400).send({ result: 'Fail' });
        }
    } catch (err) {
        console.error(err);
        console.error(err.status)
        next(err);
    }
};
