const Employee = require("./Employee");

class Intern extends Employee {
    constructor (name1, id1, email1, school) {
        const name = name1;
        const id = id1;
        const email = email1;
        super(name, id, email);
        this.school = school;
    }

    getRole(){
        return "Intern";
    }

    getSchool(){
        return this.school;
    }

}

module.exports = Intern;