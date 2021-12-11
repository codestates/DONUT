require('dotenv').config();
const { recentprice, user } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = async (req, res) => {
  // 동일한 정보가 등록되지 않도록 findAll로 DB애서 확인하고 LP 데이터 저장하기?
  // findOrCreate로 찾아서 있으면 넘어가고 없으면 등록하기?
  // user의 manager가 true인 사람만 등록이 가능함

  // body에 담겨오는 정보들
  const {price, date} = req.body;

  // 토큰확인
  const authorization = isAuthorized(req);
  
  //유저찾기
  const findUser = await user.findOne({where: {id: id, nickName: nickname}});

  if(!authorization) {
    res.status(401).send({message: 'Invalid token'});
  } else {
    // findUser의 manger권한이 true(1)이면 등록가능
    if(findUser.manager === true) {
      recentprice.create({price: price, date: date});

      res.status(201).send({message: 'created success'});
    } else {
      res.status(401).send({message: 'You are not manager'});
    }
  }
};