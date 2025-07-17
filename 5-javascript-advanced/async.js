const fs = require('fs');

function readFile() {
    // 2번째 arg -> txt 구문 분석 후 실행되어야 할 익명함수(콜백함수) | 비동기
    fs.readFile('data.txt', function(err, fileData) {
        console.log('File parsing done!');
        console.log(fileData.toString());
    });

    // 위 읽기 작업이 비동기라, 'Hello'가 제일 먼저 실행됨
    console.log('Hello')
}

readFile();