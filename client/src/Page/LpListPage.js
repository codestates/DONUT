import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LpInfo } from "./DummyLpList";
import "./LpListPage.css";

function LpListPage({ singleLpPageId, setSingleLpPageId }) {
  const [lpAlbum, setLpAlbum] = useState([]);
  const [albumShow, setAlbumShow] = useState(false);
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

  const lpSinglePageRender = (e) => {
    console.log(e);
    // setSingleLpPageId(e);
    window.location.replace(
      `${process.env.REACT_APP_ORIGIN_URL}/all/lp_single_page/?lpListId=${e}`
    );
  };

  const albumsPerPage = albumShow ? curGenreList.length : 8

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

        {curGenreList.slice(0, albumsPerPage).map((el) => (
          <div className="album-single-container">
            <div className="album-image">
              <img
                onClick={() => lpSinglePageRender(el.id)}
                src={`${process.env.REACT_APP_API_URL}/${el.image}`}
                alt={el.albumTitle}
              />
              </div>
            <div className="lp-album-articles">
              <div className="lp-album-artist" onClick={() => lpSinglePageRender(el.id)}>{el.artist}</div>
              <div className="lp-album-title" onClick={() => lpSinglePageRender(el.id)}>{el.albumTitle}</div>
            </div>
            </div>
          ))}
        </div>

      </section>

      <div className="load-more-btn">

        <button onClick={()=>setAlbumShow(!albumShow)}>
          {albumShow ? "LESS" : "MORE"} 
        </button>
      </div>
    </div>
  );
}

export default LpListPage;

