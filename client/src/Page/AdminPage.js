import axios from "axios";
import React from "react";
import { useState } from "react";
import qs from "qs";
axios.defaults.withCredentials = true;

function AdminPage() {
  let [inputLpInfo, setInputLpinfo] = useState();
  const [inputLpimg, setinputLpimg] = useState(null);
  const [imgSrc, setImgSrc] = useState([]);
  const [fileName, setFileName] = useState("이미지 업로드 하세요");
  const [result, setResult] = useState({
    genre: "HIPHOP / SOUL / R&B",
    artist: "",
    albumTitle: "",
    sellingPrice: "",
    image: "",
  });

  // const {genre, artist, albumTitle, sellingPrice, image} = req.body;

  const genre = [
    "HIPHOP / SOUL / R&B",
    "ROCK / POP / ELECTRONICA",
    "JAZZ",
    "OST",
  ];

  // const handleInputLpInfo = (e) => {
  //   setInputLpinfo(e.target.value);
  // };

  const handleInputLpimg = (e) => {
    const imageFile = e.target.files[0];
    setinputLpimg(imageFile);
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => setImgSrc(e.target.result);
    // setinputLpimg(e.target.value);
  };

  // const handleInputLpGenre = (e) => {
  //   setLpGenre(e.target.value);
  // };

  const handleChangeValue = (key) => (e) => {
    setResult({ ...result, [key]: e.target.value });
  };

  // const lpInputBtnOn = () => {
  //   if (inputLpimg && inputLpInfo) {
  //     console.log("돌아간다");
  //     // console.log(inputLpimg, inputLpInfo);
  //     let infoArr = [];
  //     inputLpInfo = inputLpInfo.split("stringend");
  //     inputLpimg = inputLpimg.split("stringend");

  //     inputLpInfo.forEach((e, idx) => {
  //       let lpInfoObj = {};
  //       let eleArr = e.split(" - ");
  //       if (e.length) {
  //         lpInfoObj.genre = lpGenre;
  //         lpInfoObj.artist = eleArr[0];
  //         lpInfoObj.albumName = eleArr[1];
  //         lpInfoObj.image = inputLpimg[idx];
  //         infoArr.push(lpInfoObj);
  //       }
  //     });
  //     setResult(infoArr);
  //   } else {
  //     alert("내용을 입력하세요");
  //   }
  // };

  const ImgSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", inputLpimg);

    try {
      const res = await axios
        .post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((res) => sendIfoDb(res.data.data));
    } catch (err) {
      alert("실패");
    }
  };

  const sendIfoDb = async (data) => {
    setResult({ ...result, image: data });
    // console.log(result);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/AddLplist`,
        qs.stringify({
          genre: result.genre,
          artist: result.artist,
          albumTitle: result.albumTitle,
          sellingPrice: result.sellingPrice,
          image: data,
        }),
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // result.forEach((e) => {
    //   axios
    //     .post("https://localhost:4000/", { e })
    //     .then(alret("내보내기 완료"))
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // });
    //!내보내기 실행 시 몇개나 진행되었는지 확인해주는 모달창 띄워주기
    //!내보내기 완료 되면 페이지 리렌더
    window.location.reload(true);
  };

  return (
    <div className="adminDiv">
      <div>
        <a
          href=" http://book.interpark.com/display/displaylist.do?_method=module&sc.shopNo=0000500000&sc.dispNo=001019&bid1=catebox&bid2=sub&bid3=cd&bid4=001019"
          target="_blank"
        >
          인터파크 열기
        </a>
      </div>
      <pre />

      <div>
        {/* <div>
          <div>let arr = document.getElementsByClassName("c333333");</div>
          <div>let infoArrStr= "";</div>
          <div>
            arr.forEach( (e) => (infoArrStr +=e.firstElementChild.innerText +
            "stringend") );
          </div>
          <div>copy(infoArrStr)</div>
        </div> */}
        {/* <input
          type="text"
          onChange={handleInputLpInfo}
          placeholder="상세 정보 입력"
        ></input>
        <div>
          <div>let arr2 = document.getElementsByClassName("goodImg");</div>
          <div>let imgArrStr = "";</div>
          <div>
            arr2.forEach((e) => (imgArrStr += e.currentSrc + "stringend"));
          </div>
          <div>copy(imgArrStr)</div>
        </div> */}
        <form onSubmit={ImgSubmit}>
          <select className="genreUl" onChange={handleChangeValue("genre")}>
            {genre.map((e, index) => (
              <option value={e} key={index}>
                {e}
              </option>
            ))}
          </select>
          <div>
            <input
              type="text"
              placeholder="가수"
              onChange={handleChangeValue("artist")}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="앨범"
              onChange={handleChangeValue("albumTitle")}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="판매가"
              onChange={handleChangeValue("sellingPrice")}
            />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleInputLpimg}
            placeholder="이미지 입력"
          ></input>
          <img
            src={imgSrc}
            className={`image-preview ${imgSrc && "image-preview-show"}`}
          />
          {/* <button type="submit">이미지 생성</button> */}
          {/* <button onClick={lpInputBtnOn} >변환</button> */}

          <button type="submit">db 보내기</button>
        </form>
      </div>
    </div>
  );
}

export default AdminPage;