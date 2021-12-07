import { faTags } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react"
import './PostUploadPage.css'
import ImageUpload from './ImageUpload'


function PostUploadPage() {
	const [image, setImage] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fileImage, setFileImage] = useState([]);
	const [content, setContent] = useState("");

	const deleteFileImage = () => {
		URL.revokeObjectURL(fileImage);
		setFileImage("")
	}

	const saveFileImage = (e) => {
		// console.log(e.target.files[0])
		setFileImage(URL.createObjectURL(e.target.files[0]));

	}

	const fileUploadHandler = (e) => {
		setImage(console.log("호잇"))
	}

	const contentChangeHandler = (e) => {
		setContent(e.target.value)
	}

	const updateImage = (newImage) => {
		setImage(newImage)
	}


	return (
		<div>
			<div className="picture-upload">
				<div className="post-title">POST</div>
				<div className="post-upload-container">
					{/* DropZone */}

					<ImageUpload refreshFunction={updateImage} />

					{/* <div className="post-image-space">
					{fileImage && (<img salt="sample" src={fileImage} style={{ margin: "auto"}}/>)}
				</div>
				<label className="post-btn" for="input-file">
					ChososeFile
				</label> */}

					<input type="file" id="input-file" placeholder="Upload an image" style={{ display: "none" }} onChange={saveFileImage}>
					</ input>

					<textarea className="post-text-area" onChange={contentChangeHandler} placeHolder="content">{content}</textarea>
					<button className="post-btn" onClick={fileUploadHandler}>SHARE</button>
					<button className="post-btn" onClick={deleteFileImage}>삭제</button>
				</div>
			</div>
		</div>
	);
}



export default PostUploadPage;