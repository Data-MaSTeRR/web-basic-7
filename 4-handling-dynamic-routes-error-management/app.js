const fs = require("fs");
const path = require("path");

const express = require("express");
const uuid = require("uuid");

const restaurantData = require("./util/restaurant-data");

const app = express();

// express + EJS Template 사용 | 서버에서 HTML에 데이터 삽입 -> 페이지 렌더링 -> 클라이언트 (SSR)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 미들웨어 | public 폴더의 정적파일(html, css, js, 이미지 등) 서빙
app.use(express.static("public"));

// POST 요청의 폼 데이터를 읽어오기 위한 내장 미들웨어 설정
// .urlencoded -> body parser 설정 메서드 (to JS코드 변환)
app.use(express.urlencoded({ extended: true }));

// 메인 페이지
app.get("/", function (req, res) {
  res.render("index");
});

// restaurants 목록
app.get("/restaurants", function (req, res) {
  // filePath에서 fileData json.parse 통해 읽어오기 /util/restaurant-data.js
  const restaurants = restaurantData.getStoredRestaurants();

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});
// 동적 라우트
app.get("/restaurants/:id", function (req, res) {
  // filePath에서 fileData json.parse 통해 읽어오기 /util/restaurant-data.js
  const restaurants = restaurantData.getStoredRestaurants();
  const restaurantId = req.params.id; // URL의 ID

  // 레스토랑 배열 중 id가 같은 레스토랑 찾기
  for (const restaurant of restaurants) {
    if (restaurantId === restaurant.id) {
      return res.render("restaurant-detail", {
        restaurant: restaurant,
      });
    }
  }

  // 레스토랑 못찾아서 for문 탈출 못한 경우 -> 404 error
  res.status(404).render("404");
});

// 추천 restaurant 입력
app.get("/recommend", function (req, res) {
  res.render("recommend");
});

// 추천 restaurants input 전달
app.post("/recommend", function (req, res) {
  // requestBody 저장
  const restaurant = req.body;

  // restaurant 객체에 고유 id 부여 | v4 -> 무작위, 고유성
  restaurant.id = uuid.v4();

  // filePath에서 fileData json.parse 통해 읽어오기 /util/restaurant-data.js
  const restaurants = restaurantData.getStoredRestaurants();

  // requestBody값 fileData에 저장
  restaurants.push(restaurant);

  // fileData에 JS 배열 plaintext화 해서 다시 저장 /util/restaurant-data.js
  restaurantData.storeRestaurants(restaurants);

  // POST요청 후 confirm.html로 redirect
  res.redirect("/confirm");
});

// 확인
app.get("/confirm", function (req, res) {
  res.render("confirm");
});

// About
app.get("/about", function (req, res) {
  res.render("about");
});

// 404 error 미들웨어 | 다른 경로에서 처리되지 못한 것 여기서 처리 -> 마지막 줄
app.use(function (req, res) {
  res.status(404).render("404");
});

// 505 error 미들웨어
app.use(function (err, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
