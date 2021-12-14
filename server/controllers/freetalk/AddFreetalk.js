require("dotenv").config();
const { freetalk } = require("../../models");
const { isAuthorized } = require("../tokenfunction");
const { user } = require("../../models");

module.exports = async (req, res) => {
  // 프리톡은 사진 없이 글만 쓰는곳
  // title, article, hashtag
  // console.log(req);
  const authorization = isAuthorized(req);
  const { title, article } = req.body;
  console.log(title, article, authorization);

  if (!authorization) {
    res.status(401).send({ message: "Invalid token!" });
  } else if (!title || !article) {
    res.status(422).send({ message: "Required items not included!" });
  } else {
    // ! 유저아이디 어떻게 채울지 확인요망 !
    const userInfo = await user.findOne({
      where: { email: authorization.email },
    });
    const { id, nickname, email, image, manager, createdAt, updatedAt } =
      userInfo;
    const userId = id;
    freetalk.create({ userId, nickname, title, article });

    res.status(201).send({ message: "Freetalk created!" });
  }
};
