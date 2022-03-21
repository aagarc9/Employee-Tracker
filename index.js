// installed programs
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
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
            "Add Departments",
            "Add Employees",
            "Add Roles",
            "Update Employees",
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
            case "Update Employees":
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
//Add Department
function addDepartments() {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "Enter the name of the new department",
      })
      .then(function (res) {
        const addingDepartment = res.department;
        const query = `INSERT INTO department (name) VALUES ("${addingDepartment}")`;
        connection.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          generateList();
        });
    });
}
// new employees to existing database
function addEmployees() {
    inquirer.prompt([
        { 
            type: "input",
            name: "firstName",
            message: "Enter the employee's first name"
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter the employee's last name"
        },
        {
            type: "input",
            name: "employeeRole",
            message: "Enter the employee's role ID"
        },
        {
            type: "input",
            name: "employeeManager",
            message: "Enter the employee's manager ID"
        }
    ])
    .then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const employeeRoleID = res.employeeRole;
        const employeeManagerID = res.employeeManager;
        const query = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employeeRoleID}", "${employeeManagerID}")`;
        connection.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          generateList();
        });
    });
}
//Add Employee Role
function addRoles() {
    inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the employee's title",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the employee's salary",
        },
        {
          type: "input",
          name: "roleDepartment",
          message: "Enter the employee's department ID", 
        }
    ])
    .then(function (res) {
        const title = res.title;
        const salary = res.salary;
        const departmentID = res.roleDepartment;
        const query = `INSERT INTO roles (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
        connection.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          generateList();
        });
    });
}
//Update Employee
function updateEmployees() {
    inquirer.prompt([
        {
          type: "input",
          name: "updateEmployee",
          message: "Enter the employee's ID you want to be updated",
        },
        {
          type: "input",
          name: "newRole",
          message: "Enter the role ID for that employee",
        }
    ])
    .then(function (res) {
        const updateEmployee = res.updateEmployee;
        const newRole = res.newRole;
        const queryUpdate = `UPDATE employee SET roles_id = "${newRole}" WHERE id = "${updateEmployee}"`;
        connection.query(queryUpdate, function (err, res) {
            if (err) {
              throw err;
            }
            console.table(res);
            generateList();
        })
    });
}