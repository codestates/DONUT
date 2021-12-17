import React, { useState, useEffect } from "react";
import AddPriceModal from "./AddPriceModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import qs from "qs";
import "./LpSinglePage.css";

function LpSinglePage({ singlePageId }) {
  const url = new URL(window.location.href);
  const lpListId = url.searchParams.get("lpListId");

  const [show, setShow] = useState(false);
  const [likeBtn, setLikeBtn] = useState(false);
  const [recentPriceList, setRecentPriceList] = useState([]);
  const [selectLp, setSelectLp] = useState({
    id: "",
    userId: "",
    genre: "",
    artist: "",
    albumTitle: "",
    sellingPrice: "",
    image: "",
    price: "",
    date: "",
    createdAt: "",
    updatedAt: "",
  });

  const getContent = async (res) => {
    await setRecentPriceList(recentPriceList.concat(res.data.recentPrice));
    await setSelectLp(res.data.data);
  };

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/DetailLplist`,
        qs.stringify({ lpListId: lpListId })
      )
      .then((res) => getContent(res))
      .catch((err) => console.log(err));
  }, []);

  const addPriceModalClose = () => {
    setShow(false);
  };

  const handleLike = () => {
    setLikeBtn(true);
  };

  const handledislike = () => {
    setLikeBtn(!likeBtn);
  };

  // const handlePriceAddClick = () => {
  //   setTableContent([, ...tableContent]);
  // };

  // useEffect(() => {

  //   let body = {

  //   }
  //   axios.post("https://localhost:4000/LikeLplist", body)
  //   .then(res => console.log(res))
  // },[])

  return (
    <div className="album-single-container">
      {show ? (
        <AddPriceModal
          addPriceModalClose={addPriceModalClose}
          setShow={setShow}
          lpListId={lpListId}
        />
      ) : null}
      {/* <img src={"https://contents.sixshop.com/thumbnails/uploadedFiles/99047/product/image_1609498984666_1500.jpg"} al=""/> */}
      <div className="album-single-infos">
        <div className="album-single-image-div">
          <img
            className="album-single-image"
            src={`${process.env.REACT_APP_API_URL}/${selectLp.image}`}
            alt=""
          />
        </div>

        <div className="single-detail-infos">
          <div className="single-detail-artist">{selectLp.artist}</div>
          {/* <FontAwesomeIcon
            like={handleLike}
            onClick={handledislike}
            icon={likeBtn ? solidHeart : regularHeart}
          /> */}

          <div className="single-detail-title">
            <div>{selectLp.albumTitle}</div>
          </div>

          <div className="single-detail-price-div">
            <span className="single-detail-price-word">발매가</span>
            <span className="single-detail-price">{selectLp.sellingPrice}</span>
          </div>
          <div>
            <div id="add-price-modal-button" onClick={() => setShow(true)}>
              + 거래가격 추가
            </div>
          </div>

          <table className="single-detail-add-price-div">
            <thead>
              <tr>
                <th className="single-detail-add-price-word">최근 구매가</th>
                <th>구매일자</th>
              </tr>
            </thead>
            <tbody>
              {recentPriceList.map((el) => (
                <tr key={el.id + 100}>
                  <td>{el.price}</td>
                  <td>{el.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LpSinglePage;
