import Reeact from "react";
import { LpInfo } from "./DummyLpList";
import "./LpListPage.css";


function AlbumsToRender() {
	return(
		<div className="album-wrapper">
		{LpInfo.map((el) => (
			<div className="album-list">
				<img className="album-image" src={el.image} alt={el.albumTitle} />
				<div className="album-articles">
					<div className="album-tag">{el.TagName}</div>
					<div className="artist">{el.artist}</div>
					<div className="album-title">{el.albumTitle}</div>
				</div>
			</div>
		))}
		</div>
	)
};

export default AlbumsToRender;