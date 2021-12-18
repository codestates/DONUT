require("dotenv").config();
const { user, post, freetalk } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = async (req, res) => {
  const authorization = isAuthorized(req);

  
};