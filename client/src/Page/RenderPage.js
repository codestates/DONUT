import React from "react";
import qs from "qs";
import axios from "axios";

function RenderPage({ isLogin, setIsLogin }) {
  // console.log("렌더페이지", isLogin);
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");

  const getAccessToken = (authorizationCode) => {
    //console.log(authorization); // 잘찍힘
    axios
      .post(
        "https://localhost:4000/KakaoCallback",
        qs.stringify({ authorizationCode }),
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((data) => {
        //console.log(data, "이거 맞음?")
      });
  };

  if (authorizationCode) {
    getAccessToken(authorizationCode);
  }
  return <section></section>;
}

export default RenderPage;
