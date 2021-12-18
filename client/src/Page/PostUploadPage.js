import React, { useState } from "react";
import "./PostUploadPage.css";
import axios from "axios";
import qs from "qs";
axios.defaults.withCredentials = true;

function PostUploadPage() {
  const defaultFileName = "Uploading an image";
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState([]);
  const [fileName, setFileName] = useState(defaultFileName);
  const [allContent, setAllContent] = useState({
    picture: "",
    writing: "",
  });

  const handleChangeValue = (key) => (e) => {
    setAllContent({ ...allContent, [key]: e.target.value });
  };

  const imageSelectHandler = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => setImgSrc(e.target.result);
  };

  const postToServer = async (data) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/AddPost`,
        qs.stringify({
          picture: data,
          writing: allContent.writing,
        }),
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.replace(`${process.env.REACT_APP_ORIGIN_URL}/Post`)
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const content = {
      picture: allContent.picture,
      writing: allContent.writing,
    };

    if (!file || !imgSrc) {
      alert("이미지를 업로드 하거나 내용을 입력하세요");
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios
        .post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((res) => postToServer(res.data.data))
        .catch((err) => console.log(err));
      setTimeout(() => {
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 3000);
      //console.log({res})
    } catch (err) {
      setFileName(defaultFileName);
      setImgSrc(null);
      console.log(err);
    }
  };

  return (
    <div className="post-upload-page">
      <div className="post-title-section">
        <span className="post-title-text">POST</span>
      <div></div></div>
      <form onSubmit={onSubmit}>
        {file ? <img
          src={imgSrc}
          className={`image-preview ${imgSrc && "image-preview-show"}`}
          alt=""
        /> : 
        <div className="file-dropper">
          <span className="upload-text">{fileName}</span>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={imageSelectHandler}
        >
        </input>
        </div>
        }
        <textarea
          className="post-text-area"
          onChange={handleChangeValue("writing")}
          placeHolder="content"
        ></textarea>
        <button type="submit" className="post-btn">
          SHARE
        </button>
      </form>
    </div>
  );
}

export default PostUploadPage;
