import React, {useState, useEffect} from "react";
import AddPriceModal from './AddPriceModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import qs from "qs";

function LpSinglePage({ singlePageId}) {
  const url = new URL(window.location.href);
  const lpListId = url.searchParams.get("lpListId");
  const [show, setShow] = useState(false)
  const [likeBtn, setLikeBtn] = useState(false)
  const [tableContent, setTableContent] = useState([])
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
    updatedAt: ""
  })

  const getContent = (res) => {
    console.log(res)
    setSelectLp(res.data.data)
  }

  useEffect(() => {
    axios.post("https://localhost:4000/DetailLplist",
    qs.stringify({ lpListId: lpListId}))
    .then((res) => getContent(res))
    .catch((err) => console.log(err))
  },[])
  


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

  // useEffect(() => {

  //   let body = {
  
  //   }
  //   axios.post("https://localhost:4000/LikeLplist", body)
  //   .then(res => console.log(res))
  // },[])

  return (

    <>
    {/* <img src={"https://contents.sixshop.com/thumbnails/uploadedFiles/99047/product/image_1609498984666_1500.jpg"} al=""/> */}
    <div className="album-single-infos">
      <div>태그들</div>
      <div>
        <img src={`https://localhost:4000/${selectLp.image}`}/>
      </div>
      <span>{selectLp.artist}</span>
      <FontAwesomeIcon like={handleLike} onClick={handledislike} icon={likeBtn? solidHeart : regularHeart} />
      <div>
      <span>{selectLp.albumTitle}</span>
      </div>
      <div>
        {selectLp.sellingPrice}
      </div>
      <div>
      <button id="add-price-modal-button" onClick={()=>setShow(true)}>거래가격 추가</button>
      {show ? <AddPriceModal addPriceModalClose={addPriceModalClose} setShow={setShow} lpListId={lpListId}/> : null }
      </div>

      <table>
			  <thead>
				  <tr>
				    <th>최근 구매가</th>
				    <th>구매일자</th>
				  </tr>
			  </thead>
			<tbody>
				{/* {selectLp.price.map((el)=>(
				  <tr>
				    <td>{el.price}</td>
				    <td>{el.date}</td> 
				  </tr>
				))} */}
			</tbody>
	   </table>
    </div>
    </> 
  );
}

export default LpSinglePage;
