const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inq = require("inquirer");

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


function addAnother() {
    inq.prompt([{
        type: "confirm",
        name: "repeat",
        message: "Would you like to add an employee?"
    }])
    // .catch().then(function (repeat) {
    //     if (repeat) {
    //         employeeType();
    //     }
    //     else {
    //         createHTML();
    //     }
    // })

}

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

function createHTML() {
    console.log("creating HTML");
}

// function createTeam() {
//     var questionArray = startQuestions.map(question => inq.prompt(question));
//     console.log(questionArray);
//     managerTeam.push(questionArray);
// }

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

function init() {
    createTeam();
    // testStartQuestions();
}

function testStartQuestions() {
    console.log("running testStartQuestions");

    // Attempt A

    //     inq.prompt(startQuestions).then(function(x){
    //        await Promise.all(x)
    // })
    // .then(result => console.log(result));


    //Attempt B - I've tried this without const AddAnotherPromise, to much the same effect

    var questionArray = startQuestions.map(question => inq.prompt(question));
    Promise.all(questionArray)
        .then(function (data) {
            console.log("data ln 208: " + data);

            const addAnotherPromise = addAnother();
            addAnotherPromise
                .then(function (data) {
                    if (data) {
                        console.log("answer: " + data);
                        console.log("qArray: " + questionArray);
                    }
                    else {
                        console.log("answer: " + data);
                        console.log("qArray: " + questionArray);
                    }
                })
        }).catch(console.log(error));


    // Attempt C

    // var questionArray = startQuestions.map(question => inq.prompt(startQuestions[question]));
    // Promise.all(questionArray)
    // .then(function(data){
    //     console.log("data ln 208: " + data);
    // })

    // var questionArray = await startQuestions.map(function(question) {
    //     console.log("question: " + question);
    //     inq.prompt(question);
    // });

    // console.log("questionArray: " + questionArray);
}

init();

// Prompt user to create an Engineering Team. Add Manager, input Manager Name
// function createTeam() {
//     inq.prompt(startQuestions, function (anwers) {
//         team.push(answers);
//         console.log("team 68: " + team);
//     }).catch()
//         // Ask if another team member is desired
//         .then(function () {
//             inq.prompt([{
//                 type: "confirm",
//                 name: "repeat",
//                 message: "Would you like to add an employee?"
//             }])


//         // WORK OUT HOW TO LINK REPEAT TO THE NEXT FUNCTION, THIS DOESN'T WORK
//         // this will loop through the options until repeat is negative
//         .then(function () {

//         //change while loop to a question calling the function it is in
//             while (repeat) {
//                 inq.prompt([{
//                     type: "list",
//                     name: "choice",
//                     message: "Please choose the type of employee to add:",
//                     choices: [
//                         "Engineer",
//                         "Intern"
//                     ]
//                 }])
//                 .then(function(data){


//                     var promises = [];

//                     if (data.choice === "Engineer") {
//                         promises.push(
//                         inq.prompt(engineerQuestions, function (answers) {
//                             team.push(answers);
//                             console.log("team 95: " + team);
//                         }))
//                     }
//                     else {
//                         promises.push(
//                         inq.prompt(internQuestions, function (answers) {
//                             team.push(answers);
//                             console.log("team 101: " + team);
//                         }))


//                     }

//                     promises.push(
//                         inq.prompt([{
//                             type: "confirm",
//                             name: "repeat",
//                             message: "Would you like to add an employee?"
//                         }]));

//                     Promise.all(promises)
//                         .then(function(response) {
//                             console.log("All responses ", response)
//                         })
//                 })

//             }

//         }).catch()
//         .then(function(){
//             console.log("team 114: " + team);
//             console.log("start create html");
//         })
//     }).catch()
// }

// function init(){
//     createTeam();
// }

// init();

// inq Manager ID

// inq Manager Email

// inq Manager officeNumber

// add to array

//// Loop starts here

// inq would you like to add an employee?

// if yes

// inq which employee would you like to add? MENU

//// if Engineer 

//// inq Engineer name

//// inq Engineer ID

//// inq Engineer Email

//// inq Engineer Github

//// else if Intern

//// inq Intern name

//// inq Intern ID

//// inq Intern email

//// inq Intern School

//// add response to array (possibly via a second const array)

//// Loop ends here

// if no move to creating HTML