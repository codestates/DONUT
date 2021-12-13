require('dotenv').config();
const { post } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = async (req, res) => {
  // 포스트 수정은 patch 메소드를 씀
  const authorization = isAuthorized(req);
  const postInfo = await post.findOne({
    where: {id: post.id}
  });

  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  } else {
    post.update({writing: req.body.writing}, {where: {id: postInfo.id}});

    res.status(201).json({message: 'Done!'});
  }
};