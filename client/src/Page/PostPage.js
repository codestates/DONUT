import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PostPage.css";
import axios from 'axios';


function PostPage() {
	const [postList, setPostList] = useState([]);

	useEffect(() => {
		axios.get("https://localhost:4000/AllPost")
		.then((res) => setPostList(res.data.data))
	}, []);

	
	const MoveToSinglePost = () => {
		
	    }

  return (
	<div>
		
	    	<span className="post-title">POST</span>
		    <Link to="./upload">
	    		<span className="camera-icon"><FontAwesomeIcon icon={faCamera} onClick={MoveToSinglePost} size="2x" /></span>
		    </Link>
		    <div className="posts">
			{postList.map((el) => (<div className="post-image"><img src={`https://localhost:4000/${el.picture}`} alt=""/></div>))}
		    </div>	
		
	</div>
  );
}



export default PostPage;
