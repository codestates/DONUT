require("dotenv").config();

module.exports = async (req, res) => {
  return res.redirect(
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&&response_type=code`
  );
};

/*
//"use strict"; // 안전한 코딩을 위한 가이드라인, 상대적으로 안전하지 않은 액션 발생 방지, 정확하게 고려되지 않은 기능들을 비활성화
require('dotenv').config();
const axios = require('axios');
const { user } = require('../../models');
const { generateAccessToken } = require('../tokenfunction');

module.exports = {
  // 클라이언트에서 전달해준 인가코드로 토큰 받기
  getToken: async (req, res) => {
    //console.log(req.body.authorizationCode);

    const code = req.body.authorizationCode;
    console.log(code, "코드 존재하나?");

    const clientId = process.env.REST_API_KEY;
    const redirectUri = process.env.REDIRECT_URI;
    const grantType = process.env.GRANT_TYPE;

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grantType=${grantType}&cliendId=${clientId}&redirectUri=${redirectUri}&code=${code}`,
        {
          headers: {
            accept: "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log(res);
        res.status(200).json({ accessToken: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // 받은 토큰으로 사용자 정보 가져오기
  getUserInfo: async (req, res) => {
    try {
      const userInfo = await axios.get(
        `https://kapi.kakao.com/v2/user/me?access_token=${req.query.accessToken}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      const email = userInfo.data.kakao_account.email;
      const nickName = userInfo.data.kakao_account.profile.nickname;
      const image = userInfo.data.kakao_account.profile.profile_image;

      const result = await user.findOne({ where: { email, nickName } });

      if (result) {
        // 유저정보가 있을 때
        const accessToken = generateAccessToken(result.dataValues);

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
        });
      } else {
        // 최초 로그인 회원가입 진행
        const userInfo = { email, nickName, image };
        user.create(userInfo);
        const accessToken = generateAccessToken(userInfo);

        res
          .cookie("accessToken", accessToken, { httpOnly: true })
          .status(201)
          .json({ data: userInfo, message: "create ok" });
      }
    } catch (err) {
      console.log(err);
    }
  },
};


    const clientSecret = process.env.CLIENT_SECRET;
    // 카카오로 인가코드 보내서 토큰 요청..
    await axios.post(`https://kauth.kakao.com/oauth/token`, JSON.parse({
      grant_type: grantType,
      client_id: clientId,
      redirect_uri: redirectUri,
      code: code,
      client_secret: clientSecret
    }))
    .then((res) => {
      console.log(res.data.data);
      //res.status(200).json({accessToken: res.data})
    })
    .catch((err) => {
      console.log(err);
    })
  },
  // 받은 토큰으로 사용자 정보 가져오기
  // getUserInfo: async (req, res) => {
  //   try {
  //     const userInfo = await axios.get(`https://kapi.kakao.com/v2/user/me?access_token=${req.query.accessToken}`, 
  //       {headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
  //     });
      
  //     const email = userInfo.data.kakao_account.email;
  //     const nickName = userInfo.data.kakao_account.profile.nickname;
  //     const image = userInfo.data.kakao_account.profile.profile_image;

  //     const result = await user.findOne({where: {email, nickName}});

  //     if(result) { // 유저정보가 있을 때
  //       const accessToken = generateAccessToken(result.dataValues);

  //       res.cookie('accessToken', accessToken, {
  //         httpOnly: true
  //       })
  //     } else {
  //       // 최초 로그인 회원가입 진행
  //       const userInfo = {email, nickName, image};
  //       user.create(userInfo);
  //       const accessToken = generateAccessToken(userInfo);

  //       res.cookie('accessToken', accessToken, {httpOnly: true}).status(201).json({data: userInfo, message: 'create ok'});
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}; */
