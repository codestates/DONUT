require("dotenv").config(); // 비밀번호 환경변수로 사용가능
const fs = require("fs"); // 파일 만들기, 읽기 기능
const https = require("https");
const cors = require("cors"); // 보안정책
const cookieParser = require("cookie-parser"); // 쿠키정보에 접근가능
const express = require("express"); // express 사용
const controllers = require("./controllers");
const app = express();
const multer = require("multer");
const { v4: uuid } = require("uuid");
// console.log("uuid: ", uuid())
const mime = require("mime-types");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 주소형식으로 들어온 요청 파싱 옵션 지정
app.use(
  cors({
    origin: [process.env.ORIGIN],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
  })
);

// 라우터가 제대로 지정되어있어야 함 - 404에러의 주범;
app.use(cookieParser());
app.post("/Kakao", controllers.Kakao);
app.post("/KakaoCallback", controllers.KakaoCallback);
app.patch("/UserInfo", controllers.UserInfo);
app.get("/MyInfo", controllers.MyInfo);
//app.get("/UserWrite", controllers.UserWrite);
app.post("/SignOut", controllers.SignOut);
app.get("/AuthLogin", controllers.AuthLogin);
app.delete("/Withdrawal", controllers.Withdrawal);

app.get("/AllPost", controllers.AllPost);
app.post("/DetailPost", controllers.DetailPost);
app.post("/CheckCookiePost", controllers.CheckCookiePost);
app.post("/AddPost", controllers.AddPost);
app.patch("/PostModify", controllers.PostModify);
app.delete("/DeletePost", controllers.DeletePost);

app.get("/AllFreetalk", controllers.AllFreetalk);
app.post("/DetailFreetalk", controllers.DetailFreetalk);
app.post("/CheckCookieFreetalk", controllers.CheckCookieFreetalk);
app.post("/AddFreetalk", controllers.AddFreetalk);
app.patch("/FreetalkModify", controllers.FreetalkModify);
app.delete("/DeleteFreetalk", controllers.DeleteFreetalk);

app.get("/AllLplist", controllers.AllLplist);
app.post("/DetailLplist", controllers.DetailLplist);

app.post("/LikeLplist", controllers.LikeLplist);
app.post("/AddLpPrice", controllers.AddLpPrice);

//console.log(controllers.Kakao.getToken);
//app.get('/Kakao', controllers.Kakao.getUserInfo);

app.post("/AddLplist", controllers.AddLplist);
app.post("/AddRecentPrice", controllers.AddRecentPrice);

app.post("/AddFreetalkComment", controllers.AddFreetalkComment);
app.post("/AddPostComment", controllers.AddPostComment);
app.get("/RenderPage", controllers.RenderPage);

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) cb(null, true);
    else cb(new Error("invalid file type."), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

app.post("/upload", upload.single("image"), (req, res) => {
  //console.log(req.file);
  res.json({ data: req.file.path });
});

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("https server running", "? 됨?"));
} else {
  server = app.listen(HTTPS_PORT, () => console.log("http server running"));
}
module.exports = server;
