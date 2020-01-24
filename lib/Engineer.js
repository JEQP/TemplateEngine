const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name1, id1, email1, GitHubUser) {
        const name = name1;
        const id = id1;
        const email = email1;
        super(name, id, email);
        this.github = GitHubUser;
    }

    getRole() {
        return "Engineer";
    }

    getGithub(){
        return this.github;
    }

}

module.exports = Engineer;