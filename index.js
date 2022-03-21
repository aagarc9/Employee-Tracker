// installed programs
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require('dotenv').config();

// connection to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'tracker_db'
    },
    console.log("Sucessfully connected to the Tracker Database")
);

connection.connect(function (err) {
    if (err) throw err;
    generateList();
});

// application questions
function generateList() {
    inquirer.prompt({
        type:"list",
        name: "Main",
        message: "What option from the menu would like to update?",
        choices: [
            "View all Employees",
            "View all Departments",
            "View all Roles",
            "Add Department",
            "Add Employee",
            "Add Role",
            "Update Employee",
            "Quit"
        ]
    })
    .then(function (answer) {
        switch (answer.Main) {
            case "View all Employees":
                viewEmployees();
                break;
            case "View all Departments":
                viewDepartments();
                break;
            case "View all Roles":
                viewRoles();
                break;
            case "Add Departments":
                addDepartments();
                break;
            case "Add Employees":
                addEmployees();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "Update Employee":
                updateEmployees();
                break;
            case "Quit":
                connection.end();
                break;
        }
    });
}

// view employee key info
function viewEmployees() {
let query1 = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id"
connection.query(query1, function (err, res) {
    console.table(res);
    generateList();
});

}
// departments
function viewDepartments() {
let query2 = "SELECT * FROM department"
connection.query(query2, function (err, res) {
      console.table(res);
      generateList();
    });
}
// key roles
function viewRoles() {
let query3 = "SELECT * FROM roles"
connection.query(query3, function (err, res) {
    console.table(res);
    generateList();
    });
}