require("dotenv").config();
const { freetalk } = require("../../models");

module.exports = async (req, res) => {
  // 클라이언트에서 get 요청 => 비회원도 이용할 수 있기 때문에 토큰 확인은 필요없음(단순 열람)
  // findAll

  try {
    const wholeFreetalk = await freetalk.findAll({ raw: true });
    res.status(200).json({ data: wholeFreetalk });
  } catch (err) {
    return res.status(501).json({ message: "서버 에러" });
  }
};
