import React from "react";
import { useEffect, useState } from "react";
import "./SinglePostPage.css";
import axios from "axios";
import qs from "qs";
import { comment } from "./DummyLpList";

function SinglePostPage({ singlePostPageId }) {
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
    console.log(data);
    setSelectPost(data.data);
    setCommentList(commentList.concat(data.data.comments));
    console.log(commentList);
  };

  const submitComment = async () => {
    console.log(addComment);
    await axios
      .post(
        "https://localhost:4000/AddFreetalkComment",
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
        "https://localhost:4000/DetailPost",
        qs.stringify({ postId: postId })
      )
      .then((res) => getContent(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h3>post page</h3>
      <div ClassName="single-post">
        <img src={selectPost.image} alt="" />
        <span>{selectPost.nickname}</span>
        <img src={`https://localhost:4000/${selectPost.picture}`} alt="" />
        <strong>{selectPost.nickname}</strong>
        {selectPost.writing}
      </div>
      <div ClassName="single-post-comment-text">comment</div>
      <input
        type="text"
        placeholder="댓글을 입력해 주세요."
        onChange={inputComment}
      />
      <button onClick={submitComment}>share</button>
      <div className="single-post-comment-div">
        {commentList.map((e) =>
          e ? (
            <div className="single-post-comment-single-div" key={e.id}>
              <div className="single-post-comment-writer">{e.nickname}</div>
              <div classNmae="single-post-comment-script">{e.content}</div>
            </div>
          ) : null
        )}
      </div>
    </>
  );
}

export default SinglePostPage;
