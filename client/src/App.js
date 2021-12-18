import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./App.css";
import Topbar from "./Topbar";
import Footer from "./Footer";
import LoginPage from "./Page/LoginPage";
import RenderPage from "./Page/RenderPage";
import MyInfoPage from "./Page/MyInfoPage";
import LpListPage from "./Page/LpListPage";
import PostPage from "./Page/PostPage";
import FreeTalkPage from "./Page/FreeTalkPage";
import LpSinglePage from "./Page/LpSinglePage";
import FreeTalkSinglePage from "./Page/FreeTalkSinglePage";

import SinglePostPage from "./Page/SinglePostPage";
import PostUploadPage from "./Page/PostUploadPage";
import FreeTalkWrite from "./Page/FreeTalkWrite";
import AdminPage from "./Page/AdminPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  // const [singlePostPageId, setSinglePostPageId] = useState("");
  // const [singleLpPageId, setSingleLpPageId] = useState("")

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/AuthLogin`)
      .then(
        (res) => setIsLogin(res.data.login)
        // cookie에 "accesstoken" 존재 여부를 확인한 후 로그인 여부 판단.
      )
      .catch((err) => null);
  }, []);

  return (
    <div className="main-body">
      <section className="topbar-section">
        <Topbar isLogin={isLogin} setIsLogin={setIsLogin}></Topbar>
      </section>
      <section className="content-section">
        <Routes>
          <Route exact path="/" element={<RenderPage />}></Route>
          <Route
            path="/main"
            element={<RenderPage isLogin={isLogin} setIsLogin={setIsLogin} />}
          ></Route>
          <Route
            path="/login"
            element={<LoginPage isLogin={isLogin} setIsLogin={setIsLogin} />}
          ></Route>
          <Route path="/my" element={<MyInfoPage />}></Route>
          <Route path="/all" element={<LpListPage />}></Route>
          <Route path="/all/lp_single_page/" element={<LpSinglePage />}></Route>
          {/* 로그인 안 했을 시 렌더해주지 않음 sendToRoginPage 컴포넌트 추가하기*/}
          {/* routes matched location 콘솔 메세지 방어하기 위해 해당 컴포넌트 각 페이지에서 받아서 렌더 */}
          <Route path="/free_talk/write" element={<FreeTalkWrite />}></Route>
          <Route
            path="/post"
            element={<PostPage isLogin={isLogin} setIsLogin={setIsLogin} />}
          ></Route>
          {/* routes matched location 콘솔 메세지 방어하기 위해 해당 컴포넌트 각 페이지에서 받아서 렌더 */}
          <Route exact path="/post/upload" element={<PostUploadPage />}></Route>
          <Route
            path="/post/single_post_page"
            element={
              <SinglePostPage isLogin={isLogin} setIsLogin={setIsLogin} />
            }
          ></Route>
          <Route
            path="/free_talk"
            element={<FreeTalkPage isLogin={isLogin} setIsLogin={setIsLogin} />}
          ></Route>
          <Route
            path="/free_talk/single"
            element={
              <FreeTalkSinglePage isLogin={isLogin} setIsLogin={setIsLogin} />
            }
          ></Route>
          <Route exact path="/administer" element={<AdminPage />}></Route>
        </Routes>
      </section>
      {/* <hr></hr> */}
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
