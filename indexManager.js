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
    
    ]);
}

function generateHTML(answers) {
    return `<div class="col-md-4 manager">
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
              `;
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
