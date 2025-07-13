const express = require('express');
const app = express();

// .get(경로, 익명함수) {} | 200과 같은 상태코드는 express가 기본값으로 제공
// localhost:3000/currenttime
app.get('/currenttime', function(req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
});

// localhost:3000/
app.get('/', function(req, res) {
    res.send('<h1>Hello World!</h1>');
});

app.listen(3000)