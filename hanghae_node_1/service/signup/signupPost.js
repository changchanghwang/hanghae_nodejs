const users = require('../../models/user');
const signupAuth = require('../../routers/controllers/signupControllers/signupValidation');

exports.signupPost = async (req, res) => {
    const { id, pw, pwCheck } = req.body;
    if (signupAuth.idAuth(id) && signupAuth.pwAuth(id, pw, pwCheck)) {
        let isExist = await users.findOne({ id });
        console.log(isExist);
        if (!isExist) {
            await users.create({ id, pw });
            res.send({
                result: 'success',
            });
        } else {
            res.send({
                result: 'Fail',
                msg: '중복되는 아이디가 있습니다.',
            });
        }
    } else {
        res.send({
            result: 'Fail',
            msg: '아이디 또는 패스워드를 확인해주세요.',
        });
    }
};