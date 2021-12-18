import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import "./FreetalkPage.css";

function FreeTalkSinglePage({ isLogin, setIsLogin }) {
  const url = new URL(window.location.href);
  const talkId = url.searchParams.get("talkId");
  const [commentList, setCommentList] = useState([]);
  const [addComment, setAddComment] = useState("");
  const [selectTalk, setSelectTalk] = useState({
    id: "",
    userId: 1,
    title: "",
    article: "",
    hashtag: "",
    createdAt: "",
    updatedAt: "",
  });

  // console.log(isLogin);

  const getContent = (data) => {
    console.log(data);
    setSelectTalk(data.data);
    setCommentList(commentList.concat(data.comments));
  };

  const submitComment = async () => {
    console.log(addComment);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/AddFreetalkComment`,
        qs.stringify({ talkId: talkId, comment: addComment })
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload(true);
  };

  const inputComment = (e) => {
    setAddComment(e.target.value);
  };

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/DetailFreetalk`,
        qs.stringify({ talkId: talkId })
      )
      .then((res) => getContent(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single-free-talk">
      <div className="free-talk-name">FREE TALK</div>
      <div className="single-free-talk-div">
        <div className="single-free-talk-script-div">
          <div className="single-free-talk-title">{selectTalk.title}</div>
          <div className="single-free-talk-user-div">
            <img
              className="single-free-talk-user-img"
              src={selectTalk.Image}
              alt="freetalkUserImg"
            />
            <div className="single-free-talk-writer">{selectTalk.user}</div>
          </div>
          <div className="single-free-talk-date">{selectTalk.updateAt}</div>
          <div className="single-free-talk-view">{selectTalk.view}</div>
          <div className="single-free-talk-script">{selectTalk.article}</div>
        </div>
        <div className="single-free-talk-comment-input-div">
          <div className="single-free-talk-comment-text">comment</div>
          <div className="single-free-talk-comment-div">
            <input
              className="single-free-talk-comment-input"
              type="text"
              placeholder="댓글을 입력해 주세요."
              onChange={inputComment}
            />
            {isLogin ? (
              <button className="submit-button" onClick={submitComment}>
                SHARE
              </button>
            ) : (
              <Link className="submit-button" to="/login">
                LOGIN
              </Link>
            )}
          </div>
        </div>
        <div className="single-free-talk-comment-container">
          <div className="single-free-talk-comment-div">
            {commentList.map((e) =>
              e ? (
                <div
                  className="single-free-talk-comment-single-div"
                  key={`${e.id}+100`}
                >
                  <div className="single-free-talk-comment-writer">
                    {e.nickname}
                  </div>
                  <div className="single-free-talk-comment-script">
                    {e.content}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeTalkSinglePage;
