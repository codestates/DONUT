import axios from "axios";
import React, { useState } from "react";
import "./AddPriceModal.css";
import qs from "qs";
axios.defaults.withCredentials = true;

export default function AddPriceModal({ addPriceModalClose, lpListId }) {
  const [share, setShare] = useState(false);
  const [alert, setAlert] = useState("");

  const [priceContent, setPriceContent] = useState({
    price: "",
    date: "",
    lpListId: "",
  });

  const inputContent = (key) => (e) => {
    setPriceContent({ ...priceContent, [key]: e.target.value });
  };

  const onChangeBtn = (e) => {
    setAlert("정보를 추가하겠습니까?");
    setShare(true);
  };

  const addPrice = () => {
    if (!priceContent.price || !priceContent.date) {
      // alert("가격과 날짜를 입력해주세요")
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/AddLpPrice`,
          qs.stringify({
            price: priceContent.price,
            date: priceContent.date,
            lpListId: lpListId,
          }),
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        )
        .then((res) => console.log(res));
      addPriceModalClose();
      window.location.reload(true);
    }
  };

  return (
    <div>
      <div className="price-modal-container">
        <button className="price-modal-close-btn" onClick={addPriceModalClose}>
          {" "}
          X{" "}
        </button>
        <div className="recent-price-part">
          최근 구매가
          <input
            className="recent-price-input"
            placeholder="price"
            onChange={inputContent("price")}
          />
        </div>
        <div className="recent-date-part">
          구매 일자
          <input
            className="recent-date-input"
            placeholder="date"
            onChange={inputContent("date")}
          />
        </div>
        <div className="price-modal-btn-div">
          {alert}
          {!share ? (
            <button className="price-modal-share-btn" onClick={onChangeBtn}>
              SHARE
            </button>
          ) : (
            <button
              type="submit"
              className="price-modal-check-btn"
              onClick={addPrice}
            >
              CHECK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
