require("dotenv").config(); // 비밀번호 환경변수로 사용가능
const fs = require("fs"); // 파일 만들기, 읽기 기능
const https = require("https");
const cors = require("cors"); // 보안정책
const cookieParser = require("cookie-parser"); // 쿠키정보에 접근가능
const express = require("express"); // express 사용
const controllers = require("./controllers");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 주소형식으로 들어온 요청 파싱 옵션 지정
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
  })
);

// 라우터가 제대로 지정되어있어야 함 - 404에러의 주범;
app.use(cookieParser());
app.post('/KakaoCallback', controllers.KakaoCallback);
//console.log(controllers.Kakao.getToken);
//app.get('/Kakao', controllers.Kakao.getUserInfo);


const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log('https server running', '? 됨?'));
} else {
  server = app.listen(HTTPS_PORT, () => console.log("http server running"));
}
module.exports = server;
