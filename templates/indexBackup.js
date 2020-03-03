const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        //Manager
        {
            type: "input",
            name: "managerName",
            message: "What's the first and last name of the manager of the team?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What's his ID?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What's his email?"
        },
        {
            type: "input",
            name: "managerJobTitle",
            message: "What's his exact job title?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What's his Office Number?"
        },
        //Engineer
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
        //Intern
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
    ]);
}

function generateHTML(answers) {
    return`<!DOCTYPE html>
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
                <div class="col-md-4 manager">
                    <div class="cardHeader">
                        <h4>${answers.managerName}</h4>
                        <h4>${answers.managerJobTitle}</h4>
                    </div>
                    <div class="cardBody">
                        <p class="line">${answers.managerId}</p>
                        <p class="line">${answers.managerEmail}</p>
                        <p class="line">${answers.officeNumber}</p>
                    </div>
                </div>
                <div class="col-md-4 engineer">
                    <div class="cardHeader">
                        <h4>${answers.engineerName}</h4>
                        <h4>${answers.engineerJobTitle}</h4>
                    </div>
                    <div class="cardBody">
                        <p class="line">${answers.engineerId}</p>
                        <p class="line">${answers.engineerEmail}</p>
                        <p class="line">${answers.githubUsername}</p>
                    </div>
                </div>
                <div class="col-md-4 intern">
                    <div class="cardHeader">
                        <h4>${answers.internName}</h4>
                        <h4>${answers.internJobTitle}</h4>
                    </div>
                    <div class="cardBody">
                        <p class="line">${answers.engineerId}</p>
                        <p class="line">${answers.internEmail}</p>
                        <p class="line">${answers.school}</p>
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
}

promptUser()
    .then(function (answers) {
        const html = generateHTML(answers);
        return writeFileAsync("indexTest.html", html);
    })
    .then(function () {
        console.log("Successfully wrote to indexTest.html");
    })
    .catch(function (err) {
        console.log(err);
    });