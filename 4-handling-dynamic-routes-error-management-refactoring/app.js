const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

// routes 미들웨어
app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

// express + EJS Template 사용 | 서버에서 HTML에 데이터 삽입 -> 페이지 렌더링 -> 클라이언트 (SSR)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 미들웨어 | public 폴더의 정적파일(html, css, js, 이미지 등) 서빙
app.use(express.static("public"));

// POST 요청의 폼 데이터를 읽어오기 위한 내장 미들웨어 설정
// .urlencoded -> body parser 설정 메서드 (to JS코드 변환)
app.use(express.urlencoded({ extended: true }));

// 404 error 미들웨어 | 다른 경로에서 처리되지 못한 것 여기서 처리 -> 마지막 줄
app.use(function (req, res) {
  res.status(404).render("404");
});

// 505 error 미들웨어
app.use(function (err, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
