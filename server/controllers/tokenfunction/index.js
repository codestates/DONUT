require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // accessToken 발급
    return sign(data, process.env.ACCESS_SECRET, {expiresIn: '2h'});
  }
};