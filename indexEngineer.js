const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptNumber() {
    return inquirer.prompt([
            {
                type: "input",
                name: "numberOfEngineers",
                message: "How many enginners do you have in your team?"
            },
        ])
};

function promptUser(){
// for (i = 0; i < answersNumber.numberOfEngineers.length; i++) {
    return inquirer.prompt([
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
        ]);
       
// };
};


function generateHTML(answers) {
    return `<div class="col-md-4 engineer">
                    <div class="cardHeader">
                        <h4>${answers.engineerName}</h4>
                        <h4>${answers.engineerJobTitle}</h4>
                    </div>
                    <div class="cardBody">
                        <p class="line">${answers.engineerId}</p>
                        <p class="line">${answers.engineerEmail}</p>
                        <p class="line">${answers.githubUsername}</p>
                    </div>
                </div>`;
}

promptNumber()
    .then(promptUser())
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
