import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SinglePostPage.css";
import axios from "axios";
import qs from "qs";

function SinglePostPage({ isLogin, setIsLogin }) {
  const url = new URL(window.location.href);
  const postId = url.searchParams.get("postId");

  const [commentList, setCommentList] = useState([]);
  const [addComment, setAddComment] = useState("");
  const [selectPost, setSelectPost] = useState({
    image: "",
    nickname: "",
    picture: "",
    writing: "",
    createdAt: "",
  });

  const getContent = (data) => {
    // console.log(data);
    setSelectPost(data.data);
    setCommentList(commentList.concat(data.data.comments));
    // console.log(commentList);
  };

  const submitComment = async () => {
    console.log(addComment);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/AddFreetalkComment`,
        qs.stringify({ postId: postId, comment: addComment })
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
        `${process.env.REACT_APP_API_URL}/DetailPost`,
        qs.stringify({ postId: postId })
      )
      .then((res) => getContent(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="post-title">
        <h3 className="title">POST PAGE</h3>
      </div>
      <div className="single-post">
        <div className="post-user">
          <div className="post-user-profile-image">
            <img src={selectPost.image} alt="" />
          </div>
          <div className="post-user-nickname">
            <span>{selectPost.nickname}</span>
          </div>
        </div>
        <div className="post-img">
          <img
            src={`${process.env.REACT_APP_API_URL}/${selectPost.picture}`}
            alt=""
          />
        </div>
        <div className="post-caption">
          <span>{selectPost.writing}</span>
        </div>
      </div>
      <input
        type="text"
        placeholder="Add a comment..."
        className="comment-input"
        onChange={inputComment}
      />
      {isLogin ? (
        <button className="comment-share-btn" onClick={submitComment}>
          SHARE
        </button>
      ) : (
        <Link className="comment-share-btn" to="/login">
          LOGIN
        </Link>
      )}
      <div className="single-post-comment-div">
        {commentList.map((e) =>
          e ? (
            <div className="post-comment" key={e.id}>
              <span className="post-comment-writer">{e.nickname}</span>
              <span className="post-comment-script">{e.content}</span>
            </div>
          ) : null
        )}
      </div>
    </>
  );
}

export default SinglePostPage;
