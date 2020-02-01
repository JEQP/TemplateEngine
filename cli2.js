const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inq = require("inquirer");
const fs = require("fs");
const HTMLpage = require("./lib/TeamHTML2");
const hparse = require("node-html-parser");


const teamMembers = [];

// initial questions, for manager
const managerQuestions = [{
    type: "input",
    name: "name1",
    message: "What is the Team Manager's name?",
    validate: validateName
}, {
    type: "input",
    name: "id1",
    message: "What is this manager's ID?",
    validate: validateID
}, {
    type: "input",
    name: "email1",
    message: "What is this manager's e-mail address?",
    validate: validateEmail
}, {
    type: "input",
    name: "officeNumber",
    message: "What is this manager's office number?",
    validate: validateID
}]
// Questions for entering an engineer
const engineerQuestions = [{
    type: "input",
    name: "name1",
    message: "What is this engineer's name?",
    validate: validateName
}, {
    type: "input",
    name: "id1",
    message: "What is this engineer's ID?",
    validate: validateID
}, {
    type: "input",
    name: "email1",
    message: "What is this engineer's e-mail address?",
    validate: validateEmail
}, {
    type: "input",
    name: "GitHubUser",
    message: "What is this engineer's Github username?",
    validate: validateGithub
}];
// Questions for entering an intern
const internQuestions = [{
    type: "input",
    name: "name1",
    message: "What is this intern's name?",
    validate: validateName
    
}, {
    type: "input",
    name: "id1",
    message: "What is this interns's ID?",
    validate: validateID
}, {
    type: "input",
    name: "email1",
    message: "What is this intern's e-mail address?",
    validate: validateEmail
}, {
    type: "input",
    name: "school",
    message: "What is this intern's school?",
    validate: validateName
}];

// FUNCTIONS

function validateName(name1) {
    const inputName = name1;
    const nameRegex = /^(?=.*?[a-zA-Z\s])[a-zA-Z\s]+$/
    const nameResult = nameRegex.test(inputName);
    if (nameResult) {
        return true;
    }
    else {
        console.log("Names require letters.");
    }
}

function validateID(id1) {
        const inputNum = id1;
        const numRegex = /^(?=.*?[0-9])[0-9]+$/
        const numResult = numRegex.test(inputNum);
        if (numResult) {
            return true;
        }
        else {
            console.log("Only numbers, my dude.");
        }
    }

    function validateEmail(email1) {
        const inputEmail = email1;
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
        const emailResult = emailRegex.test(inputEmail);
        if (emailResult) {
            return true;
        }
        else {
            console.log("We need a valid e-mail, you know what that looks like.");
        }
    }

    function validateGithub(GitHubUser) {
        const inputGH = GitHubUser;
        const GHRegex = /^(?=.*?[-a-zA-Z0-9])[-a-zA-Z0-9]+$/
        const GHResult = GHRegex.test(inputGH);
        if (GHResult) {
            return true;
        }
        else {
            console.log("We need a valid Github username, or admit you're not a real engineer.")
        }
    }



function employeeType() {
    inq.prompt([{
        type: "list",
        name: "choice",
        message: "Please choose the type of employee to add:",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "No more to add"
        ]
    }]).then(function (response) {
        console.log("choice: " + response.choice +" "+ (response.choice === "Manager"));
        if (response.choice === "Manager") {
            askManagerQs();
        }
        else if (response.choice === "Engineer") {
            askEngineerQs();
        }
        else if (response.choice === "Intern") {
            askInternQs();
        }
        else {
            createHTML();
        }
    })
}

function askManagerQs() {
    inq.prompt(managerQuestions).then(answers => {
        const manager = new Manager(answers.name1, answers.id1, answers.email1, answers.officeNumber);
        teamMembers.push(manager);
        employeeType();
    });
    
}

function askEngineerQs() {
    inq.prompt(engineerQuestions).then(answers => {
        const engineer = new Engineer(answers.name1, answers.id1, answers.email1, answers.GitHubUser);
        teamMembers.push(engineer);
        employeeType();
    });
    
}

function askInternQs() {
    inq.prompt(internQuestions).then(answers => {
        const intern = new Intern(answers.name1, answers.id1, answers.email1, answers.school);
        teamMembers.push(intern);
        employeeType();
    });
    
}


function createHTML() {
    console.log("creating HTML");

    fs.readFile('./lib/main.html', 'utf8', (err, html) => {
        if (err) {
            throw err;
        }
        var testbody = html.toString();

        const body = hparse.parse(testbody, { style: true });
        const headerLoc = body.querySelector("#title_slot");
        headerLoc.appendChild(HTMLpage.title(teamMembers[0]));

        teamMembers.forEach(item => {
            if (item.getRole() === "Manager") {
                const loc = body.querySelector(".manager_col");
                loc.appendChild(HTMLpage.manager(item));
            }
            else if (item.getRole() === "Engineer") {
                const locEng = body.querySelector(".engineer_col");
                locEng.appendChild(HTMLpage.engineer(item));
            }
            else if (item.getRole() === "Intern") {
                const locInt = body.querySelector(".intern_col");
                locInt.appendChild(HTMLpage.intern(item));
            }
        })

        var outputfile = "./output/" + teamMembers[0].name + "team.html";
        console.log("Saving file as: " + outputfile);
        fs.writeFile(`${outputfile}`, body, function (err) {
            if (err) {
                return console.log(err);
            }
        });


    });
}

function init() {
    employeeType();
}

init();