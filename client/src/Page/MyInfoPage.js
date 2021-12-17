import React, { useState, useEffect } from "react";
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
  const [reNickName, setReNickName] = useState("");

  const nickNameInput = (e) => {
    setReNickName(e.target.value);
  };

  const nickNameHandler = async (e) => {
    // console.log("작동중")
    e.preventDefault();
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/UserInfo`,
        qs.stringify({
          nickName: reNickName,
        }),
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
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
          <input
            type="text"
            className=" input-nickName"
            placeholder={myInfo.nickname}
            onChange={nickNameInput}
          ></input>
          <div className="nick-name-change-message">
            * 닉네임 클릭 시 새로운 닉네임 입력이 가능합니다.
          </div>
          <div className="my-page-user-info">{myInfo.email}</div>
          <div className="edit-button-div">
            <button className="edit-button" onClick={nickNameHandler}>
              Edit Profile
            </button>
          </div>
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
