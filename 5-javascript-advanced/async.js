/*
const fs = require('fs');

function readFile() {
    // 2번째 arg -> txt 구문 분석 후 실행되어야 할 익명함수(콜백함수) | 비동기
    fs.readFile('data.txt', function(err, fileData) {
        if (err) {
            console.log('error!');
        }
        console.log('File parsing done!');
        console.log(fileData.toString());
    });

    // 위 읽기 작업이 비동기라, 'Hello'가 제일 먼저 실행됨
    console.log('Hello')
}

readFile();
 */

/*
const fs = require('fs/promises');

function readFile() {
    // 2번째 arg -> txt 구문 분석 후 실행되어야 할 익명함수(콜백함수) | 비동기
    fs.readFile('data.txt')
        .then(function(fileData) {
            console.log('File parsing done!');
            console.log(fileData.toString());
        })
        .catch(function(err) {
            console.log(err);
        });

    // 위 읽기 작업이 비동기라, 'Hello'가 제일 먼저 실행됨
    console.log('Hello')
}

readFile();
 */

const fs = require('fs/promises');

// async/wait를 통해 promise-chain 단순화
async function readFile() { // async -> 자동으로 promise 반환
    let fileData;
    try { // await는 promise 해결까지 일시적으로 함수 실행을 중단(코드 계속 아래로)
        fileData = await fs.readFile('data.txt')
    } catch(err) {
        console.log(err.message);
    }

    console.log('File parsing done!');
    console.log(fileData.toString());
    console.log('Hello')
}

readFile();
