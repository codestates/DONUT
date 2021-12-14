import axios from 'axios';
import React, { useEffect } from "react";
// import axios from 'axios';

function LpLike({show, lpListId}) {

	// useEffect(() => {

	// 	let body = {
	// 		userId, 
	// 		lpListId
	// 	}

	// 	axios.post("https://localhost:4000/LikeLplist", body,
	// 	{
	// 		headers: {
	// 		  "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
	// 		},
	// 	})
	// 	.then(res => console.log(res))
	// 	.catch(res => console.log(res))

	// })

	return (
		<div>
			<button>Favorite</button>
		</div>

	)
}

export default LpLike