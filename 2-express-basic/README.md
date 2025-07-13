# 📄 Express.js + File System 앱 README (인사이트 버전)

이 문서는 파일 시스템을 활용해 사용자를 저장하고 불러오는 Express.js 애플리케이션에 대한 상세한 설명과 실행 방법, 그리고 실무적인 인사이트를 담고 있습니다.

---

## 🚀 코드 개요

📦 **주요 기능**

* 사용자가 이름을 입력하여 제출 → `users.json` 파일에 저장
* 저장된 사용자 목록을 읽어와 HTML 리스트로 출력

---

## 📜 코드 분석

### 📦 모듈 로드

```js
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
```

* `fs`: 파일 읽기/쓰기용 Node.js 표준 모듈
* `path`: 디렉토리 경로를 OS에 맞게 처리
* `express`: 웹 서버 프레임워크

---

### 📋 미들웨어 설정

```js
app.use(express.urlencoded({ extended: false }));
```

* HTML 폼 데이터(`application/x-www-form-urlencoded`)를 파싱해 `req.body`에 할당
* `extended: false` → 단순한 key-value 데이터만 파싱 가능 (중첩 객체 필요시 true)

---

### 📝 라우트

#### `/currenttime`

```js
app.get('/currenttime', (req, res) => {
  res.send('<h1>' + new Date().toISOString() + '</h1>');
});
```

✅ 현재 시간 출력
✅ 단순 라우트 구조 확인용

---

#### `/`

```js
app.get('/', (req, res) => {
  res.send('<form action="/store-user" method="POST">' +
      '<label>Your Name</label>' +
      '<input type="text" name="username">' +
      '<button>Submit</button>' +
      '</form>');
});
```

✅ 사용자 이름을 입력받는 폼 렌더링
✅ `POST /store-user`로 제출

---

#### `/store-user`

```js
app.post('/store-user', (req, res) => {
  const userName = req.body.username;

  const filePath = path.join(__dirname, 'data', 'users.json');
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  existingUsers.push(userName);
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send('<h1>Username stored!</h1>');
});
```

✅ POST로 전달받은 이름을 `users.json`에 저장
✅ 동기적 파일 처리 (`readFileSync`, `writeFileSync`)로 간단하지만 블로킹 발생 가능

---

#### `/users`

```js
app.get('/users', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'users.json');
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = '<ul>';
  for (const user of existingUsers) {
    responseData += `<li>${user}</li>`;
  }
  responseData += '</ul>';

  res.send(responseData);
});
```

✅ 저장된 사용자 목록을 HTML 리스트로 렌더링
✅ 파일에서 데이터를 동기식으로 읽고 JSON을 파싱

---

### 🔊 서버 실행

```js
app.listen(3000);
```

✅ 포트 `3000`에서 서버 시작
✅ 브라우저에서 `http://localhost:3000` 접속

---

## 📖 주요 메서드 & 개념 요약

| 코드                 | 설명                   |
| ------------------ | -------------------- |
| `fs.readFileSync`  | 파일을 읽어 문자열로 반환 (블로킹) |
| `JSON.parse`       | JSON → JS 객체         |
| `JSON.stringify`   | JS 객체 → JSON 문자열     |
| `fs.writeFileSync` | 파일에 데이터 기록 (블로킹)     |
| `path.join`        | OS별 경로 생성            |
| `__dirname`        | 현재 파일이 위치한 디렉토리      |

---

## 📋 실행 방법

1️⃣ Node.js 설치
2️⃣ 프로젝트 폴더 생성 후 `npm init -y`
3️⃣ `npm install express`
4️⃣ `data/users.json` 파일 생성 (초기 내용: `[]`)
5️⃣ 위 코드를 `app.js`로 저장
6️⃣ `node app.js` 실행
7️⃣ 브라우저에서 `http://localhost:3000` 접속

---

## 🌟 인사이트

✅ 동기식 파일 I/O(`fs.readFileSync`)는 블로킹되므로, 비동기(`fs.promises`)나 데이터베이스로 전환하는 것이 이상적입니다.
✅ `users.json`은 단순한 배열 JSON이지만, 에러 발생 시 (`파일 없음`, `잘못된 JSON`) 앱이 크래시할 수 있으므로 예외처리 필요합니다.
✅ `extended: false`는 `true`에 비해 보안성이 높지만, 중첩된 폼데이터가 필요하다면 `true`를 써야 합니다.
✅ 파일을 계속 읽고 쓰므로 높은 동시 요청에서는 성능 저하가 큽니다 → DB나 캐싱 사용 권장

---

## 🔄 nodemon으로 개발 효율 높이기

`nodemon`은 코드 변경 시 서버를 자동으로 재시작해줍니다.

### 설치 & 실행

```bash
npm install -g nodemon
nodemon app.js
```

✅ 코드 저장 → 서버 자동 재시작 → 빠른 피드백
✅ 개발 시 필수 도구로 많이 사용됨

---

## ⚠️ 주의사항

* 현재는 에러 핸들링 로직이 없고, 파일이 없거나 JSON 파싱에 실패하면 서버가 죽습니다.
* 파일 경합(race condition) 문제나, 파일 크기 증가에 따른 성능 저하 가능
* 실무에서는 반드시 데이터베이스로 교체 권장

---

📗 *이 프로젝트는 Express와 파일 시스템을 연동해 데이터를 저장하고 출력하는 기초적인 구조를 보여줍니다. 이후에는 비동기 로직, 에러 핸들링, DB 연동으로 발전시키면 더 탄탄한 애플리케이션을 만들 수 있습니다.*
