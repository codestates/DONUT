import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const API_URL = process.env.REACT_APP_API_URL;

  console.log(process.env);

  const [userEmail, setUserEmail] = useState();
  const [userName, setUserName] = useState();
  const [profileImg, setProfileImg] = useState();

  const getAccessToken = (code) => {
    console.log(code);
    axios
      .post(`${API_URL}/Kakao`, { authorizationCode: code })
      .then((data) => {
        console.log(data);
      });
  };

  const code = new URL(window.location.href).searchParams.get("code");

  console.log(code);

  if (code) {
    getAccessToken(code);
  }

  // const importProfile = (info) => {
  //   // console.log(info);
  //   setUserEmail(info.email);
  //   setUserName(info.profile.nickname);
  //   setProfileImg(info.profile.profile_image_url);
  // };

  // const history = useNavigate();

  // const getToken = async () => {
  //   const payload = qs.stringify({
  //     grant_type: "authorization_code",
  //     client_id: REST_API_KEY,
  //     redirect_uri: REDIRECT_URI,
  //     code: code,
  //     client_secret: CLIENT_SECRET,
  //   });

  //   console.log("payload", payload);

  //   try {
  //     // access token 가져오기
  //     const res = await axios.post(
  //       "https://kauth.kakao.com/oauth/token",
  //       payload
  //     );
  //     // Kakao Javascript SDK 초기화
  //     window.Kakao.init(REST_API_KEY);
  //     // access token 설정
  //     window.Kakao.Auth.setAccessToken(res.data.access_token);

  //     let data = await window.Kakao.API.request({
  //       url: "/v2/user/me",
  //       success: (res) => {
  //         const kakaoAccount = res.kakao_account;
  //         console.log(
  //           kakaoAccount,
  //           kakaoAccount.email,
  //           kakaoAccount.profile.nickname,
  //           kakaoAccount.profile.profile_image_url
  //         );
  //         importProfile(kakaoAccount);
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getToken();
  // }, []);

  // console.log(userEmail, userName, profileImg);

  return null;
};
export default Auth;
