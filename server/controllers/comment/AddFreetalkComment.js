require("dotenv").config();
const { user, freetalk, comment } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = (req, res) => {
  // console.log(req.body);
  const authorization = isAuthorized(req);

  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  } else {
    comment.create({userId: authorization.userId, freetalkId: req.body.freetalkId, content: req.body.content});
    
    res.status(201).json({message: 'Create freetalkcomment'});
  }
};