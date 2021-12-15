import React from "react";
// import MyInfoEdit from "./Page/MyInfoEdit"
import "./MyInfo.css"
import been from "./been.png";
import { Link, Route, Routes } from "react-router-dom";


function MyInfoPage() {

    return <section>
        <h1 className="myinfo-name">MY INFORMATION</h1>
        <div className="myinfo-kakao-profile">
            <div>프로필 사진</div>
            <div>닉네임</div>
        </div>
            <Link to="/my/my_info_Edit">
                <button className="edit-button">Edit Profile</button>
            </Link>

        <div className="myinfo-post">
            <h1>POST</h1>
            <img src={been} alt="been" className="mock-img"></img>
        </div>
        <div className="free-talk">
            <h1>FREE TALK</h1>
            <h6>난 빈지노 LP를 가지고 있다!!</h6>
        </div>
    </section>
}

export default MyInfoPage;
