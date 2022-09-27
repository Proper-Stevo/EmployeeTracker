const mysql = require('mysql2');
const { prompt } = require('inquirer');
const tableConsole = require('console.table')

const init = () => {
    promp([
        {
            type: 'list',
            name: 'enter',
            message: 'What would you like to do?',
            choices: [
                "View ALL Employees",
                "Add Employee",
                "View All Roles",
                "View All Departments",
                "Add Role",
                "Add Departments",
                "Update Employee Role",
                "Quit",
            ],
        },
    ]).then(({ enter }) => {
        if (enter == "View ALL Emoployees") {
            db.promise()
            .query('SELECT * FROM department')
            .then((data) => {
                console.table(data[0]);
                init();
            });
        }

    if (enter == 'Add Employee') {
        prompt ([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is this persons first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is this persons last name?'
            },
        ]).then((newEmployee) =>
        db.promise().query('INSERT INTO department SET ?', newEmployee).then(init)
        );
    }
    });

    if (enter == 'View All Roles') {
        db.promise()
        .query('SELECT * FROM role')
        .then((data) => {
            console.log(data[0]);
            init();
        })
    }
}




















// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'password789',
//         database: 'employee_db'
//     },
//     console.log('Employee Database is a GO..')
// );

//inquirer is going to navigate you 
// const navigationArray = [ {
//     type: "list",
//     message: "what would you like to do?",
//     choices: ["View ALL Employees", "Add Employee", "View All Roles", "View All Departments", "Add Role", "Add Departments", "Update Employee Role", "Quit"],
// }]

// // create array for other options such as: add empployee / add dempartment / add/update role
// const updateArray = [ {
//     type: "list",
//     message: "",
//     choices: "",
// }]

// // if allemployees ==== true 
// //select AllEmployees()

// // const db = show you what you want (all employees, all engineers, all managers etc etc)
//  function AllEmployees() { 
//     const sql = 'SELECT * from employee;';
// db.query(sql, (err, results) => {
//     if (err) {
//         console.log(err);
//     } return console.log(results)
// })}

// AllEmployees();