import React from "react";
import { useEffect, useState } from "react";
import "./SinglePostPage.css"
import axios from 'axios';
import qs from 'qs';
import { comment } from './DummyLpList';

function SinglePostPage({ singlePageId }) {
	const url = new URL(window.location.href);
	const postId = url.searchParams.get("postId");

	const [ selectPost, setSelectPost ] = useState({
		id: "",
		userId: 1,
		image: "",
		nickname: "",
		picture: "",
		writing:"",
		createdAt: "",
		updatedAt: "",
	});

	const getContent = (data) => {
		setSelectPost(data);
	}

	useEffect(() => {
		axios.post("https://localhost:4000/DetailPost",
		qs.stringify({ postId: postId}))
	.then((res) => getContent(res.data.data))
	.catch((err) => console.log(err));
	}, []);

  return (
	  <>
	  <h3>post page</h3>
	<div ClassName="single-post">
		<img src={selectPost.profilepicture} alt=""/>
		<span>{selectPost.nickname}</span>
		<img src={selectPost.picture} alt=""/>
		<strong>{selectPost.nickname}</strong>{selectPost.writing}
	</div>
	<div ClassName="single-post-comment-text">comment</div>
	<input type="text" placeholder="댓글을 입력해 주세요." />
	<button>share</button>
	<div className="single-post-comment-div">
		{comment.map((e) => e.postId === singlePageId ? (
			<div className="single-post-comment-single-div" key={e.id}>
				<div className="single-post-comment-writer">{e.writer}</div>
				<div classNmae="single-post-comment-script">{e.script}</div>
			</div>
		) : null)}
	</div>
	</>
  );
}

export default SinglePostPage;
