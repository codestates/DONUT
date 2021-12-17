require("dotenv").config();
const { user } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = async (req, res) => {
  const authorization = isAuthorized(req);
  
  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  } else {
    const userInfo = await user.findOne({where: {email: authorization.email}});

    //console.log('여기?',userInfo.dataValues);
    res.status(200).json({data: userInfo.dataValues, message: 'Success find user!'});
  }
};