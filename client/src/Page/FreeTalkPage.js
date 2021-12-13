import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { comment } from "./DummyLpList";
import axios from "axios";
import "./FreetalkPage.css";

function FreeTalkPage({ singlePageId, setSinglePageId }) {
  const [talkList, setTalkList] = useState([]);
  const [comment, setComment] = useState([]);
  const talkListHandler = (res) => {
    console.log(res);
    setTalkList(talkList.concat(res.data.data));
    // setComment(comment.concat(res.data.data));
    // console.log(comment);
  };

  useEffect(() => {
    axios
      .get("https://localhost:4000/AllFreetalk")
      .then((res) => talkListHandler(res));
  }, []);

  console.log(talkList);

  const commentCount = (singleTalkId, commentList) => {
    let count = 0;
    commentList.forEach((e) => (e.talkId === singleTalkId ? count++ : null));
    return count;
  };

  const talkSinglePageRender = (e) => {
    console.log(e);
    setSinglePageId(e);
    console.log(singlePageId);
    window.location.replace(
      `https://localhost:3000/free_talk/single/?talkId=${e}`
    );
  };
  return (
    <section>
      <h3>Free Talk</h3>
      <div className="free-talk-section-div">
        {talkList.map((e) => (
          <div
            className="free-talk-div"
            key={e.id}
            onClick={() => talkSinglePageRender(e.id)}
          >
            <div className="free-talk-title">{e.title}</div>
            <div className="free-talk-script">{e.article}</div>
            <div className="free-talk-like">
              comment
              <span>{commentCount(e.id, comment)}</span>
            </div>
            <div className="free-talk-date">{e.updateAt}</div>
            <div className="free-talk-view">{e.view}</div>
          </div>
        ))}
        <Link to="/free_talk/write">
          <button>버튼</button>
        </Link>
      </div>
    </section>
  );
}

export default FreeTalkPage;
