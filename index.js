const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();

const connection = mysql.createConnection(
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log("Sucessfully connected to the Tracker Database")
);

connection.connect();