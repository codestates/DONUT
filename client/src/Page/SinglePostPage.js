import React from "react";
import "./SinglePostPage.css"
import PostList from "./DummyPostList"

function SinglePostPage() {

  return (
	<div ClassName="single-post">
		<img src={PostList.profilepicture}/>
		<span>{PostList.nickname}</span>
		<img src={PostList.image}/>
		<strong>{PostList.nickname}</strong>{PostList.caption}
	</div>
  );
}

export default SinglePostPage;
