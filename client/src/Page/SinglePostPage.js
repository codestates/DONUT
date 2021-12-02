import React, { useEffect } from "react";
import "./SinglePostPage.css"
import PostList from "./DummyPostList"

function SinglePostPage() {

  return (
	  <>
	  post page
	  {console.log("인스타페이지 나와라")}
	<div ClassName="single-post">
		<img src={PostList[0].profilepicture} alt=""/>
		<span>{PostList[0].nickname}</span>
		<img src={PostList[0].image} alt=""/>
		<strong>{PostList[0].nickname}</strong>{PostList[0].caption}
	</div>
	</>
  );
}

export default SinglePostPage;
