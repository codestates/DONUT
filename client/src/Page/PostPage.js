import React from "react";
import PostList from "./DummyPostList";
import "./PostPage.css";

function PostPage() {

  return (
	<div>
	    <h2>POST</h2>
		<div className="posts">
		{PostList.map((el) => (<div className="post-image"><img src={el.image} /></div>))}
		</div>
	</div>
  );
}

export default PostPage;
