const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRestaurants() {
  // filePath에서 fileData json.parse 통해 읽어오기
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  // fileData에 JS 배열 plaintext화 해서 다시 저장
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

// 함수를 노출시키려면 필수
module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
