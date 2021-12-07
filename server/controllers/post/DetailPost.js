require('dotenv').config();
const { post } = require('../../models');

module.exports = async(req, res) => {
  const partPost = await post.findOne({where: {userId: req.body.userId, picture: req.body.picture}});

  if(!partPost) {
    res.status(404).json({data: null, message: 'not found!'});
  } else {
    // 임시! 작성자 닉네임 프로필 사진도 불러올것 (sequelize 손 보고!)
    const postInfo = {picture: partPost.picture, writing: partPost.writing};

    res.status(200).json({data: postInfo, message: 'found success!'});
  }
};