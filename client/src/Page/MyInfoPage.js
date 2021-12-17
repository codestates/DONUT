import React, { useState, useEffect } from "react";
// import MyInfoEdit from "./Page/MyInfoEdit"
import "./MyInfo.css";
import been from "./been.png";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import qs from "qs";

function MyInfoPage() {
  const [myInfo, setMyInfo] = useState({
    image: "",
    nickname: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/MyInfo`)
      .then((res) =>
        setMyInfo({
          image: res.data.data.image,
          nickname: res.data.data.nickname,
          email: res.data.data.email,
        })
      )
      .catch((err) => console.log(err));
  }, []);
  //console.log("이거", myInfo);

  return (
    <section>
      <div className="myinfo-title">MY INFORMATION</div>
      <div className="myinfo-kakao-profile-div">
        <div className="profile-image">
          <img src={myInfo.image} alt="" />
        </div>
        <div className="my-page-nickname">
          <div className="my-page-user-info">{myInfo.nickname}</div>
          <div className="my-page-user-info">{myInfo.email}</div>
          <Link to="/my/my_info_Edit">
            <button className="edit-button">Edit Profile</button>
          </Link>
        </div>
      </div>

      {/* <div className="myinfo-content">
      <div className="myinfo-content-title">POST</div>
        <div className="myinfo-post-image">
            <img src={been} alt="been" className="mock-img"></img>
        </div>
    </div>
    <div className="myinfo-content">
      <div className="myinfo-content-title">FREE TALK</div>
        <div className="free-talk-writing">내가 쓴 글들</div>
    </div> */}
    </section>
  );
}

export default MyInfoPage;
