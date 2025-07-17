class Job {
    constructor(jobTitle, place, salary){
        this.title = jobTitle;
        this.place = place;
        this.salary = salary;
    }
}

const developer = new Job('Developer', 'New York', 50000);
const cook = new Job('Cook', 'Tokyo', 30000);
console.log(cook);