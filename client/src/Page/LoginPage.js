import React from "react";
import turntable from "./turntable.gif";
import kakaoLoginbtn from "./kakao_login_large_wide.png";
import "./LoginPage.css";

function LoginPage({ isLogin, setIsLogin }) {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  console.log(KAKAO_AUTH_URL);
  return (
    <section className="login-section">
      <div className="turntable-div">
        <img className="turntable-img" src={turntable} alt="turntable" />
      </div>
      <div className="login-gif">
        <a href={KAKAO_AUTH_URL} className="kakao-login">
          {" "}
          <img
            src={kakaoLoginbtn}
            className="kakao-login-btn"
            alt="kakaoLoginImg"
          />
        </a>
      </div>
    </section>
  );
}

export default LoginPage;
