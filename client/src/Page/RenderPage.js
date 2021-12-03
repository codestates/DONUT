import React from "react";
import qs from "qs";
import axios from "axios";

import PostList from "./DummyPostList";
import {LpInfo} from "./DummyLpList";
import "./RenderPage.css";
import LpVideo from "./LpVideo.mp4"

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


  return (
    <>
  
    <section className="render-first">
      <div className="render-title">Hottest</div>
      <div className="hottest-albums">
        <div className="hottest-albums-track">
        {LpInfo.map((el) => (
          <div className="hottest-album">
              <img src={el.image} className="hottest-img" alt={el.albumTitle} />
              <div>{el.artist}</div>
              <div>{el.albumTitle}</div>
          </div>
        ))}
      </div>
	    </div>
    </section>

    <section className="render-second">
      <div className="render-title">Post</div>
      <div className="slider">
        <div className="slide-track">
      {PostList.map((el) => (<div className="slide"><img src={el.image} className= "slide-img" alt=""/></div>))}
        </div>
      </div>
    </section>

    <section className="render-third">
      <div className="render-title">video</div>
      <video autoPlay loop muted>
        <source calssName="video" src={LpVideo} type="video/mp4"/>
      </video>
    </section>
    </>
  )
}



export default RenderPage;
