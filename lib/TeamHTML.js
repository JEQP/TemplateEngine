function generateHTML(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    
        <title></title>
        <style>
            h1 {
                text-align: center;
                background-color: black;
                color: white;
                padding: 10px;
            }
    
            footer {
                background-color: black;
                color: white;
                padding: 20px;
                text-align: center;
            }
    
            body {
                background-color: black;
                text-align: center;
                align-content: center;
            }
    
            .main_content {
                width: 100%;
                border: 5%;
                border-color: black;
                background-color: honeydew;
                align-content: center;
                text-align: center;
    
            }
    
            .manager_box {
                background: transparent;
                font-size: medium;
                text-align: center;
                background-color: #fa0ab2;
                border: none;
                color: #000000;
                padding-left: 1px;
                padding: 10px;
                padding-top: 10px;
                width: 80%;
                margin-top: -18px;
                border-bottom-left-radius: 10%;
                border-bottom-right-radius: 10%;
                margin: auto;
    
            }
    
            .manager_col {
                justify-content: space-evenly;
                display: flex;
                flex-direction: column;
                width: 31%;
                padding: 10px;
                background-color: indianred;
                float: left;
                height: 800px;
    
            }
    
            .engineer_col {
                justify-content: space-evenly;
                display: flex;
                flex-direction: column;
                width: 31%;
                padding: 10px;
                background-color: blueviolet;
                float: left;
                height: 800px;
            }
    
            .intern_col {
                justify-content: space-evenly;
                display: flex;
                flex-direction: column;
                width: 31%;
                padding: 10px;
                background-color: greenyellow;
                float: left;
                height: 800px;
    
            }
    
            .engineer_box {
                background-color: cornflowerblue;
                padding: 1px;
                width: 80%;
                text-align: center;
                border-top-left-radius: 10%;
                border-top-right-radius: 10%;
                margin: auto;
            }
    
            .intern_box {
                background-color: blue;
                padding: 1px;
                padding-bottom: 5%;
                width: 80%;
                text-align: center;
                border-bottom-left-radius: 10%;
                border-bottom-right-radius: 10%;
                margin: auto;
            }
        </style>
        <header>
            <h1> TEAM NAME </h1>
        </header>
    </head>
    
    <body>
    
        <div class="main_content">
            <div class="manager_col">
    
                <div id="manager_slot">
    
                </div>
            </div>
    
            <div class="engineer_col">
                <div id="engineer_slot">
                </div>
    
            </div>
    
            <div class="intern_col">
                <div id="intern_slot">
    
                </div>
    
    
            </div>
    
    
        </div>
    
        <script>
    
        </script>
    
        <footer>
            And thus ends the document
        </footer>
    </body>
    
    </html>`
}
function insertTitle(manager) {
    return `${manager[0].name1}'s Handpicked Team`
}

function insertManager(manager) {
    return `    <div class="manager_box">
    <div class="container">
        <div class="name_title">
            <h2>${manager[0].name1}</h2>
            <h3>Manager</h3>
        </div>
        ID: ${manager[0].id1}<br>
        E-mail: ${manager[0].email1}<br>
        Office Number: ${manager[0].officeNumber} <br>
    </div class="container">
</div>`
}

function insertEngineer(engineer) {
    return ` <div class="engineer_box">
    <h2>${engineer.name1}</h2>
    <h3>Engineer</h3>
    ID: ${engineer.id1}<br>
    E-mail: ${engineer.email1} <br>
    Github: ${engineer.GitHubUser}
</div>`
}

function insertIntern(intern) {
    return `<div class = "intern_box">
    <h3>
    ${intern.name1}
    </h3>
    <h4>
        Intern
    </h4>
    ID: ${intern.id1}<br>
    E-mail: ${intern.email1}<br>
    School: ${intern.school}<br>
</div>`
}

module.exports = {
  page: generateHTML,
  title: insertTitle,
  manager: insertManager,
  engineer: insertEngineer,
  intern: insertIntern
}