// file system 패키지
const fs = require('fs');
const path = require('path');

// express 모듈을 불러와 app 인스턴스 생성
const express = require('express');
const app = express();

// POST 요청의 폼 데이터를 읽어오기 위한 내장 미들웨어 설정
// .urlencoded -> body parser 설정 메서드 (to JS코드 변환)
app.use(express.urlencoded({extended: false}));

// .get(경로, 익명함수) {} | 200과 같은 상태코드는 express가 기본값으로 제공
// localhost:3000/currenttime
app.get('/currenttime', function(req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
});

// localhost:3000/
app.get('/', function(req, res) {
    res.send('<form action="/store-user" method="POST">' +
        '<label>Your Name</label>' +
        '<input type="text" name="username">' +
        '<button>Submit</button>' +
        '</form>');
});

// localhost:3000/store-user
app.post('/store-user', function(req, res) {
    const userName = req.body.username;

    const filePath = path.join(__dirname, 'data', 'users.json'); // __dirname -> 프로젝트의 디렉터리 구조를 보유한 인스턴스 | root에서 순서대로
    const fileData = fs.readFileSync(filePath); // plaintext
    const existingUsers = JSON.parse(fileData); // plaintext -> JS
    existingUsers.push(userName); // 배열 안에 userName 추가
    fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // JS -> plaintext

    res.send('<h1>Username stored!</h1>');
});

app.listen(3000)