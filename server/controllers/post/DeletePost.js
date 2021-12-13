require('dotenv').config();
const { post } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = (req, res) => {
  const authorization = isAuthorized(req);
  //const {postId: post_id} = req.params; // ! 클라이언트와 통신하면서 체크 필요

  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  } else {
    // delete 메소드 사용(client)
    // destroy(sequelize method)
    //await post.destroy({where: post_id}); // ! 클라이언트와 통신하면서 체크 필요
  }
};