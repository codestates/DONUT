import { faTags } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react"
import './PostUploadPage.css'
import axios from 'axios';



function PostUploadPage() {
	const defaultFileName = "이미지 파일을 업로드 해주세요.";
	const [content, setContent] = useState("");
	const [file, setFile] = useState(null);
	const [imgSrc, setImgSrc] = useState(null);
	const [fileName, setFileName] = useState(defaultFileName);
	const [percent, setPercent] = useState(0);

	const imageSelectHandler = (e) => {
		const imageFile = e.target.files[0]
		setFile(imageFile);
		setFileName(imageFile.name);
		const fileReader = new FileReader();
		fileReader.readAsDataURL(imageFile);
		fileReader.onload = (e) => setImgSrc(e.target.result)
	};

	const onSubmit = async(e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', file);
		// for(let key of formData.keys()){
		// 	console.log(key)
		// }
		// formData.append('content', content)
		try{
			const res = await axios.post("https://localhost:4000/upload", formData, 
			{headers: {"Content-type": "multipart/form-data"},
			onUploadProgress: (e) => {
				setPercent(Math.round(100 * e.loaded/e.total))
			}
		});
		setTimeout(() => {
			setPercent(0);
			setFileName(defaultFileName);
			setImgSrc(null)
		}, 3000)
			console.log({res})
		}catch(err){
			setPercent(0);
			setFileName(defaultFileName);
			setImgSrc(null)
			console.log(err)
		}
	}

	const contentChangeHandler = (e) => {
		setContent(e.target.value)
	}


	return (
		<div>
			
			<div className="post-title">POST</div>
			<form onSubmit={onSubmit}>
				<img src={imgSrc} className={`image-preview ${imgSrc && "image-preview-show"}`}/>
				{percent}
				<div className= "file-dropper">
					{fileName}
					<input id="image" type="file" accept="image/*" onChange={imageSelectHandler} />
					{/* <img src="https://cdn.discordapp.com/attachments/907148581692137515/917214337951727617/imageUp.png" alt="" style={{width: 400, height: 400}}/> */}
				</div>
				<textarea className="post-text-area" onChange={contentChangeHandler} placeHolder="content">{content}</textarea>
				<button type="submit" className="post-btn">SHARE</button>
			</form>
				
		
		</div>
	);
}



export default PostUploadPage;