import React from "react";
import { Route, Routes } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import Topbar from "./Topbar";
import LoginPage from "./Page/LoginPage";
import RenderPage from "./Page/RenderPage";
import MyInfoPage from "./Page/MyInfoPage";
import MyInfoEdit from "./Page/MyInfoEdit";
function App() {
  return (
    <div>
      <Topbar></Topbar>
      <hr></hr>
      <Routes>
        <Route exact path="/" element={<RenderPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/my" element={<MyInfoPage />}></Route>
        <Route path="/my/my_info_Edit" element={<MyInfoEdit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
