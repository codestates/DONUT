require('dotenv').config();
const { post } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.export = (req, res) => {
  // 포스트 수정은 patch 메소드를 씀
  const authorization = isAuthorized(req);
  // res.body

  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  }
};