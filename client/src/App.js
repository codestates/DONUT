import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import Topbar from "./Topbar";
import Footer from "./Footer";
import LoginPage from "./Page/LoginPage";
import RenderPage from "./Page/RenderPage";
import MyInfoPage from "./Page/MyInfoPage";
import MyInfoEdit from "./Page/MyInfoEdit";
import LpListPage from "./Page/LpListPage";
import PostPage from "./Page/PostPage";
import FreeTalkPage from "./Page/FreeTalkPage";
import LpSinglePage from "./Page/LpSinglePage";
import FreeTalkSinglePage from "./Page/FreeTalkSinglePage";

import SinglePostPage from "./Page/SinglePostPage";
import PostUploadPage from "./Page/PostUploadPage";
import FreeTalkWrite from "./Page/FreeTalkWrite";


function App() {
  const [singlePageId, setSinglePageId] = useState(1);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <Topbar></Topbar>
      <hr></hr>
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
        <Route path="/my/my_info_Edit" element={<MyInfoEdit />}></Route>
        <Route path="/all" element={<LpListPage />}></Route>
        <Route path="/all/lp_single_page/" element={<LpSinglePage />}></Route>
        <Route path="/free-talk/write" element={<FreeTalkWrite />}></Route>
        <Route path="/post" element={<PostPage />}></Route>
        <Route path="/post/upload" element={<PostUploadPage />}></Route>
        <Route Path="/post/single_post_page/" element={<SinglePostPage />}></Route>
        <Route
          path="/free-talk"
          element={
            <FreeTalkPage
              singlePageId={singlePageId}
              setSinglePageId={setSinglePageId}
            />
          }
        ></Route>
        <Route
          path="/free-talk/single"
          element={
            <FreeTalkSinglePage
              singlePageId={singlePageId}
              setSinglePageId={setSinglePageId}
            />
          }
        ></Route>
      </Routes>
      <hr></hr>
      <Footer></Footer>
    </div>
  );
}

export default App;
