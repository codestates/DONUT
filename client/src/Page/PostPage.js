import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PostPage.css";
import axios from "axios";

function PostPage() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/AllPost`)
      .then((res) => setPostList(res.data.data));
  }, []);

  const MoveToSinglePost = (e) => {
    window.location.replace(
      `${process.env.REACT_APP_ORIGIN_URL}/post/single_post_page/?postId=${e}`
    );
  };

  return (
    <div>
      <span className="post-title">POST</span>
      <Link to="./upload">
        <span className="camera-icon">
          <FontAwesomeIcon icon={faCamera} size="2x" />
        </span>
      </Link>
      <div className="posts">
        {postList.map((e) => (
          <div className="post-image">
            <img
              src={`${process.env.REACT_APP_API_URL}/${e.picture}`}
              onClick={() => MoveToSinglePost(e.id)}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPage;
