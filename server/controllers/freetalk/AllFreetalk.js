require("dotenv").config();
const { freetalk, comment } = require("../../models");

module.exports = async (req, res) => {
  // 클라이언트에서 get 요청 => 비회원도 이용할 수 있기 때문에 토큰 확인은 필요없음(단순 열람)
  // findAll
  try {
    // const commentCounter = async (id) => {
    //   let count = 0;
    //   const comments = await comment.findAll({
    //     where: { freetalkId: id },
    //   });
    //   count = comments.length ? Number(comments.length) : 0;
    //   return count;
    // };

    const wholeFreetalk = await freetalk.findAll({
      order: [["createdAt", "DESC"]],
    });

    // wholeFreetalk.forEach((e) => {
    //   commentCounter(e.dataValues.id).then((data) => {
    //     e.dataValues.commentCount = data;
    //   });
    //   console.log(e.dataValues.commentCount);
    // });
    // console.log(wholeFreetalk);
    res.status(200).json({ data: wholeFreetalk });
  } catch (err) {
    return res.status(501).json({ message: "서버 에러" });
  }
};
