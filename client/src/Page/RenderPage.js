import React, { useEffect, useState } from "react";
import qs from "qs";
import axios from "axios";
import PostList from "./DummyPostList";
import { LpInfo } from "./DummyLpList";
import "./RenderPage.css";
import LpVideo from "./LpVideo.mp4";

axios.defaults.withCredentials = true;

function RenderPage({ isLogin, setIsLogin }) {
  const [lpList, setLpList] = useState(LpInfo);
  const [postList, setPostList] = useState(PostList);
  const [currentPost, setCurrentPost] = useState(0);
  const PostLength = PostList.length;

  // const nextSlide = () => {
  //   setCurrentPost(currentPost === PostLength - 1 ? 0 : currentPost + 1);
  // };
  // const prevSlide = () => {
  //   setCurrentPost(currentPost === 0 ? PostLength - 1 : currentPost - 1);
  // };
  // if (!Array.isArray(PostList) || PostList.length <= 0) {
  //   return null;
  // }

  const lpSinglePageRender = (e) => {
    console.log(e);
    // setSingleLpPageId(e);
    window.location.replace(
      `https://localhost:3000/all/lp_single_page/?lpListId=${e}`
    );
  };

  const MoveToSinglePost = (e) => {
    window.location.replace(
      `${process.env.REACT_APP_ORIGIN_URL}/post/single_post_page/?postId=${e}`
    );
  };

  const loginHandler = (e) => {
    setIsLogin(e);
  };

  const contentHandler = (data) => {
    const dataLp = data.lp;
    const dataPost = data.post;

    // 더미데이터와 일치 시켜주기 위해서 ${process.env.REACT_APP_API_URL} 추가 실행, 추후 수정 예정
    dataLp.forEach(
      (e) => (e.image = `${process.env.REACT_APP_API_URL}/${e.image}`)
    );
    dataPost.forEach(
      (e) => (e.picture = `${process.env.REACT_APP_API_URL}/${e.picture}`)
    );
    setLpList(dataLp.concat(lpList));
    setPostList(dataPost.concat(postList));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/RenderPage`)
      .then((res) => contentHandler(res.data))
      .catch((err) => err);
  }, []);

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
            <div className="title-container">
              <div className="render-title">NEW</div>
            </div>

            <div className="albums-container">
              <div className="album-content">
                {lpList.slice(0, 5).map((el, idx) => (
                  <div className="album-single" key={idx * 2700}>
                    <div className="album-single-img">
                      <img
                        src={el.image}
                        alt={el.albumTitle}
                        onClick={() => lpSinglePageRender(el.id)}
                      />
                    </div>
                    <div className="album-single-info">
                      <div className="album-artist">{el.artist}</div>
                      <div className="album-title">{el.albumTitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="render-second">
          <div className="second-render-title">POST</div>
          <div className="second-items">
            <div className="slider">
              <div className="track-slider">
                <div className="slide-track">
                  {postList.map((post, idx) => {
                    return (
                      <div key={idx * 2800}>
                        <img
                          className="slide-img"
                          src={post.picture}
                          alt={post.id}
                          onClick={() => MoveToSinglePost(post.id)}
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
          {/* <video className="video" autoPlay loop muted> */}
          <div className="video-box">
            <video controls autoPlay loop muted>
              <source src={LpVideo} type="video/mp4" />
            </video>
          </div>
        </section>
      </div>
    </>
  );
}

export default RenderPage;
