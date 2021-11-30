import React, {useState} from "react";

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
		<>
			<div>
				최근 구매가 
				<input value={price} onChange={onChangePrice}/>
			</div>
			<div>
				구매 일자 
				<input value={date} onChange={onChangeDate}/>
			</div>
			{alert}
			{!share ? <button onClick={onChangeBtn} >SHARE</button> :
			<button onClick={addPriceModalClose}>CHECK</button> }
			
			
		</>
	)
}