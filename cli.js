const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inq = require("inquirer");
const fs = require("fs");
const HTMLpage = require("./lib/TeamHTML");
const hparse = require("node-html-parser");



// set a const empty array
const managerTeam = [];
const engineerTeam = [];
const internTeam = [];

// The first prompt to come up, assumes Manager entered first
const startQuestions = [{
    type: "input",
    name: "name1",
    message: "Create your engineering team. What is the Team Manager's name?"
}, {
    type: "number",
    name: "id1",
    message: "What is this manager's ID?"
}, {
    type: "input",
    name: "email1",
    message: "What is this manager's e-mail address?"
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


function employeeType() {
    inq.prompt([{
        type: "list",
        name: "choice",
        message: "Please choose the type of employee to add:",
        choices: [
            "Engineer",
            "Intern",
            "No more to add"
        ]
    }]).then(function (response) {
        console.log("choice: " + response.choice);
        if (response.choice === "Engineer") {
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


function askEngineerQs() {
    inq.prompt(engineerQuestions)
        .then(function (data) {
            console.log("engineer data: " + JSON.stringify(data));
            engineerTeam.push(data);
            console.log("Engineer Team: " + JSON.stringify(engineerTeam));
            employeeType();
        })
}

function askInternQs() {
    inq.prompt(internQuestions)
        .then(function (data) {
            console.log("intern data: " + JSON.stringify(data));
            internTeam.push(data);
            console.log("intern team: " + JSON.stringify(internTeam));
            employeeType();
        })

}



function createTeam() {
    inq
        .prompt(startQuestions)
        .then(function (data) {
            console.log("197 createTeam: " + data);
            managerTeam.push(data);
            console.log("manager team: " + JSON.stringify(managerTeam));
            employeeType();
        });
}

function createHTML() {
    console.log("creating HTML");
    
    fs.readFile('./lib/main.html', 'utf8', (err,html) =>{
        if(err) {
            throw err;
        }
        // console.log("html: " + html);        // const root = parse(html);
        var testbody = html.toString();
        console.log("testbody: " + testbody);
        
        const body = hparse.parse(testbody, {style: true});
        console.log("body: " + body);
        const loc = body.querySelector("#manager_slot");
        console.log("loc: " + loc);
        console.log("loc to string: " + loc.toString());
        loc.appendChild(HTMLpage.manager(managerTeam));

        // var insert = hparse.parse(HTMLpage.manager(managerTeam));
        // console.log("insert: " + insert.toString());
        // var body = hparse.parse(html);
        // console.log("body init: " + body);
        // var loc = body.querySelector("#manager_slot");
        // console.log("body query: " + body);
        
        // console.log("body append: " + body);
        fs.writeFile("./teampage.html", body, function (err) {
            if (err) {
                return console.log(err);
            }
        });

        
    });
}

//create html template

// create new manager, append manager

// loop through engineer array, create new engineers, append them

// loop through intern array, append them

// save document





function init() {
    createTeam();
}



init();