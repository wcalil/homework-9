const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
let data = [];
var HTML = "";
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What's the first and last name of the manager of the team?"
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
            <h4>${ans.managerName}</h4>
            <h4>${ans.managerJobTitle}</h4>
        </div>
        <div class="cardBody">
            <p class="line">${ans.managerId}</p>
            <p class="line">${ans.managerEmail}</p>
            <p class="line">${ans.officeNumber}</p>
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
                name: "engineerEmail",
                message: "What's his email?"
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
        const htmlEngineer = `<div class="col-md-4 engineer">
        <div class="cardHeader">
            <h4>${ans.engineerName}</h4>
            <h4>${ans.engineerJobTitle}</h4>
        </div>
        <div class="cardBody">
            <p class="line">${ans.engineerId}</p>
            <p class="line">${ans.engineerEmail}</p>
            <p class="line">${ans.githubUsername}</p>
        </div>
    </div>`

        data.push(htmlEngineer)
        menuChoice(ans)

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
                <h4>${ans.internName}</h4>
                <h4>${ans.internJobTitle}</h4>
            </div>
            <div class="cardBody">
                <p class="line">${ans.internId}</p>
                <p class="line">${ans.internEmail}</p>
                <p class="line">${ans.school}</p>
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

console.log(data)

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
            height: 40px;
            border-bottom: solid;
            border-color: gray;
            padding: 0;
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

