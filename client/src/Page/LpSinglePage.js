import React, {useState} from "react";
import AddPriceModal from './AddPriceModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import logo from "../logo.svg"

function LpSinglePage() {
  const [show, setShow] = useState(false)
  const [likeBtn, setLikeBtn] = useState(false)
  const [likeNum, setLikeNum] = useState(0)
  const [tableContent, setTableContent] = useState("recentPrice")

  const addPriceModalShow = () => {
    setShow(true)
  }

  const addPriceModalClose = () => {
    setShow(false)
  }

  const handleLike = () => {
    setLikeBtn(true)
  }

  const handledislike = () => {
    setLikeBtn(!likeBtn)
  }

  const handlePriceAddClick = () => {
    setTableContent([, ...tableContent])
  }


  return (
    <>
    <img src={logo} />
    <h1>장르</h1>
    <span>가수 이름</span>
    <FontAwesomeIcon like={handleLike} onClick={handledislike} icon={likeBtn? solidHeart : regularHeart} />
    <span> 0 likes</span>
    <div>
    <span>타이틀</span>
    <span>노래 링크 연결</span>
    </div>
    <div>
    <button id="add-price-modal-button" onClick={addPriceModalShow}>거래가격 추가</button>
    {show ? <AddPriceModal addPriceModalClose={addPriceModalClose} /> : null }
    </div>

    <table>
      <tr>
        <th>최근구매가</th>
        <th>구매일자</th>
      </tr>
      <tr>
        <th>10,000원</th>
        <th>2021.03.04</th> 
      </tr>
      <tr>
        <th>30,000원</th>
        <th>2021.05.36</th> 
      </tr>
    </table>
    </>
  );
}

export default LpSinglePage;
