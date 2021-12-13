require('dotenv').config();
const { post, user } = require('../../models');

module.exports = async(req, res) => {
  const partPost = await post.findOne({where: {id: req.body.postId}});
  const userInfo = await user.findOne({where: { email: authorization.email, nickname: authorization.nickname }});

  const {id, nickname, email, image, manager, createdAt, updatedAt} = userInfo;

  if(!partPost) {
    res.status(404).json({data: null, message: 'not found!'});
  } else {
    // 임시! 작성자 닉네임 프로필 사진도 불러올것 (sequelize 손 보고!) 유저닉네임, 프로필이미지, 유저아이디(pk) 
    const postInfo = {userId: userInfo.id, image: userInfo.image ,nickname: userInfo.nickname,picture: partPost.picture, writing: partPost.writing};

    res.status(200).json({data: postInfo, message: 'found success!'});
  }
};