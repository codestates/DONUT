"use strict"; // 안전한 코딩을 위한 가이드라인, 상대적으로 안전하지 않은 액션 발생 방지, 정확하게 고려되지 않은 기능들을 비활성화
require('dotenv').config();
const axios = require('axios');
const { user } = require('../../models');
const { generateAccessToken } = require('../tokenfunction');

module.exports = {
  // 클라이언트에서 전달해준 인가코드로 토큰 받기
  getToken: (req, res) => {
    //console.log(req.body);
    const code = req.body.authorizationCode;

    const clientId = process.env.REST_API_KEY;
    const redirectUri = process.env.REDIRECT_URI;
    const grantType = process.env.GRANT_TYPE;

    axios.post(`https://kauth.kakao.com/oauth/token?grantType=${grantType}&cliendId=${clientId}&redirectUri=${redirectUri}&code=${code}`,
      {
        headers: {accept: 'application/x-www-form-urlencoded;charset=utf-8'}
      }
    )
    .then((res) => {
      console.log(res);
      res.status(200).json({accessToken: res.data})
    })
    .catch((err) => {
      console.log(err);
    })
  },
  // 받은 토큰으로 사용자 정보 가져오기
  getUserInfo: async (req, res) => {
    try {
      const userInfo = await axios.get(`https://kapi.kakao.com/v2/user/me?access_token=${req.query.accessToken}`, 
        {headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
      });
      
      const email = userInfo.data.kakao_account.email;
      const nickName = userInfo.data.kakao_account.profile.nickname;
      const image = userInfo.data.kakao_account.profile.profile_image;

      const result = await user.findOne({where: {email, nickName}});

      if(result) { // 유저정보가 있을 때
        const accessToken = generateAccessToken(result.dataValues);

        res.cookie('accessToken', accessToken, {
          httpOnly: true
        })
      } else {
        // 최초 로그인 회원가입 진행
        const userInfo = {email, nickName, image};
        user.create(userInfo);
        const accessToken = generateAccessToken(userInfo);

        res.cookie('accessToken', accessToken, {httpOnly: true}).status(201).json({data: userInfo, message: 'create ok'});
      }

    } catch (err) {
      console.log(err);
    }
  }
};


/*
    const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });

    console.log("payload", payload);

    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY);
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);

      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakaoAccount = res.kakao_account;
          console.log(
            kakaoAccount.email,
            kakaoAccount.profile.nickname,
            kakaoAccount.profile.profile_image_url
          );
          importProfile(kakaoAccount);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
    */