import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHamburger,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./App.css";
axios.defaults.withCredentials = true;
function Topbar({ isLogin, setIsLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const logoutHandler = () => {
    console.log("로그아웃 실행");
    axios
      .post("https://localhost:4000/SignOut")
      .then(setIsLogin(false))
      .catch((err) => console.log(err));
  };
  return (
    <nav className="App">
      <div className="navbar">
        <Link to="/">DONUT</Link>
        <ul className="navbar-menu1">
          <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
          <Link to="./all">ALL</Link>
          <Link to="./post">POST</Link>
          <Link to="./free_talk">FREE-TALK</Link>
          <Link to="./my">MY</Link>
          {!isLogin ? (
            <Link to="./login">LOGIN</Link>
          ) : (
            <span onClick={logoutHandler}>LOGOUT</span>
          )}
        </ul>
        <FontAwesomeIcon
          icon={faBars}
          className="navbar-toggle-btn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        ></FontAwesomeIcon>
      </div>
      {isOpen ? (
        <ul className="navbar-menu2">
          <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
          <Link to="./all">ALL</Link>
          <Link to="./post">POST</Link>
          <Link to="./free_talk">FREE-TALK</Link>
          <Link to="./my">MY</Link>
          {!isLogin ? (
            <Link to="./login">LOGIN</Link>
          ) : (
            <span onClick={logoutHandler}>LOGOUT</span>
          )}
          <Link to="./administer">ADMIN</Link>
        </ul>
      ) : (
        <></>
      )}
    </nav>
  );
}

export default Topbar;
