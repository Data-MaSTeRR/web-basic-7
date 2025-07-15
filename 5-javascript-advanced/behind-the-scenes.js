const person = {
    age: 32
};

function getAdultYears(p) {
    p.age -= 18;
    return p.age;
}

getAdultYears({ ...person }) // ... 이용하여 객체 copy하기 -> copy하지 않으면 객체 안의 속성 값이 getAdultYears() 실행으로 바뀜...
getAdultYears(person);