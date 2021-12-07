require('dotenv').config();
const { freetalk } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = (req, res) => {
  const authorization = isAuthorized(req);

  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  }
};