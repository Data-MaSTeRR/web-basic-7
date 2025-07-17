const fs = require('fs');

// try/catch -> 코드 실패 후 바로 프로세스 종료 원하지 않을 때
function readFile() {
    try {
        const fileData = fs.readFileSync('data.json');
    }
    catch(err) {
        console.log('error!', err.message);
    }
    console.log('Hello')
}

readFile();