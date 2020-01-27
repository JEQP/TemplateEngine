const inq = require("inquirer");

function createTeam() {
    inq

        .prompt([
            {
                type: "input",
                message: "Create your engineering team. What is the Team Manager's name?",
                name: "name1"
            },
            {
                type: "number",
                message: "What is this manager's ID?",
                name: "id1"
            },
            {
                type: "input",
                message: "What is this manager's e-mail address?",
                name: "email1"
            },
            {
                type: "number",
                message: "What is this manager's office number?",
                name: "officeNumber"
            }
        ])
        .then(function (data) {
            console.log("197 createTeam: " + data);
            managerTeam.push(data);
        });

}
createTeam();
