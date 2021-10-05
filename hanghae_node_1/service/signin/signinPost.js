const users = require('../../models/user');
const token = require('../../routers/controllers/tokenControllers/token');

exports.signinPost = async (req, res, next) => {
    const { id, pw } = req.body;
    try {
        let isExist = await users.find({ id, pw });
        if (isExist.length) {
            let accessToken = token.generateAccessToken(id);
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
