import React from "react";
import turntable from "./turntable.gif";
import "./LoginPage.css"

function LoginPage({ isLogin, setIsLogin }) {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <section className="login-section">
      <div className="login-gif">
      <img src={turntable} alt="turntable" />
      </div>
      <a href={KAKAO_AUTH_URL} className="kakao-login">
        {" "}
        <img
          src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7e94985e-7054-4174-ac5b-4cbfc13cf506%2Fkakao_login_large_narrow.png?table=block&id=b4e4e1ec-2f58-494c-b352-23a3ec2235ee&spaceId=34b2f1fd-9d82-4494-8402-1bb057b304db&width=2000&userId=b5cfa95d-0fdc-4653-8882-18e28aaae8e9&cache=v2"
          alt="kakaoLoginImg"
        />
      </a>
    </section>
  );
}

export default LoginPage;