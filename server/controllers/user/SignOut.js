require("dotenv").config();
const { isAuthorized } = require("../tokenfunction");

module.exports = (req, res) => {
  // login status = true, 로그아웃 클릭시 axios.post로 진행
  const authorization = isAuthorized(req);

  if (!authorization) {
    res.status(401).send({ message: "Invalid token!" });
  } else {
    try {
      res
        .clearCookie("jwt", authorization, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          domain: "https://localhost:3000",
          path: "/",
        })
        .status(205)
        .json({ message: "Success sign out!" });
      // 205 = ResetContent
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error!" });
    }
  }
};
