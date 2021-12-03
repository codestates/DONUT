import React from "react";
import PostList from "./DummyPostList";
import {LpInfo} from "./DummyLpList";
import "./RenderPage.css";
import LpVideo from "./LpVideo.mp4"



function RenderPage() {

  return (
    <>
  
    <section>
      <div className="render-title">Hottest</div>
      <div className="hottest-albums">
        <div className="hottest-albums-track">
		{LpInfo.map((el) => (
		  <div className="hottest-album">
		      <img src={el.image} className="hottest-img" alt={el.albumTitle} />
          <div>{el.artist}</div>
		      <div>{el.albumTitle}</div>
      </div>
		))}
    </div>
	   </div>
    </section>

    <section>
      <div className="render-title">Post</div>
      <div className="slider">
        <div className="slide-track">
      {PostList.map((el) => (<div className="slide"><img src={el.image} className= "slide-img" alt=""/></div>))}
        </div>
      </div>
    </section>

    <section>
      <div className="render-title">video</div>
      <video autoPlay loop muted>
        <source calssName="video" src={LpVideo} type="video/mp4"/>
      </video>
    </section>

    </>
  )
}



export default RenderPage;
