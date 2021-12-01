import React from "react";
import { talkList, comment } from "./DummyLpList";

function FreeTalkPage({ singlePageId, setSinglePageId }) {
  const commentCount = (singleTalkId, commentList) => {
    let count = 0;
    commentList.forEach((e) => (e.talkId === singleTalkId ? count++ : null));
    return count;
  };

  const talkSinglePageRender = (e) => {
    console.log("싱글 페이지로 전환 history.push 구현");
    setSinglePageId(e);
  };

  return (
    <section>
      <h3>Free Talk</h3>
      <div className="free-talk-section-div">
        {talkList.map((e) => (
          <div
            className="free-talk-div"
            key={e.id}
            onClick={talkSinglePageRender(e)}
          >
            <div className="free-talk-title">{e.title}</div>
            <div className="free-talk-script">{e.script}</div>
            <div className="free-talk-commentConut">
              <span>{commentCount(e.id, comment)}</span>
            </div>
            <div className="free-talk-like">like</div>
            <div className="free-talk-date">{e.updateAt}</div>
            <div className="free-talk-view">{e.view}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FreeTalkPage;
