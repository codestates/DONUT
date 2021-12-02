import React from "react";
import { Route, Routes } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import Topbar from "./Topbar";
import LoginPage from "./Page/LoginPage";
import RenderPage from "./Page/RenderPage";

import Auth from "./Auth";

function App() {
  //  clientSecretKey = "80707c3a0383bc1cc8f54a77a631fdb3"

  const REST_API_KEY = "80707c3a0383bc1cc8f54a77a631fdb3";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <h1>
              <a href={KAKAO_AUTH_URL}>Kakao Login</a>
            </h1>
          }
        ></Route>
        <Route path="/oauth/kakao/callback" element={<Auth />}></Route>
      </Routes>
    </div>
  );
}

export default App;