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
    message: "What is the Team Manager's name?"
}, {
    type: "number",
    name: "id1",
    message: "What is this manager's ID?",
    // validate: validateID
}, {
    type: "input",
    name: "email1",
    message: "What is this manager's e-mail address?",
    // validate: validateEmail
}, {
    type: "number",
    name: "officeNumber",
    message: "What is this manager's office number?"
}]
// Questions for entering an engineer
const engineerQuestions = [{
    type: "input",
    name: "name1",
    message: "What is this engineer's name?"
}, {
    type: "number",
    name: "id1",
    message: "What is this engineer's ID?"
}, {
    type: "input",
    name: "email1",
    message: "What is this engineer's e-mail address?"
}, {
    type: "input",
    name: "GitHubUser",
    message: "What is this engineer's Github username?"
}];
// Questions for entering an intern
const internQuestions = [{
    type: "input",
    name: "name1",
    message: "What is this intern's name?"
}, {
    type: "number",
    name: "id1",
    message: "What is this interns's ID?"
}, {
    type: "input",
    name: "email1",
    message: "What is this interns's e-mail address?"
}, {
    type: "input",
    name: "school",
    message: "What is this intern's school?"
}];

// FUNCTIONS

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
        //   idArray.push(answers.managerId);
        //   buildTeam();
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
        // console.log("html: " + html);        // const root = parse(html);
        var testbody = html.toString();
        // console.log("testbody: " + testbody);

        const body = hparse.parse(testbody, { style: true });
        // console.log("body: " + body);
        const headerLoc = body.querySelector("#title_slot");
        headerLoc.appendChild(HTMLpage.title(teamMembers[0]));

        teamMembers.forEach(item => {
            if (item.getRole() === "Manager") {
                const loc = body.querySelector("#manager_slot");
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
        console.log("output: " + outputfile);
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