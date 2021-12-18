require("dotenv").config();
const { lpList, user } = require("../../models");
const { isAuthorized } = require("../tokenfunction");

module.exports = async (req, res) => {
  // 동일한 정보가 등록되지 않도록 findAll로 DB애서 확인하고 LP 데이터 저장하기?
  // findOrCreate로 찾아서 있으면 넘어가고 없으면 등록하기?
  // user의 manager가 true인 사람만 등록이 가능함

  // body에 담겨오는 정보들
  console.log(req.body);
  const { genre, artist, albumTitle, sellingPrice, image } = req.body;

  // 토큰확인
  const authorization = isAuthorized(req);
  console.log(authorization)
  //유저찾기
  const findUser = await user.findOne({
    where: { email: authorization.email },
  });

  if (!authorization) {
    res.status(401).send({ message: "Invalid token" });
  } else {
    // findUser의 manager권한이 true(1)이면 등록가능
    if (findUser.manager) {
      lpList.create({
        genre: genre,
        artist: artist,
        albumTitle: albumTitle,
        sellingPrice: sellingPrice,
        image: image,
      });

      res.status(201).send({ message: "created success" });
    } else {
      res.status(401).send({ message: "You are not manager" });
    }
  }
};
