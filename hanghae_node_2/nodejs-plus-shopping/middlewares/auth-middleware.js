const jwt = require('jsonwebtoken');
const {User} = require('../models');

module.exports = async (req,res,next) =>{
    console.log('미들웨어 지나감')
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');

    if(tokenType !== 'Bearer'){
        res.status(401),send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }

    try{
        const { userId } = jwt.verify(tokenValue,"secret_key");
        User.findByPk(userId)
            .then((user)=>{
                res.locals.user = user;
                next();
            });
        // if(!user){
        //     res.status(401).send({
        //         errorMessage: '로그인 후 사용하세요',
        //     });
        //     return;
        // }
    }catch (error){
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }
};