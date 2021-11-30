import React , {useState} from "react";
import LpInfo from "./DummyLpList";

function LpListPage() {
	 const [lpAlbum, setLpAlbum] = useState(LpInfo);
	

  return (
	  <div>
    <div id="genre-categories">
	<div className="genre-category">ALL</div>
	<div className="genre-category">KOREAN</div>
	<div className="genre-category">HIPHOP / SOUL / R&B</div>
	<div className="genre-category">ROCK / POP / ELECTRONICA</div>
	<div className="genre-category">JAZZ</div>
	<div className="genre-category">OST</div>
	<div className="genre-category">JAPANESE</div>
    </div>
    {console.log(lpAlbum)}
    
	<div>
	{lpAlbum.map((el) => (
		<div className="album-list">
		<div className="album-image">
			<img src={el.image} alt={el.albumTitle} />
		</div>
		<div classNmae="album-contents">
			<h3 className="album-tag">{el.TagName}</h3>
			<h3 className="artist">{el.artist}</h3>
			<h3 className="album-title">{el.albumTitle}</h3>
		</div>
	</div>
	))}
	</div>

	<button>More</button>
	
	</div>

  );
}

export default LpListPage;
