const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name1, id1, email1, officeNumber) {
        // super passes to the clas being extended. The values must be set to constants before they can be passed.
        const name = name1;
        const id = id1;
        const email = email1;
        super(name, id, email);  
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;