import React from "react";
import { useEffect, useState } from "react";
import { talkList, comment } from "./DummyLpList";
import axios from "axios";
import qs from "qs";

function FreeTalkSinglePage({ singlePageId }) {
  const url = new URL(window.location.href);
  const talkId = url.searchParams.get("talkId");

  const [selectTalk, setSectTalk] = useState({
    id: "",
    userId: 1,
    title: "",
    article: "",
    hashtag: "",
    createdAt: "",
    updatedAt: "",
  });

  const getContent = (data) => {
    setSectTalk(data);
  };

  useEffect(() => {
    axios
      .post(
        "https://localhost:4000/DetailFreetalk",
        qs.stringify({ talkId: talkId })
      )
      .then((res) => getContent(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single-free-talk-div">
      <h3>Free Talk</h3>
      <div className="single-free-talk-script-div">
        <div className="single-free-talk-title">{selectTalk.title}</div>
        <div className="single-free-talk-writer">{selectTalk.writer}</div>
        <div className="single-free-talk-date">{selectTalk.updateAt}</div>
        <div className="single-free-talk-view">{selectTalk.view}</div>
        <div className="single-free-talk-script">{selectTalk.article}</div>
      </div>
      <div className="single-free-talk-comment-text">comment</div>
      <input type="text" placeholder="댓글을 입력해 주세요." />
      <button>share</button>
      <div className="single-free-talk-comment-div">
        {comment.map((e) =>
          e.talkId === singlePageId ? (
            <div className="single-free-talk-comment-single-div" key={e.id}>
              <div className="single-free-talk-comment-writer">{e.writer}</div>
              <div className="single-free-talk-comment-script">{e.script}</div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default FreeTalkSinglePage;
