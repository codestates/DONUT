require("dotenv").config();
const { user } = require("../../models");
const { generateAccessToken } = require("../tokenfunction");
const axios = require("axios");

module.exports = async (req, res) => {
  // 경로의 각 쿼리 문자열 매개 변수에 대한 속성이 포함 된 개체
  const code = req.body.authorizationCode;
  // console.log(code);

  try {
    // 카카오 로그인
    const result = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&code=${code}`
    );
    //console.log(result, "이거 맞음?");

    const userInfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `${result.data.token_type} ${result.data.access_token}`,
      },
    });

    const [findUser, exist] = await user.findOrCreate({
      where: {
        email: userInfo.data.kakao_account.email,
      },
      defaults: {
        nickname: userInfo.data.kakao_account.profile.nickname,
        email: userInfo.data.kakao_account.account_email,
        image: userInfo.data.kakao_account.profile.profile_image_url,
        manager: 0,
        // password: userInfo.data.id,
        // salt: userInfo.data.id,
      },
    });

    const payload = {
      email: findUser.email,
      nickname: findUser.nickname,
      image: findUser.image,
    };

    const token = generateAccessToken(payload);

    res
      .status(200)
      .cookie("jwt", token, {
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .json({ message: true });

    // uri의 특정한 문자를 utf-8로 인코딩해 하나, 둘, 셋 혹은 네 개의 연속된 이스케이프 문자로 나타냄

    const realQuery = encodeURIComponent(token);
    // res.redirect(`${process.env.ORIGIN}/?access_token=${realQuery}`);
  } catch (error) {
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
