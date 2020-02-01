const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name1, id1, email1, officeNumber) {
        // super passes to the clas being extended. The values must be set to constants before they can be passed.
        super(name1, id1, email1);
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