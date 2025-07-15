// 필수인자: greetingPrefix, 선택인자: userName
function greetUser(greetingPrefix, userName = 'User') {
    console.log(`${greetingPrefix} ${userName}!`);
}

greetUser('Hi','Eric');
greetUser('Hello');

// ...은 인자의 개수에 제한을 두지 않고, 배열로 Wrapping (나머지 인자들) | 함수 매개변수에서 → 넘겨진 여러 인자를 배열로 "모음"
function sumUp(...numbers) {
    let result = 0;
    for (const number of numbers) {
        result += number;
    }
    return result;
}

sumUp(1, 2, 3, 4, 5);

const numbersArray = [1, 2, 3, 4, 5];
sumUp(...numbersArray); // ... 배열을 각각의 인자로 풀기 (스프레드 연산자) | 	함수 호출, 배열 등에서 → 배열을 개별 요소로 "풀어냄"