import React, { useEffect, useState } from "react";
import qs from "qs";
import axios from "axios";
import PostList from "./DummyPostList";
import { LpInfo } from "./DummyLpList";
import "./RenderPage.css";
import LpVideo from "./LpVideo.mp4";

axios.defaults.withCredentials = true;

function RenderPage({ isLogin, setIsLogin }) {
  const [currentPost, setCurrentPost] = useState(0);
  const PostLength = PostList.length;

  const screenSize = window.screen.width;

  const nextSlide = () => {
    setCurrentPost(currentPost === PostLength - 1 ? 0 : currentPost + 1);
  };

  const prevSlide = () => {
    setCurrentPost(currentPost === 0 ? PostLength - 1 : currentPost - 1);
  };

  if (!Array.isArray(PostList) || PostList.length <= 0) {
    return null;
  }

  const loginHandler = (e) => {
    setIsLogin(e);
  };

  // console.log("렌더페이지", isLogin);
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");

  const getAccessToken = (authorizationCode) => {
    //console.log(authorization); // 잘찍힘
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/KakaoCallback`,
        qs.stringify({ authorizationCode }),
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        loginHandler(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  if (authorizationCode) {
    getAccessToken(authorizationCode);
  }

  return (
    <>
      <div>
        <section className="render-first">
          <div className="first-items">
            <div className="render-title">HOTTEST</div>
            <div className="hottest-albums">
              {screenSize >= 768 ? (
                <div className="hottest-albums-track">
                  {LpInfo.map((el) => (
                    <div className="hottest-album">
                      <img
                        src={el.image}
                        className="hottest-img"
                        alt={el.albumTitle}
                      />
                      <div className="hottest-info">
                        <div>{el.artist}</div>
                        <div>{el.albumTitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="hottest-album">
                  <div className="hottest-img-div">
                    <img
                      src={LpInfo[currentPost].image}
                      className="hottest-img"
                      alt={LpInfo[currentPost].albumTitle}
                    />
                  </div>
                  <div className="hottest-info">
                    <div>{LpInfo[currentPost].artist}</div>
                    <div>{LpInfo[currentPost].albumTitle}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="render-second">
          <div className="render-title">POST</div>
          <div className="second-items">
            <div className="slider">
              <div className="track-slider">
                <div className="slide-track">
                  {PostList.map((post, idx) => {
                    return (
                      <div>
                        <img
                          className="slide-img"
                          src={post.image}
                          alt={post.id}
                        ></img>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="controls"></div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="render-third">
          <div className="render-title">VIDEO</div>
          <video className="video" autoPlay loop muted>
            <source src={LpVideo} type="video/mp4" />
          </video>
        </section>
      </div>
    </>
  );
}

export default RenderPage;
