# 📄 Express 실습: 동적 라우트, 에러 처리, 코드 리팩터링

이 문서는 Express.js를 사용해 웹 애플리케이션을 구현하면서 학습한 **동적 라우트 처리**, **에러 처리**, **반복 코드 리팩터링** 방법을 정리한 README입니다.

---

## 🚀 1️⃣ Express에서 동적 라우트

### 🔷 동적 라우트란?

URL의 일부분을 **변수처럼 처리**해, 요청 경로에 따라 동적으로 다른 결과를 반환할 수 있는 라우트입니다.

예: `/restaurants/:id`

### ✨ 예제 코드

```js
app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;
  res.render('restaurant-detail', { rid: restaurantId });
});
```

* `:id` → URL의 한 부분을 파라미터로 받아옴.
* `req.params.id` → 실제 요청에서 전달된 값.
* 클라이언트가 `/restaurants/r1`에 접속하면 `restaurantId`는 `r1`이 됩니다.

### 💡 포인트

* URL 패턴을 동적으로 매칭해 재사용성을 높임.
* 뷰에서는 `<a href="/restaurants/<%= restaurant.id %>">` 처럼 동적 링크 작성.

---

## 🩹 2️⃣ 에러 처리

### 🔷 에러 처리란?

서버 요청 처리 중에 발생할 수 있는 오류(예: 잘못된 라우트, 서버 오류)를 사용자에게 적절히 안내하는 페이지로 처리하는 것.

### ✨ 예제 코드

```js
// 404 Not Found 핸들러
app.use((req, res, next) => {
  res.status(404).render('404');
});

// 500 Internal Server Error 핸들러
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('500');
});
```

### 💡 포인트

* 404는 존재하지 않는 경로 요청에 대한 처리.
* 500은 서버 로직에서 발생한 오류에 대한 처리.
* 에러 핸들러는 반드시 모든 라우트 정의 **뒤에** 선언해야 함.
* `views/404.ejs`와 `views/500.ejs` 파일이 있어야 렌더링 가능.

📌 왜 4개인가?

Express는 함수의 인자 개수로 그 함수가 일반 미들웨어인지 에러 처리 미들웨어인지 구분합니다.

보통의 미들웨어는 (req, res, next) (3개)로 작성됩니다.

하지만 에러 처리 미들웨어는 반드시 (err, req, res, next) (4개)를 받아야 합니다.

이렇게 하면 Express가 요청을 처리하다가 에러가 발생했을 때 자동으로 이 함수로 넘어갑니다.

---

## 🔄 3️⃣ 반복되는 코드 리팩터링

### 🔷 왜 리팩터링?

* 동일한 코드가 여러 파일에 존재 → 유지보수 어려움.
* 관심사별로 코드 분리 → 가독성 및 재사용성 향상.

### ✨ 방법

#### 📁 `/util` 폴더

* 파일 읽기/쓰기와 같은 유틸리티 함수들을 별도 모듈로 분리.

예: `util/restaurant-data.js`

```js
const fs = require('fs');
const path = require('path');

function getStoredRestaurants() {
  const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

module.exports = { getStoredRestaurants };
```

#### 📁 `/routes` 폴더

* 각 요청 경로별 라우터를 분리하여 관리.

예: `routes/restaurants.js`

```js
const express = require('express');
const { getStoredRestaurants } = require('../util/restaurant-data');

const router = express.Router();

router.get('/', (req, res) => {
  const restaurants = getStoredRestaurants();
  res.render('restaurants', { restaurants });
});

module.exports = router;
```

### 💡 포인트

* 관심사별 폴더(`routes`, `util`, `views`)로 정리.
* `app.js`에서는 필요한 라우터만 불러와 사용.

```js
const restaurantRoutes = require('./routes/restaurants');
app.use('/restaurants', restaurantRoutes);
```

---

## 📌 요약

✅ **동적 라우트**로 URL 변수 처리 및 재사용성 향상.
✅ **에러 처리**로 사용자에게 친절한 안내와 로깅 가능.
✅ **리팩터링**으로 코드의 가독성과 유지보수성 강화.

이 세 가지를 적용해 보다 견고하고 유지보수가 쉬운 Express 웹 애플리케이션을 만들 수 있습니다. ✨
