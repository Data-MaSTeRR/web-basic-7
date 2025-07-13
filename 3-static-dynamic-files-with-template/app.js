const path = require('path');

const express = require('express')
const app = express();

// 미들웨어 | public 폴더의 정적파일(html, css, js, 이미지 등) 서빙
app.use(express.static('public'));

// 메인 페이지
app.get('/', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(htmlFilePath);
})

// restaurants 목록
app.get('/restaurants', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlFilePath);
})

// 추천 restaurant 입력
app.get('/recommend', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(htmlFilePath);
})

// 확인
app.get('/confirm', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    res.sendFile(htmlFilePath);
})

// About
app.get('/about', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(htmlFilePath);
})

app.listen(3000);