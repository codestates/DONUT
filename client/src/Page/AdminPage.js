import React from "react";
import { useState } from "react";

function AdminPage() {
  let [inputLpInfo, setInputLpinfo] = useState();
  let [inputLpimg, setinputLpimg] = useState();
  const [lpGenre, setLpGenre] = useState("KOREAN");
  const [result, setResult] = useState([]);

  const genre = [
    "KOREAN",
    "HIPHOP / SOUL / R&B",
    "ROCK / POP / ELECTRONICA",
    "JAZZ",
    "OST",
    "JAPANESE",
  ];

  const handleInputLpInfo = (e) => {
    setInputLpinfo(e.target.value);
  };

  const handleInputLpimg = (e) => {
    setinputLpimg(e.target.value);
  };

  const handleInputLpGenre = (e) => {
    setLpGenre(e.target.value);
  };

  const lpInputBtnOn = () => {
    if (inputLpimg && inputLpInfo) {
      console.log("돌아간다");
      let infoArr = [];
      inputLpInfo = inputLpInfo.split("stringend");
      inputLpimg = inputLpimg.split("stringend");

      inputLpInfo.forEach((e, idx) => {
        let lpInfoObj = {};
        let eleArr = e.split(" - ");
        if (e.length) {
          lpInfoObj.genre = lpGenre;
          lpInfoObj.artist = eleArr[0];
          lpInfoObj.albumName = eleArr[1];
          lpInfoObj.image = inputLpimg[idx];
          infoArr.push(lpInfoObj);
        }
      });
      setResult(infoArr);
    } else {
      alert("내용을 입력하세요");
    }
  };

  const sendIfoDb = () => {
    console.log("작동", result);
    //!result 배열의 길이만큼 post로 db 내보내기.
    // result.forEach((e) => {
    //   axios
    //     .post("https://localhost:4000/", { result })
    //     .then(alret("내보내기 완료"))
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // });
    //!내보내기 실행 시 몇개나 진행되었는지 확인해주는 모달창 띄워주기
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
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
        <select className="genreUl" onChange={handleInputLpGenre}>
          {genre.map((e, index) => (
            <option value={e} key={index}>
              {e}
            </option>
          ))}
        </select>
        <div>
          <div>
            <div>let arr = document.getElementsByClassName("c333333");</div>
            <div>let infoArrStr= "";</div>
            <div>
              arr.forEach( (e) => (infoArrStr +=e.firstElementChild.innerText +
              "stringend") );
            </div>
            <div>copy(infoArrStr)</div>
          </div>
          <input
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
          </div>
          <input
            type="text"
            onChange={handleInputLpimg}
            placeholder="이미지 입력"
          ></input>
        </div>
        <button onClick={lpInputBtnOn}>변환</button>
        <button onClick={sendIfoDb}>db 내보내기</button>
      </div>
    </form>
  );
}

export default AdminPage;
