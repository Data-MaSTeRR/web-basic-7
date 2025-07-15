const express = require("express");
const uuid = require("uuid");

const restaurantData = require("../util/restaurant-data");

const router = express.Router();

// restaurants 목록
router.get("/restaurants", function (req, res) {
  // query 매개변수로 order를 가져옴
  let order = req.query.order;
  let nextOrder = "desc";
  // order query 매개변수가 없으면, 기본값으로 asc
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  // order query 매개변수가 desc에서 btn 누르면 asc로 변경
  if (order === "desc") {
    nextOrder = "asc";
  }

  // filePath에서 fileData json.parse 통해 읽어오기 /util/restaurant-data.js
  const restaurants = restaurantData.getStoredRestaurants();

  // 식당이름 사전편찬식으로 정렬 | 1: B-A -1: A-B
  restaurants.sort(function (restaurantA, restaurantB) {
    if (
        (order === "asc" && restaurantA.name > restaurantB.name) ||
        (order === "desc" && restaurantA.name < restaurantB.name)
    ){
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
    nextOrder: nextOrder
  });
});
// 동적 라우트
router.get("/restaurants/:id", function (req, res) {
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
router.get("/recommend", function (req, res) {
  res.render("recommend");
});

// 추천 restaurants input 전달
router.post("/recommend", function (req, res) {
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
router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
