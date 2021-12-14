require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // accessToken 발급
    return sign(data, process.env.ACCESS_SECRET, {expiresIn: '8h'});
  },
  isAuthorized: (req) => {
    // JWT토큰 정보를 받아서 검증
    const authorization = req.cookies['jwt'];

    if(!authorization) {
      return null;
    }
    try {
      return verify(authorization, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  }
};