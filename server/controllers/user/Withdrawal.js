require("dotenv").config();
const { user } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = async (req, res) => {
  const authorization = isAuthorized(req);

  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  } else {
    user.destroy({where: {email: authorization.email, nickname: authorization.nickname}});

    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      domain: 'https://localhost:3000',
      path: '/'
    })
    .status(201).json({message: 'Success withdrawal!'});
  }
};