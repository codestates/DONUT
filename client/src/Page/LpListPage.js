import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LpInfo } from "./DummyLpList";
import "./LpListPage.css";

function LpListPage({ singleLpPageId, setSingleLpPageId }) {
  const [lpAlbum, setLpAlbum] = useState([]);
  const [albumShow, setAlbumShow] = useState([]);
  const [next, setNext] = useState(3);
  const [curGenre, setCurGenre] = useState("All");

  const genre = [
    "All",
    "HIPHOP / SOUL / R&B",
    "ROCK / POP / ELECTRONICA",
    "JAZZ",
    "OST",
  ];

  const genreHandler = (e) => {
    console.log(e);
    const filterLpList = lpAlbum.filter((el) => el.genre === e);
    setLpAlbum(filterLpList);
    console.log(lpAlbum);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/AllLplist`)
      .then((res) => setLpAlbum(res.data.data));
  }, []);

  const albumsPerPage = 3;
  let arrayForHoldingPosts = [];

  const loopWithSlice = (start, end) => {
    const slicedAlbums = LpInfo.slice(start, end);
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedAlbums];
    setAlbumShow(arrayForHoldingPosts);
  };

  useEffect(() => {
    loopWithSlice(0, albumsPerPage);
  }, []);

  const onLoadMore = () => {
    loopWithSlice(next, next + albumsPerPage);
    setNext(next + albumsPerPage);
  };

  const lpSinglePageRender = (e) => {
    console.log(e);
    // setSingleLpPageId(e);
    window.location.replace(
      `${process.env.REACT_APP_ORIGIN_URL}/all/lp_single_page/?lpListId=${e}`
    );
  };

  return (
    <div>
      <div id="genre-categories">
        {genre.map((e, idx) => (
          <span
            className="genre-category"
            key={idx + 200}
            onClick={() => genreHandler(e)}
          >
            {e}
          </span>
        ))}
      </div>
      {console.log(lpAlbum)}
      {/* <Link to="./lp_single_page"> */}
      <div className="album-wrapper">
        {lpAlbum.map((el) => (
          <div className="album-list">
            <img
              className="album-image"
              onClick={() => lpSinglePageRender(el.id)}
              src={`${process.env.REACT_APP_API_URL}/${el.image}`}
              alt={el.albumTitle}
            />
            <div className="album-articles">
              <div className="album-tag">{el.TagName}</div>
              <div className="artist">{el.artist}</div>
              <div className="album-title">{el.albumTitle}</div>
            </div>
          </div>
        ))}
      </div>
      {/* </Link> */}

      <button onClick={onLoadMore} className="load-more-button">
        More
      </button>
    </div>
  );
}

export default LpListPage;
