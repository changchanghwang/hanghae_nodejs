const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    generateAccessToken(id) {
        return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS512',
            expiresIn: '50m',
        });
    },
};