import React, {useState} from "react";
import "./AddPriceModal.css";

export default function AddPriceModal({addPriceModalClose}){
	const [share, setShare] = useState(false);
	const [price, setPrice] = useState("");
	const [date, setDate] = useState("");
	const [alert, setAlert] = useState("")

	const onChangePrice = (e) => {
		setPrice(e.target.value)
	}
	const onChangeDate = (e) => {
		setDate(e.target.value)
	}  

	const onChangeBtn = (e) => {
		setAlert("정보를 추가하겠습니까?")
		setShare(true)
	}


	return (
		<div>
			<div className="price-modal-container">
			<button className="price-modal-close-btn" onClick={addPriceModalClose}> X </button>
			<div className="recent-price-part">
				최근 구매가 
				<input className="recnet-price-input" value={price} onChange={onChangePrice}/>
			</div>
			<div className="recent-date-part">
				구매 일자 
				<input className="recnet-date-input" value={date} onChange={onChangeDate}/>
			</div>
			{alert}
			{!share ? <button className="price-modal-share-btn" onClick={onChangeBtn} >SHARE</button> :
			<button className="price-modal-check-btn" onClick={addPriceModalClose}>CHECK</button> }
			</div>
		</div>
	)
}