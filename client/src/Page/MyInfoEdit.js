import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./MyInfo.css";
import axios from "axios";
import qs from "qs";
axios.defaults.withCredentials = true;

function MyInfoEdit() {
  const [reNickName, setReNickName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const nickNameInput = (e) => {
    setReNickName(e.target.value);
  };

  const togglePopup = (e) => {
    setShowPopup(e.target.value);
  };
  const onSubmit = async (e) => {
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

  return (
    <div>
      <h1 className="myinfo-name">MY INFORMATION</h1>
      <h4>NickName</h4>
      <form onSubmit={onSubmit}>
        <input
          type="palceholder"
          className="nickname-box"
          onChange={nickNameInput}
        ></input>
        <h4>E-Mail</h4>
        <button type="submit" className="edit-button">
          Edit
        </button>
      </form>
      <button className="out-member-modal" onClick={() => setModalIsOpen(true)}>
        회원탈퇴
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>🔥주의🔥</h2>
        <p>정말 탈퇴 하시겠습니까?</p>
        <div>
          <button className="close-modal" onClick={() => setModalIsOpen(false)}>
            X
          </button>
          <Link to="/">
            <button onClick={togglePopup} value="false">
              확인
            </button>
            {showPopup ? (
              <div className="popup">
                <h2>탈퇴되었습니다.</h2>
              </div>
            ) : null}
          </Link>
          <button>취소</button>
        </div>
      </Modal>
    </div>
  );
}

export default MyInfoEdit;
