import React, {useState} from "react";
import AddPriceModal from './AddPriceModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import LpInfo from "./DummyLpList";
import LpPriceAddTable from "./DummyRecentPrice"
import RecentPrice from "./DummyRecentPrice"

function LpSinglePage(props) {
  const [show, setShow] = useState(false)
  const [likeBtn, setLikeBtn] = useState(false)
  const [likeNum, setLikeNum] = useState(0)
  const [tableContent, setTableContent] = useState("recentPrice")
  


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
    {/* <img src={"https://contents.sixshop.com/thumbnails/uploadedFiles/99047/product/image_1609498984666_1500.jpg"} al=""/> */}
    <div className="album-single-infos">
      <div>태그들</div>
      <span>가수 이름</span>
      <FontAwesomeIcon like={handleLike} onClick={handledislike} icon={likeBtn? solidHeart : regularHeart} />
      <span> 0 likes</span>
      <div>
      <span>타이틀</span>
      <span>노래 링크 연결</span>
      </div>
      <div>
      <button id="add-price-modal-button" onClick={()=>setShow(true)}>거래가격 추가</button>
      {show ? <AddPriceModal addPriceModalClose={addPriceModalClose} /> : null }
      </div>

      <table>
			  <thead>
				  <tr>
				    <th>최근 구매가</th>
				    <th>구매일자</th>
				  </tr>
			  </thead>
			<tbody>
				{RecentPrice.map((el)=>(
				  <tr>
				    <td>{el.price}</td>
				    <td>{el.date}</td> 
				  </tr>
				))}
			</tbody>
	   </table>

    </div>
    </> 
  );
}

export default LpSinglePage;
