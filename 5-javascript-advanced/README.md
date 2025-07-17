# 📄 JavaScript 고급 과정 실습 인사이트

이 문서는 JavaScript 고급 과정을 실습하면서 작성한 코드들을 바탕으로 학습한 핵심 인사이트를 정리한 README입니다.

---

## 🚀 함수와 매개변수

### ✅ 기본값 매개변수 & 나머지/스프레드

📄 \[function.js]

* **기본값 매개변수**: 함수 호출 시 값이 전달되지 않으면 기본값 사용

```js
function greetUser(greetingPrefix, userName = 'User') { … }
```

* **나머지 매개변수 (Rest)**: 넘겨진 인자들을 배열로 모아 사용

```js
function sumUp(...numbers) { … }
```

* **스프레드 연산자 (Spread)**: 배열을 풀어서 개별 인자로 전달

```js
sumUp(...numbersArray);
```

---

## 🧩 객체와 불변성

📄 \[behind-the-scenes.js]

* 객체를 함수에 넘길 때는 **참조**가 전달됩니다.
* 따라서 함수 안에서 속성을 바꾸면 원본도 변경됩니다. 
* **스프레드 연산자**로 객체를 복사해 불변성을 유지할 수 있습니다.

```js
getAdultYears({ ...person });
```

📄 \[object.js]

* **클래스 (Class)**: 속성과 메서드를 가진 객체 생성자

```js
class Job { constructor() { … } describe() { … } }
```

* **객체 비구조화 (Destructuring)**: 객체의 속성을 변수로 바로 추출

```js
const { v4: uuidv4 } = require('uuid');
```

---

## 📝 에러 처리

📄 \[errors.js]

* **try/catch**: 동기 코드에서 오류가 발생해도 프로그램이 종료되지 않게 처리

```js
try { … } catch(err) { console.log(err.message); }
```

---

## ⏳ 비동기 처리

📄 \[async.js]

* **콜백 (Callback)**: 가장 기본적인 비동기 처리 방식
* **Promise**: 콜백 지옥을 피하기 위한 체이닝 가능 방식
* **async/await**: Promise를 더 직관적이고 동기 코드처럼 작성

### 예시

```js
// async/await
async function readFile() {
  try {
    const fileData = await fs.readFile('data.txt');
    console.log(fileData.toString());
  } catch(err) {
    console.log(err);
  }
}
```

### 비동기 흐름 이해

* 파일 읽기 요청 → 바로 다음 코드(`console.log('Hello')`)가 먼저 실행됨 → 파일 읽기 완료 후 콜백/then/await 이후 코드 실행

---

## 🔗 종합

| 주제     | 핵심 포인트                         |
| ------ | ------------------------------ |
| 함수     | 기본값, Rest, Spread 활용           |
| 객체     | 참조/복사, 클래스, 비구조화               |
| 에러 처리  | try/catch로 안전하게 예외 처리          |
| 비동기 처리 | 콜백 → Promise → async/await로 발전 |

---

## 💡 배운 점

✅ ES6 문법을 활용하면 코드 가독성과 유지보수성이 높아진다.
✅ 객체를 복사하거나 불변성을 유지하는 것이 중요하다.
✅ 비동기 로직을 이해하고 async/await로 작성하면 더 직관적이다.
✅ 에러를 적절히 처리해 프로그램 안정성을 높일 수 있다.

---

이 실습을 통해 자바스크립트의 고급 기능들을 실제 코드에 적용하고, 더 효율적이고 안전한 코드를 작성하는 방법을 익힐 수 있었습니다. ✨
