require("dotenv").config();
const { freetalk } = require("../../models");
const { user } = require("../../models");

module.exports = async (req, res) => {
  console.log(req.body.talkId);
  const partFreetalk = await freetalk.findOne({
    where: { id: req.body.talkId },
  });
  const { id, userId, title, article, hashtag, createdAt, updatedAt } =
    partFreetalk;
  console.log(userId);

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

    partFreetalk.user = nickname;
    partFreetalk.Image = image;
    res.status(200).json({
      data: partFreetalk,
      message: "found success!",
    });
  }
};
