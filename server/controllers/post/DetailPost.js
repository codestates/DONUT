require("dotenv").config();
const { post, user } = require("../../models");

module.exports = async (req, res) => {
  console.log(req.body.postId);
  const partPost = await post.findOne({
    where: { id: req.body.postId },
  });
  const { id, userId, picture, writing, createdAt, updatedAt } = partPost;

  if (!partPost) {
    res.status(404).json({ data: null, message: "not found!" });
  } else {
    // 임시! 작성자 닉네임 프로필 사진도 불러올것 (sequelize 손 보고!) 유저닉네임, 프로필이미지, 유저아이디(pk)

    const userInfo = await user.findOne({
      where: { id: userId },
    });

    const { id, nickname, email, image, manager, createdAt, updatedAt } =
      userInfo;

    const postInfo = {
      nickname,
      image,
      picture,
      writing,
      createdAt,
    };

    res.status(200).json({ data: postInfo, message: "found success!" });
  }
};
