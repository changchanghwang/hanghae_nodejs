const jwt = require('jsonwebtoken')
require("dotenv").config();

const generateAccessToken =(id) =>{
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{
        algorithm: 'HS256',
        expiresIn: "5m"
    });
};

module.exports = generateAccessToken;