import React from "react";
import { Link } from "react-router-dom";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostList from "./DummyPostList";
import "./PostPage.css";

function PostPage() {
	
	const MoveToSinglePost = () => {
		
	    }

  return (
	<div>
		
	    	<span className="post-title">POST</span>
		    <Link to="./upload">
	    		<span className="camera-icon"><FontAwesomeIcon icon={faCamera} onClick={MoveToSinglePost} size="2x" /></span>
		    </Link>
		    <div className="posts">
			{PostList.map((el) => (<div className="post-image"><img src={el.image} alt=""/></div>))}
		    </div>	
		
	</div>
  );
}



export default PostPage;
