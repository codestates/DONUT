require("dotenv").config();
const { freetalk } = require("../../models");
const { user, comment } = require("../../models");

module.exports = async (req, res) => {
  console.log(req.body.talkId);
  const partFreetalk = await freetalk.findOne({
    where: { id: req.body.talkId },
  });
  const { id, userId, title, article, hashtag, createdAt, updatedAt } =
    partFreetalk;
  // console.log(userId);

  if (!partFreetalk) {
    res.status(404).json({ data: null, message: "not found!" });
  } else {
    // 임시
    // console.log(partFreetalk.dataValues.userId);
    const userInfo = await user.findOne({
      where: { id: userId },
    });
    const { id, nickname, email, image, manager, createdAt, updatedAt } =
      userInfo;

    const comments = await comment.findAll({
      where: { freetalkId: req.body.talkId },
    });

    if (comments) {
      for (let prop of comments) {
        // console.log(prop.dataValues.userId);
        const commentUserInfo = await user.findOne({
          where: { id: prop.dataValues.userId },
        });
        prop.dataValues.nickname = commentUserInfo.dataValues.nickname;
      }
    }
    // console.log(comments);

    partFreetalk.dataValues.user = nickname;
    partFreetalk.dataValues.Image = image;
    console.log(partFreetalk.user);
    res.status(200).json({
      data: partFreetalk,
      comments: comments,
      message: "found success!",
    });
  }
};
