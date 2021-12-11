require("dotenv").config();
const { post } = require("../../models");
const { isAuthorized } = require("../tokenfunction");

module.exports = async (req, res) => {
  // 내용 작성 후 share 버튼 누르면 내용 추가
  // body에 내용이 담겨 오겠지요?
  // picture, writing 으로 db에 되어있음
  //console.log(req)
  console.log("실행");
  // const authorization = isAuthorized(req);
  // const { picture, writing } = req.body;
  // console.log(picture, writing);

  // if (!authorization) {
  //   res.status(401).send({ message: "Invalid token!" });
  // } else if (!picture) {
  //   // 포스트의 주된 기능은 사진업로드!
  //   res.status(422).send({ message: "Required items not included!" });
  // } else {
  //   // ! 유저아이디 어떻게 채울지 확인요망 !
  //   console.log("여기");
  //   const userInfo = await user.findOne({
  //     where: { email: authorization.email, nickname: authorization.nickname },
  //   });

  //   const { id, nickname, email, image, manager, createdAt, updatedAt } =
  //     userInfo;
  //   const userId = id;
  //   console.log(userId);

  //   post.create({ userId, picture, writing });

  //   res.status(201).send({ message: "Post created!" });
  // }
};
