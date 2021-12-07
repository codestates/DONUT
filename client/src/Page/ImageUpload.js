import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'


function ImageUpload(props) {
	const [Image, setImage] = useState([])


	const dropHandler = (files) => {
		let formData = new FormData();
		formData.append("file", files[0])
		console.log(files[0])

		axios.post('https://localhost:4000/post',formData , {headr: {'content-type': 'multipart/fomr-data'}} )
		.then(res => {
			if(res.data.success){
				console.log(res.data)
				setImage([...Image, res.data.filePath])
				// props.refreshFunction([...Image, res.data.filePath])
			} else {
				alert('파일을 저장하는데 실패했습니다.')
			}
		})
	}

	const deleteHandler = (image) => {
		const currentIndex = image.indexOf(image)
		let newImage = [...Image]
		newImage.splice(currentIndex, 1)
		setImage(newImage)
		// props.refreshFunction([...Image, res.data.filePath])
	}

	

	return (
		<div style={{ display:'flex', justifyContent: 'space-between'}}>
			<Dropzone onDrop={dropHandler}>
			{({getRootProps, getInputProps}) => (
			<div
				style={{ width: 400, height: 400, border: '1px solid lightgray',
					display: 'flex', alignItems: 'center', justifyContent: 'center'}}
			 {...getRootProps()}>
				<input {...getInputProps()} />
				<img src="https://cdn.discordapp.com/attachments/907148581692137515/917214337951727617/imageUp.png" alt="" style={{width: 400, height: 400}}/>
			</div>
			)}
			</Dropzone>
			
			<div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>
				{Image.map((image, index) => (
					<div onClick={()=>deleteHandler(image)}>
						<img style={{ minWidth: '300px', width: '300px', height: '240'}}
							src-={`${image}`}
							/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ImageUpload