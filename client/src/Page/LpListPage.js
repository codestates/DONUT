import React from "react";
import { Link } from 'react-router-dom'
import LpSinglePage from "./LpSinglePage"

function LpListPage({genre, artist, albumTitle, sellingPrice, image, albumTag}) {
  return (
	  <div>
    <div id="genre-categories">
	<div class="genre-category">ALL</div>
	<div class="genre-category">KOREAN</div>
	<div class="genre-category">HIPHOP / SOUL / R&B</div>
	<div class="genre-category">ROCK / POP / ELECTRONICA</div>
	<div class="genre-category">JAZZ</div>
	<div class="genre-category">OST</div>
	<div class="genre-category">JAPANESE</div>
    </div>

	<Link to={{pathname: "/LpSinglePage",
	state: {
		genre: genre,
		artist: artist,
		albumTitle: albumTitle,
		sellingPrice: sellingPrice,
		image: image
	}}}>
	<div className="album-list">
		<div className="album-image">
			<img src={image} alt={albumTitle} />
		</div>
		<div classNmae="album-contents">
			<h3 className="album-tag">{albumTag}</h3>
			<h3 className="artist">{artist}</h3>
			<h3 className="album-title">{albumTitle}</h3>

		</div>
	</div>
	</Link>
	</div>

  );
}

export default LpListPage;
