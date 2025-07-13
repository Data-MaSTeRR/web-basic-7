# 📄 Express.js 서버 예제 README

이 문서는 아래의 간단한 Express.js 서버 코드에 대한 설명과 실행 방법을 담고 있습니다.

---

## 🚀 코드 예제

```js
const express = require('express');
const app = express();

// localhost:3000/currenttime
app.get('/currenttime', function(req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
});

// localhost:3000/
app.get('/', function(req, res) {
    res.send('<h1>Hello World!</h1>');
});

app.listen(3000);
```

---

## 📝 코드 설명

### 📦 모듈 로드 & 앱 생성

```js
const express = require('express');
const app = express();
```

* Express 모듈을 불러와 `app` 인스턴스를 생성합니다.
* `app`은 라우팅, 미들웨어 처리 등을 담당합니다.

---

### 📍 라우트 설정

#### `/currenttime`

```js
app.get('/currenttime', function(req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
});
```

✅ GET 요청 `/currenttime`에 현재 시간을 ISO 포맷으로 응답합니다.
✅ 상태 코드는 기본적으로 `200 OK`가 설정됩니다.

#### `/`

```js
app.get('/', function(req, res) {
    res.send('<h1>Hello World!</h1>');
});
```

✅ GET 요청 `/`에 단순한 "Hello World!" 메시지를 응답합니다.

---

### 🔊 서버 실행

```js
app.listen(3000);
```

✅ 포트 `3000`에서 서버를 실행하고 요청을 대기합니다.
✅ `http://localhost:3000/` 또는 `http://127.0.0.1:3000/`로 접속 가능

---

## 💡 동작 원리 요약

1️⃣ `express()`로 서버 애플리케이션을 생성합니다.
2️⃣ `app.get()`으로 라우트별 요청 핸들러를 등록합니다.
3️⃣ `res.send()`로 응답을 전송하고 요청을 종료합니다.
4️⃣ `app.listen()`으로 포트를 열고 서버를 실행합니다.

---

## 📖 주요 메서드

| 메서드                      | 설명                               |
| ------------------------ | -------------------------------- |
| `app.get(path, handler)` | GET 요청에 대해 라우트 처리                |
| `res.send()`             | 클라이언트에 응답 전송 (HTML, JSON, 문자열 등) |
| `app.listen(port)`       | 지정한 포트에서 서버 실행                   |

---

## ⚠️ 참고사항

* `res.send()`는 문자열, 버퍼, JSON 모두 전송 가능하며 Content-Type을 자동으로 설정합니다.
* `res.send()` 후에는 반드시 요청이 종료됩니다. 이후에 다른 응답을 보내면 에러 발생합니다.
* 라우트의 순서가 중요합니다. 먼저 정의된 라우트가 우선 매칭됩니다.

---

## 📋 실행 방법

1️⃣ Node.js와 npm이 설치돼 있어야 합니다.
2️⃣ 프로젝트 폴더에서 `npm init -y`로 초기화
3️⃣ `npm install express`로 Express 설치
4️⃣ 위의 코드를 `app.js`에 작성
5️⃣ 터미널에서 `node app.js` 실행
6️⃣ 브라우저에서 `http://localhost:3000` 접속

---

## 🌟 더 알아보기

* [Express 공식 문서](https://expressjs.com/)
* [MDN: Express 소개](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)

---

📗 *Express를 이용해 빠르고 간단하게 웹 서버를 만드는 예제입니다. 유지보수를 위해 라우터 분리, 미들웨어, 에러 핸들링 등을 추가로 공부해보세요!*
