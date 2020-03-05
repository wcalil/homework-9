const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
let data = [];
var HTML = "";
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What's the manager's first and last name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What's the manager's ID?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What's the manager's email?"
        },
        {
            type: "input",
            name: "managerJobTitle",
            message: "What's the manager's exact job title?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What's the manager's Office Number?"
        },
    ]).then(function (ans) {
        const HTMLManager = `<div class="col-md-4 manager">
        <div class="cardHeader">
            <h4>Manager: ${ans.managerName}</h4>
            <h4>${ans.managerJobTitle}</h4>
        </div>
        <div class="cardBody">
            <p class="line">ID: ${ans.managerId}</p>
            <p class="line">Email: ${ans.managerEmail}</p>
            <p class="line">Office Number${ans.officeNumber}</p>
        </div>
    </div>`

        data.push(HTMLManager)
    })
}
function addEngineer() {
    return inquirer.prompt(
        [
            {
                type: "input",
                name: "engineerName",
                message: "Enter the name and last name of the engineer?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What's his ID?"
            },
            {
                type: "input",
                name: "engineerJobTitle",
                message: "What's his exact job title?"
            },
            {
                type: "input",
                name: "githubUsername",
                message: "Add his GitHub username"
            },
        ]

    ).then(function (ans) {
        var queryUrl = `https://api.github.com/users/${ans.githubUsername}`
        var engineerName = ans.engineerName
        var engineerJobTitle = ans.engineerJobTitle
        var engineerId = ans.engineerId
        axios.get(queryUrl).then(function (ans) {
            const htmlEngineer = `<div class="col-md-4 engineer">
        <div class="cardHeader">
            <h4>Engineer: ${engineerName}</h4>
            <h4>${engineerJobTitle}</h4>
        </div>
        <div class="cardBody">
            <p class="line">ID: ${engineerId}</p>
            <p class="line">Github URL: ${ans.data.url}</p>
            <p class="line">${ans.data.email}</p>
        </div>
    </div>`
            data.push(htmlEngineer)
            menuChoice(ans)
        })
    })
}

function addIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "Enter the name and last name of the intern?"
        },
        {
            type: "input",
            name: "internId",
            message: "What's his ID?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What's his email?"
        },
        {
            type: "input",
            name: "internJobTitle",
            message: "What's his exact job title?"
        },
        {
            type: "input",
            name: "school",
            message: "What school is he currently studing?"
        }
    ]).then(function (ans) {
        const htmlIntern = `<div class="col-md-4 intern">
            <div class="cardHeader">
                <h4>Intern: ${ans.internName}</h4>
                <h4>${ans.internJobTitle}</h4>
            </div>
            <div class="cardBody">
                <p class="line">ID: ${ans.internId}</p>
                <p class="line">Email: ${ans.internEmail}</p>
                <p class="line">School: ${ans.school}</p>
            </div>
            </div>`

        data.push(htmlIntern)
        menuChoice(ans)
    })
}
function menuChoice() {
    inquirer.prompt({
        type: 'list',
        message: 'What do you want to do?',
        choices: ['Add Engineer', "Add Intern", 'Generate Page'],
        name: 'choice'
    }).then(function (menA) {
        switch (menA.choice) {
            case 'Add Engineer':
                addEngineer()
                break;
            case 'Add Intern':
                addIntern()
                break;
            case 'Generate Page':
                generateHTML()
                break;
        }
    })
}
promptUser()
    .then(function (ans) {
        menuChoice(ans)
    })
    .then(function generateHTML() {
    })

function generateHTML(answers) {
    HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team HTML exmaple for the application</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
    <div class="row containerH1" style="padding-right:0px">
        <div class="col-md-12" style="padding-right:0px">
            <h1 style="padding-right:0px"> My Team </h1>
        </div>
    </div>
    <div class="row containerBody">
        <div class="col-md-12" style="padding-right:0px">
            <div class="row teamMembers">
               ${data.join("")}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>
       .containerH1 {
            height: 20vh;
            background-color: darkblue;
            color: white;
            vertical-align: middle;
        }
        h1 {
            text-align: center;
            margin-top: 6vh;
        }
        .teamMembers {
            margin-top: 5vh;
            margin-left: 20vw;
            margin-right: 20vw;
            display: flex;
            flex-wrap: wrap;
        }
        .cardHeader {
            margin-top: 20px;
            background-color: rgb(68, 68, 68);
            color: whitesmoke;
            text-align: center;
            border-style: solid;
            border-color: gray;
            border-radius:10px 10px 0px 0px;
        }
        .cardBody {
            padding-top: 5px;
            border-right-style: solid;
            border-left-style: solid;
            border-color: gray;
            border-radius:0px 0px 5px 5px;
        }
        .line {
            height: 60px;
            border-bottom: solid;
            border-color: gray;
            padding: 0;
            font-weight: bold;
        }
        p {
        margin: 0;
        }
    </style>
</body>
</html>`;

    fs.writeFile("index.html", HTML, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");

    });

}

