require("dotenv").config();
const { lplist, recentPrice, user } = require("../../models");
const { isAuthorized } = require("../tokenfunction");

module.exports = async (req, res) => {
  // recentPrice 컬럼 : userId, lpListId, price, date
  const authorization = isAuthorized(req);

  const userInfo = await user.findOne({
    where: { email: authorization.email },
  });

  const { id, nickname, email, image, manager, createdAt, updatedAt } =
    userInfo;
  const userId = userInfo.id;

  const lpInfo = await lplist.findOne({
    where: { albumTitle: authorization.albumTitle },
  });

  const lpId = lpInfo.id;
  console.log(lpId);

  if (!authorization) {
    res.status(401).send({ message: "Invalid token" });
  } else {
    // 토큰이 확인되면, 등록!
    recentPrice.create({
      userId: userId,
      lpListId: lpId,
      price: req.body.price,
      date: req.body.date,
    });

    res.status(201).send({ message: "Success add price!" });
  }
};
