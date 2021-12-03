import React from "react";
import { talkList, comment } from "./DummyLpList";

function FreeTalkSinglePage({ singlePageId }) {
  const selectTalk = talkList.filter((e) => e.id === singlePageId);

  return (
    <div className="single-free-talk-div">
      <h3>Free Talk</h3>
      <div className="single-free-talk-script-div">
        <div className="single-free-talk-title">{selectTalk[0].title}</div>
        <div className="single-free-talk-writer">{selectTalk[0].writer}</div>
        <div className="single-free-talk-date">{selectTalk[0].updateAt}</div>
        <div className="single-free-talk-view">{selectTalk[0].view}</div>
        <div className="single-free-talk-script">{selectTalk[0].script}</div>
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
