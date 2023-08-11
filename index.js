const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
// Require the library to insert a logo to the terminal asciiart
const logo = require('asciiart-logo');
const config = require('./package.json');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connection to mysql database
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: '8|yO}oFga}E/',
    database: 'employees_db'
    },
    )

// Array that will be used in inquirer to trigger the list of options the user will be able to select.
const questions = [
    {
        type: 'list',
        message: 'Select the desired option:',
        name: 'userSelection',
        choices: [  'View All Employees',
                    'Add Employee',
                    'Update an Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit'
                ]
    }
];
// Code to print the Header with AsciiArt
const printLogo = () => console.log(logo(config).render());
printLogo();

// Fix functionality of this. This function adds a new employee to the employees_db
async function addEmployee() {
    //Inquirer gathers the data from the user for the new employee
    console.log('this will add a new employee');
    try {
        // Store a variable with the information from the database, to use later in inquirer as choices
        const [departments] = await db.promise().query('Select * from departments');
        const [roles] = await db.promise().query('SELECT * FROM roles');
        const [employees] = await db.promise().query('SELECT * FROM employees');
        // Confirm the data from db was pulled correctly
        console.log(departments);
        console.log(roles);
        console.log(employees);
        const answersAdd = await inquirer.prompt(
            [
                {
                    type: 'input',
                    message: "Enter the employee's first name:",
                    name: 'newEmployeeFN',
                },
                {
                    type: 'input',
                    message: "Enter the employee's last name:",
                    name: 'newEmployeeLN',
                },
                {
                    type: 'list',
                    message: "Select the role for the employee:",
                    name: 'newEmployeeRole',
                    choices: roles.map((role) => {
                        return { 
                            name: role.job_title, 
                            value: role.id
                        }
                    }),
                },
                {
                    type: 'list',
                    message: "Which department does the employee belong to?",
                    name: 'newEmployeeDepartment',
                    choices: departments.map((dp) => {
                        return { 
                            name: dp.department, 
                            value: dp.id
                        }
                    }),
                },
                {
                    type: 'input',
                    message: "Enter the employee's salary:",
                    name: 'newEmployeeSalary',
                },
                {
                    type: 'list',
                    message: "Choose the employee's manager:",
                    name: 'newEmployeeManager',
                    choices: employees.map((empl) => {
                        return{
                            name: empl.employee_firstName + " " + empl.employee_lastName,
                            value: empl.id
                        }
                    }),
                }
            ]
        );
        
        console.log(answersAdd);
        showQuestions();
        } catch (error) {
            console.log(error);
        }
        
}

function showEmployees() {
    return db.promise().query('SELECT * FROM employees JOIN roles ON employees.employee_roleID = roles.id JOIN departments ON roles.department_id = departments.id;')
}

function showDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
        showQuestions();
    });
    
}

function showRoles() {
    db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id;', function (err, results) {
        console.table(results);
        showQuestions();
    });
    
}
//TODO: Finish this functionality
function addRole() {
    console.log('This will add a new role to database');
        inquirer.prompt([
        {
            name: 'newRole',
            type: 'input',
            message: 'What role would you like to add?'
        },
        {
            name: 'newSalary',
            type: 'input',
            message: 'What is the salary for this role?'
        },
        {
            name: 'newDepartment',
            type: 'input',
            message: 'Which department will this role be in?'
        },
    ]).then((response)=>{
        console.log(response);
        //db.query('INSERT INTO roles ()')
        showQuestions();
    })
    
}
// TODO: FINISH THIS functionality
function updateEmployee() {
    console.log('Update Employee info');
    showQuestions();
}

function addDepartment() {
    console.log('this will add a new department to database');
    inquirer.prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What department would you like to add?'
        }
    ]).then((response)=>{
        db.query('INSERT INTO departments (department) VALUES (?);',[response.newDepartment], function(error, results){
            console.log('New Department added!');
        })
        showQuestions();
        }).catch((error)=>{console.log(error)});
}

function showQuestions() {

    inquirer.prompt(questions).then((response) => {
        const userSelection = response.userSelection;
// switch statement to use for every option from inquirer
        switch (userSelection) {

            case 'View All Employees':
                console.log('This will show all employees in organization');
                // we use .then as we made showEmployees asynchronous
                showEmployees().then(([rows,columns]) =>{
                    console.table(rows)
                    showQuestions();
                });
            break;

            case 'View All Roles':
                showRoles();
            break;

            case 'View All Departments':
                showDepartments();
            break;

            case 'Add Employee':
                addEmployee();
            break;

            case 'Add Role':
                addRole();
            break;

            case 'Add Department':
                addDepartment();
            break;

            case 'Update an Employee Role':
                updateEmployee();
            break;

            case 'Quit':
                console.log('Goodbye! see you soon!');
                process.exit()
                return;
        }
    }
    )
};
// This function triggers Inquirer so the user can select different options to use the app.
showQuestions();



