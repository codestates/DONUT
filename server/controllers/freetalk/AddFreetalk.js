require('dotenv').config();
const { freetalk } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = (req, res) => {
// 프리톡은 사진 없이 글만 쓰는곳
  // title, article, hashtag
  const authorization = isAuthorized(req);
  const {title, article, hashtag} = req.body;
    
  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  } else if(!title || !article) {
    res.status(422).send({message: 'Required items not included!'});
  } else {
    // ! 유저아이디 어떻게 채울지 확인요망 !
    freetalk.create({title, article, hashtag}); 

    res.status(201).send({message: 'Freetalk created!'});
  }
};