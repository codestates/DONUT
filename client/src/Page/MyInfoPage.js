import React from "react";
// import MyInfoEdit from "./Page/MyInfoEdit"
import "./MyInfo.css"
import been from "./been.png";
import { Link, Route, Routes } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';


function MyInfoPage() {
    const url = new URL(window.location.href);
    const nickname = url.searchParams.get("userId")

    axios.get(`${process.env.REACT_APP_API_URL}/UserInfo`,
    qs.stringify({nickname: nickname})
    )
    .then(res => console.log(res))
    .catch(err => console.log(err))

    return <section>
        <div className="myinfo-title">MY INFORMATION</div>
        <div className="myinfo-kakao-profile">
            <div>프로필 사진</div>
            <div>닉네임</div>
            <Link to="/my/my_info_Edit">
                <button className="edit-button">Edit Profile</button>
            </Link>
            </div>

        <div className="myinfo-content">
            <div className="myinfo-content-title">POST</div>
            <div className="myinfo-post-image">
                <img src={been} alt="been" className="mock-img"></img>
            </div>
        </div>
        <div className="myinfo-content">
            <div className="myinfo-content-title">FREE TALK</div>
            <div className="free-talk-writing">내가 쓴 글들</div>
        </div>
    </section>
}

export default MyInfoPage;
