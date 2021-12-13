require("dotenv").config();
const { user } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = async (req, res) => {
  // 유저 닉네임 수정
  // patch
  const authorization = isAuthorized(req);

  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  } else {
    user.update({nickname: req.body.nickname}, {where: {email: authorization.email}});

    res.status(201).json({message: 'Done!'});
  }
};