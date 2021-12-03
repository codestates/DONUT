import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LpInfo } from "./DummyLpList";
import "./LpListPage.css";
import AlbumsToRender from "./AlbumsToRender"

function LpListPage() {
  const [lpAlbum, setLpAlbum] = useState(LpInfo);
  const [albumShow, setAlbumShow] = useState([]);
  const [next, setNext] = useState(3);

  const albumsPerPage = 3
  let arrayForHoldingPosts = [];

  const loopWithSlice = (start, end) => {
    const slicedAlbums = LpInfo.slice(start, end);
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedAlbums];
    setAlbumShow(arrayForHoldingPosts)
  }

  useEffect(() => {
    loopWithSlice(0, albumsPerPage);
  }, []);

  const onLoadMore = () => {
    loopWithSlice(next, next + albumsPerPage);
    setNext(next + albumsPerPage);
  }

  return (
    <div>
      <div id="genre-categories">
        <span className="genre-category">ALL</span>
        <span className="genre-category">KOREAN</span>
        <span className="genre-category">HIPHOP / SOUL / R&B</span>
        <span className="genre-category">ROCK / POP / ELECTRONICA</span>
        <span className="genre-category">JAZZ</span>
        <span className="genre-category">OST</span>
        <span className="genre-category">JAPANESE</span>
      </div>
      {console.log(lpAlbum)}
      <Link to="./lp_single_page">
        <AlbumsToRender albumsToRender={albumShow}/>
        {/* <div className="album-wrapper">
          {lpAlbum.map((el) => (
            <div className="album-list">
              <img calssName="album-image" src={el.image} alt={el.albumTitle} />
              <div className="album-articles">
                <div className="album-tag">{el.TagName}</div>
                <div className="artist">{el.artist}</div>
                <div className="album-title">{el.albumTitle}</div>
              </div>
            </div>
          ))}
        </div> */}
      </Link>

      <button onClick={onLoadMore} className="load-more-button">More</button>
    </div>
  );
}

export default LpListPage;
