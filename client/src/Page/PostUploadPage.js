import { faTags } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from "react"



function PostUploadPage() {
	const [image ,setImage ] = useState('');
	const [loading, setLoading] = useState(false);



	const uploadImage = (e) => {
		console.log(e.target.files[0])
		const files = e.target.files
		const data = new FormData()
		data.append('file', files[0])
		data.append('upload_preset', 'darwin')
		setLoading(true)
		
	}

	const fileUploadHandler = (e) => {
		setImage(console.log("호잇"))
	}
	


  return (
	<div>
		<div className="picture-upload">
			<div>POST</div>
			<input type="file" name="file" placeholder="Upload an image" onChange={uploadImage}/>
			<button onClick={fileUploadHandler}>SHARE</button>
			{loading ? ( <h3> Loading...</h3>) : ( <img src={image} style={{width: '300px'}} / >)}
		</div>
	</div>
  	);
}



export default PostUploadPage;