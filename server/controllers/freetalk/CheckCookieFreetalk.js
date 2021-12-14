require('dotenv').config();
const { isAuthorized } = require('../tokenfunction');

module.exports = (req, res) => {
  const authorization = isAuthorized(req);

  if(!authorization) {
    res.status(401).json({data: null, message: 'not authorized!'});
  } else {
    res.status(200).json({data: null, message: 'write freetalk!'});
  }
};