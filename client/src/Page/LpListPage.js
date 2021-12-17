import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LpInfo } from "./DummyLpList";
import "./LpListPage.css";

function LpListPage({ singleLpPageId, setSingleLpPageId }) {
  const [lpAlbum, setLpAlbum] = useState([]);
  const [albumShow, setAlbumShow] = useState([]);
  const [next, setNext] = useState(3);
  const [curGenreList, setCurGenreList] = useState(lpAlbum);
  const [curGenreIdx, setCurGenreIdx] = useState(0);

  const genre = [
    "All",
    "HIPHOP / SOUL / R&B",
    "ROCK / POP / ELECTRONICA",
    "JAZZ",
    "OST",
  ];

  const genreHandler = (e) => {
    const index = genre.indexOf(e);
    document.getElementById(`category${curGenreIdx}`).classList.remove("bold");
    document.getElementById(`category${index}`).classList.add("bold");
    setCurGenreIdx(index);
    if (e !== "All") {
      const filterLpList = lpAlbum.filter((el) => el.genre === e);
      setCurGenreList(filterLpList);
    } else setCurGenreList(lpAlbum);
  };

  useEffect(() => {
    setCurGenreList(lpAlbum);
  }, [lpAlbum]);

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
    <div id="lp-single-page">
      <div className="genre-container">
        <div className="genre-categories">
          {genre.map((e, idx) => (
            <span
              className="genre-category"
              id={`category${idx}`}
              key={idx + 200}
              onClick={() => genreHandler(e)}
            >
              {e}
            </span>
          ))}
        </div>
      </div>

      <section className="album-container">
        <div className="lp-album-content">
          {curGenreList.map((el) => (
            <div className="album-single-container">
              <div className="album-image">
                <img
                  onClick={() => lpSinglePageRender(el.id)}
                  src={`${process.env.REACT_APP_API_URL}/${el.image}`}
                  alt={el.albumTitle}
                />
              </div>
              <div className="album-articles">
                <div className="album-artist">{el.artist}</div>
                <div className="album-title">{el.albumTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="load-more-btn">
        <button onClick={onLoadMore}>More</button>
      </div>
    </div>
  );
}

export default LpListPage;
