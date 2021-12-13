require("dotenv").config();
const { isAuthorized } = require('../tokenfunction');

module.exports = (req, res) => {
  const authorization = isAuthorized(req);

  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  } else {
    // true 값만 넘기기
    res.status(200).json({data: true, message: 'LoginStatus is true!'});
  }
};