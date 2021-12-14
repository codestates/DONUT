require("dotenv").config();
const { recentPrice, user } = require("../../models");
const { isAuthorized } = require("../tokenfunction");

module.exports = async (req, res) => {
  // 동일한 정보가 등록되지 않도록 findAll로 DB애서 확인하고 LP 데이터 저장하기?
  // findOrCreate로 찾아서 있으면 넘어가고 없으면 등록하기?
  // user의 manager가 true인 사람만 등록이 가능함

  // body에 담겨오는 정보들
  const { price, date, lpListId } = req.body;
  console.log(req.body);

  // 토큰확인
  const authorization = isAuthorized(req);

  if (!authorization) {
    res.status(401).send({ message: "Invalid token!" });
  } else if (!price || !date) {
    res.status(422).send({ message: "Required items not included!" });
  } else {
    // ! 유저아이디 어떻게 채울지 확인요망 !
    const userInfo = await user.findOne({
      where: { email: authorization.email },
    });
    const { id, nickname, email, image, manager, createdAt, updatedAt } =
      userInfo;
    const userId = id;
    recentPrice.create({ price, date, userId, lpListId });

    res.status(201).send({ message: "Freetalk created!" });
  }
};
