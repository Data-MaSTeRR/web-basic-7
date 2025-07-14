const fs = require('fs');
const path = require('path');

const express = require('express')
const app = express();

// 미들웨어 | public 폴더의 정적파일(html, css, js, 이미지 등) 서빙
app.use(express.static('public'));

// POST 요청의 폼 데이터를 읽어오기 위한 내장 미들웨어 설정
// .urlencoded -> body parser 설정 메서드 (to JS코드 변환)
app.use(express.urlencoded({extended: true}));

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

// 추천 restaurants input 전달
app.post('/recommend', function (req, res) {
    // requestBody 저장
    const restaurant = req.body;

    // filePath에서 fileData json.parse 통해 읽어오기
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    // requestBody값 fileData에 저장
    storedRestaurants.push(restaurant);

    // fileData에 JS 배열 plaintext화 해서 다시 저장
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    // POST요청 후 confirm.html로 redirect
    res.redirect('/confirm');
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