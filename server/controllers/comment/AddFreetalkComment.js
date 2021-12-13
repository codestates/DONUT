require("dotenv").config();
const { user, freetalk, comment } = require("../../models");
const { isAuthorized } = require("../tokenfunction");

module.exports = async (req, res) => {
  // console.log(req.body);
  const authorization = isAuthorized(req);
  // console.log(authorization);
  if (!authorization) {
    res.status(401).send({ message: "Invalid token!" });
  } else {
    const userInfo = await user.findOne({
      where: { email: authorization.email, nickname: authorization.nickname },
    });
    const { id, nickname, email, image, manager, createdAt, updatedAt } =
      userInfo;
    const userId = id;
    comment.create({
      userId,
      freetalkId: req.body.talkId,
      content: req.body.comment,
    });
    res.status(201).json({ message: "Create freetalkcomment" });
  }
};
