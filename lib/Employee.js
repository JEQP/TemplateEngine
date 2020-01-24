class Employee { //check whether the file name needs to be capitalised
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
// These may need to return values rather than console log them
    getName() {
        // console.log(`Name: ${this.name}`);
        return this.name;
    }

    getId() {
        // console.log(`ID: ${this.id}`);
        return this.id;
    }

    getEmail() {
        // console.log(`Email: ${this.email}`);
        return this.email;
    }

    getRole() {
        // console.log(`"Employee"`);
        return "Employee";
    }

}

module.exports = Employee;