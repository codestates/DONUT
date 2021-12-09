import React, { useState } from "react"
import './PostUploadPage.css'
import axios from 'axios';


function PostUploadPage() {
	const defaultFileName = "이미지 파일을 업로드 해주세요.";
	const [file, setFile] = useState(null);
	const [imgSrc, setImgSrc] = useState(null);
	const [fileName, setFileName] = useState(defaultFileName);
	const [allContent, setAllContent] = useState({ 
		picture: "",
		writing: ""
	})

	const handleChangeValue = (key) => (e) =>{
		setAllContent({ ...allContent, [key]: e.target.value})
	}

	const imageSelectHandler = (e) => {
		const imageFile = e.target.files[0]
		setFile(imageFile);
		setFileName(imageFile.name);
		const fileReader = new FileReader();
		fileReader.readAsDataURL(imageFile);
		fileReader.onload = (e) => setImgSrc(e.target.result)
	};

	const postToServer = async (data) => {
		setAllContent({...allContent, picture: data})
		//console.log(allContent)
		await axios.post("http://localhost:4000/AddPost", allContent,
		{
			headers: {
			  "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
			},
		})
		.then(res => console.log(res))
		.catch(err => console.log(err))
	}

	const onSubmit = async(e) => {
		e.preventDefault();

		const content = {picture: allContent.picture,
				 writing: allContent.writing}

		// if( !content.picture || !content.writing){
		// 	alert('이미지를 업로드 하거나 내용을 입력하세요')
		// }

		const formData = new FormData();
		formData.append('image', file);

		try{
			const res = await axios.post("https://localhost:4000/upload", formData, 
			{headers: {
					"Content-type": "multipart/form-data"},
			})
			.then(res => postToServer(res.data.data))
			.catch(err => console.log(err))
		//console.log(allContent)

		


		setTimeout(() => {
			setFileName(defaultFileName);
			setImgSrc(null)
		}, 3000)
			//console.log({res})
		}catch(err){
			setFileName(defaultFileName);
			setImgSrc(null)
			console.log(err)
		}
		// window.location.replace("https://localhost:3000/Post")
	}


	return (
		<div>
			
			<div className="post-title">POST</div>
			<form onSubmit={onSubmit}>
				<img src={imgSrc} className={`image-preview ${imgSrc && "image-preview-show"}`}/>
				<div className= "file-dropper">
					{fileName}
					<input id="image" type="file" accept="image/*" onChange={imageSelectHandler} />
					{/* <img src="https://cdn.discordapp.com/attachments/907148581692137515/917214337951727617/imageUp.png" alt="" style={{width: 400, height: 400}}/> */}
				</div>
				<textarea className="post-text-area" onChange={handleChangeValue('writing')} placeHolder="content"></textarea>
				<button type="submit" className="post-btn">SHARE</button>
			</form>
				
		
		</div>
	);
}



export default PostUploadPage;