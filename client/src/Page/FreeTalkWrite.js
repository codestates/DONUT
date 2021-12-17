import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import "./FreetalkPage.css";
axios.defaults.withCredentials = true;

function FreeTalkWrite({ isLogin, setIsLogin }) {
  const [textContent, setTextContent] = useState({
    title: "",
    content: "",
  });

  const inputContent = (key) => (e) => {
    setTextContent({ ...textContent, [key]: e.target.value });
  };

  const uploadContentHandler = () => {
    if (!textContent.title || !textContent.content) {
      console.log("내용 입력하라는 메세지 출력");
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/AddFreetalk`,
          qs.stringify({
            title: textContent.title,
            article: textContent.content,
          }),
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        )
        .then(() => console.log("잘 보내짐"))
        .catch((err) => console.log(err));
      window.location.replace(`${process.env.REACT_APP_ORIGIN_URL}/free_talk`);
    }
  };

  return (
    <>
      <div className="write-board">
        <div className="free-talk-name">FREE TALK</div>
        {/* <div className="wirte-container">
        {saveContent.map((element) => (
          <div>
            <h2>{element.title}</h2>
            <div>{element.content}</div>
          </div>
        ))}
      </div> */}
        <div className="form-wrapper">
          <div className="free-talk-wirte-div">
            <div className="free-talk-wirte-div">
              <input
                className="title-input"
                type="text"
                placeholder="제목"
                onChange={inputContent("title")}
                name="title"
              />
            </div>
            <div className="free-talk-wirte-div">
              <textarea
                type="text"
                className="text-area"
                placeholder="글을 적어주세요"
                onChange={inputContent("content")}
                style={{ fontsize: "1em" }}
              ></textarea>
            </div>
            <div className="button-div">
              <button
                className="submit-button button-margin"
                onClick={uploadContentHandler}
              >
                SHARE
              </button>
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
}

export default FreeTalkWrite;
