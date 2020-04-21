const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeArray= []



function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is your role in the company?",
            choices: ["Engineer", "Intern", "Manager"]
        }
    ]).then(function(res){
        console.log(res)
        switch(res.role) {
            case "Engineer":
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is your name?",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What is your company id?",
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is your email address?",
                    },
                    {
                        type: "input",
                        name: "github",
                        message: "What is your github user name?",
                    }
                ]).then(function(item){
                    const nextEngineer = new Engineer(item.name,item.id,item.email,item.github)
                    employeeArray.push(nextEngineer)
                    addEmployee()
                    
                })

            case "Intern":
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is your name?",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What is your company id?",
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is your email address?",
                    },
                    {
                        type: "input",
                        name: "school",
                        message: "What school do you go to?",
                    }
                ]).then(function(item){
                    const nextIntern = new Intern(item.name,item.id,item.email,item.school)
                    employeeArray.push(nextIntern) 
                    addEmployee()
                })
            case "Manager":
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is your name?",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What is your company id?",
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is your email address?",
                    },
                    {
                        type: "input",
                        name: "officeNumber",
                        message: "What is your office number?",
                    }
                ]).then(function(item){
                    const nextManager = new Manager(item.name,item.id,item.email,item.officeNumber)
                    employeeArray.push(nextManager) 
                    addEmployee()
                    
                })            
        }
    })
    .catch(function(err){
        console.log(err)
    })
  }


function addEmployee(){
    inquirer.prompt([
        {
            name: "status",
            message: "Do you want to enter another person in to the tracker?",
            type: "confirm"
        }
    ]).then(function(res){
        res.status ? promptUser() : fs.writeFile('./output/team.html' , render(employeeArray), function(err){
            if (err) throw err
        })
    })
}

  promptUser()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
