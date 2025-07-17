// class
class Job {
    // property
    constructor(jobTitle, place, salary){
        this.title = jobTitle;
        this.place = place;
        this.salary = salary;
    }

    // method ...
    describe() {
        console.log(`I'm a ${this.title}, I work in ${this.place}, my salary is ${this.salary}`);
    }
}

const developer = new Job('Developer', 'New York', 50000);
const cook = new Job('Cook', 'Tokyo', 30000);
console.log(cook);
console.log(cook.describe());