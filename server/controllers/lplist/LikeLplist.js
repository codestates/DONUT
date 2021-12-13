require('dotenv').config();
const { lpList, user } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = async (req, res) => {

  // body에 담겨오는 정보들
  const {userId, lpListId} = req.body;

  // 토큰확인
  const authorization = isAuthorized(req);
  
  //유저찾기
  const findUser = await user.findOne({where: {email: authorization.email, nickName: authorization.nickname}});

  if(!authorization) {
    res.status(401).send({message: 'Invalid token'});
  } else {
    // findUser의 manger권한이 true(1)이면 등록가능
    if(findUser.manager === true) {
//       lplist.create({lpLike: lpLike});

      res.status(201).send({message: 'created success'});
    } else {
      res.status(401).send({message: 'You are not manager'});
    }
  }
};