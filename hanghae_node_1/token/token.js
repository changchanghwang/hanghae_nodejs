const jwt = require('jsonwebtoken')
require("dotenv").config();

const generateAccessToken =(id) =>{
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{
        algorithm: 'HS256',
        expiresIn: "5m"
    });
};

const authToken = (req, res, next) =>{
    const cookie = req.cookie;
    return jwt.verify()
}

module.exports = generateAccessToken;

// module.exports = {
//     generateAccessToken :
//     generteAccessToken =(id) =>{
//         return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{
//             algorithm: 'HS256',
//             expiresIn: "5m"
//         });
//     },
//     authToken:
//     async(req,res,next)=>{
//         const cookie = req.cookie;
//         return jwt.verify();
//     }
// }