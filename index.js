const mysql = require('mysql2');
const inquirer = require('inquirer');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password789',
        database: 'employee_db'
    },
    console.log('Employee Database is a GO..')
);

//inquirer is going to navigate you 
const navigationArray = [ {
    type: "list",
    message: "what would you like to do?",
    choices: ["View ALL Employees", "Add Employee", "View All Roles", "View All Departments", "Add Role", "Add Departments", "Update Employee Role", "Quit"],
}]

// create array for other options such as: add empployee / add dempartment / add/update role

// if allemployees ==== true 
//select AllEmployees()

// const db = show you what you want (all employees, all engineers, all managers etc etc)
 function AllEmployees() { 
    const sql = 'SELECT * from employee;';
db.query(sql, (err, results) => {
    if (err) {
        console.log(err);
    } return console.log(results)
})}

AllEmployees();