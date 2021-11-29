import React from "react";
import { Route, Routes } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import Topbar from "./Topbar";
import LoginPage from "./Page/LoginPage";
import RenderPage from "./Page/RenderPage";
import LpListPage from "./Page/LpListPage";
import PostPage from "./Page/PostPage";
import FreeTalkPage from "./Page/FreeTalkPage";
import MyinfoPage from "./Page/MyInfoPage";
import LpSinglePage from "./Page/LpSinglePage";


function App() {
  return (
    <div>
      <Topbar></Topbar>
      <hr></hr>
      <Routes>
        <Route exact path="/" element={<RenderPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/all" element={<LpListPage />}></Route>
        <Route path="/LpSinglePage" element={<LpSinglePage />}></Route>
        <Route path="/post" element={<PostPage />}></Route>
        <Route path="/freeTalk" element={<FreeTalkPage />}></Route>
        <Route path="/my" element={<MyinfoPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
