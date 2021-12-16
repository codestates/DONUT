import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import logo from "./donut_logo.png";
import "./Topbar.css";

axios.defaults.withCredentials = true;

function Topbar({ isLogin, setIsLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const logoutHandler = () => {
    console.log("로그아웃 실행");
    axios
      .post(`${process.env.REACT_APP_API_URL}/SignOut`)
      .then((res) => setIsLogin(false))
      .catch((err) => console.log(err));
  };

  console.log(isLogin);

  const menuList = [
    { ALL: "all" },
    { POST: "post" },
    { "FREE-TALK": "free_talk" },
    { MY: "my" },
  ];
  return (
    <nav>
      <div className="topbar-div">
        <div className="menuList">
          <div className="logo">
            {" "}
            <Link to="/">
              <img className="logo" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="web-menu">
            {" "}
            <ul className="web-menuList">
              {menuList.map((e) => (
                <Link className="list-item" to={`./${Object.values(e)}`}>
                  {Object.keys(e)}
                </Link>
              ))}

              {!isLogin ? (
                <Link className="list-item" to="./login">
                  LOGIN
                </Link>
              ) : (
                <Link className="list-item" to="./" onClick={logoutHandler}>
                  LOGOUT
                </Link>
              )}
            </ul>
          </div>
          <div className="mobile-menu">
            <div className="btn-area">
              <FontAwesomeIcon
                icon={faBars}
                className="navbar-toggle-btn fa-2x"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
        {isOpen ? (
          <div className="navbar-toggle-open-menu">
            {menuList.map((e) => (
              <div>
                <Link className="list-item" to={`./${Object.values(e)}`}>
                  {Object.keys(e)}
                </Link>
              </div>
            ))}
            <div>
              {!isLogin ? (
                <Link className="list-item" to="./login">
                  LOGIN
                </Link>
              ) : (
                <Link className="list-item" to="./" onClick={logoutHandler}>
                  LOGOUT
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Topbar;