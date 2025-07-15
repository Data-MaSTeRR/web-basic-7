// 필수인자: greetingPrefix, 선택인자: userName
function greetUser(greetingPrefix, userName = 'User') {
    console.log(greetingPrefix + " " + userName);
}

greetUser('Hi','Eric');
greetUser('Hello');