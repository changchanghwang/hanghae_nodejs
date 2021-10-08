const User = require('../../models/user');
const signupAuth = require('../../routers/controllers/signupControllers/signupValidation');
const {signupSchema} = require('../../routers/joi')

exports.signupPost =  async (req, res) => {
    const { userId, pw, pwCheck } = await signupSchema.validateAsync(req.body);
    if (signupAuth.idAuth(userId) && signupAuth.pwAuth(userId, pw, pwCheck)) {
        let isExist = await User.findOne({where:{ userId }});
        if (!isExist) {
            await User.create({ userId, pw });
            res.status(200).send({
                result: 'success',
            });
        } else {
            res.status(400).send({
                result: 'Fail',
                msg: '중복되는 아이디가 있습니다.',
            });
        }
    } else {
        res.status(400).send({
            result: 'Fail',
            msg: '아이디 또는 패스워드를 확인해주세요.',
        });
    }
};

//test db -> db 조회해서 해야 될때
//mock -> db에 생성해야 된다거나 할때

//api 관리