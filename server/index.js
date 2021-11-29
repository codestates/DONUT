require('dotenv').config(); // 비밀번호 환경변수로 사용가능
const fs = require('fs'); // 파일 만들기, 읽기 기능
const https = require('https');
const cors = require('cors'); // 보안정책
const cookieParser = require('cookie-parser'); // 쿠키정보에 접근가능
const express = require('express'); // express 사용
const app = express();

//const controllers = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 주소형식으로 들어온 요청 파싱 옵션 지정
app.use(
  cors({
    origin: ['https://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT']
  })
);

// 라우터가 제대로 지정되어있어야 함 - 404에러의 주범;
app.use(cookieParser());


const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log('https server running'));
} else {
  server = app.listen(HTTPS_PORT, () => console.log('http server running'));
}
module.exports = server;