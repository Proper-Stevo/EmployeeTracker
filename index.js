const mysql = require('mysql2');
const { prompt } = require('inquirer');
const tableConsole = require('console.table');
const db = mysql.createConnection({host: 'localhost', user:'root', password:'password789', database: 'employee_db' });

const init = () => {
    prompt([
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
            ],
        },
    ]).then(({ enter }) => {
        if (enter == "View ALL Employees") {
            db.promise()
                .query('SELECT * FROM employee')
                .then((data) => {
                    console.table(data[0]);
                    init();
                });
        }

        if (enter == 'View All Roles') {
            db.promise()
                .query('SELECT * FROM role')
                .then((data) => {
                    console.log(data[0]);
                    init();
                });
        }

        if (enter == 'View All Departments') {
            db.promise()
                .query('SELECT * FROM department')
                .then((data) => {
                    console.table(data[0]);
                    init();
                });
        }

        if (enter == 'Add Employee') {
            prompt([
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
               { const params = [newEmployee.first_name, newEmployee.last_name]
                db.promise().query('INSERT INTO employee(first_name, last_name) VALUES (? , ?)', params).then(init) }
            );
        }
    // });

if (enter == 'Add Role') {
    prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role are you creating?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'what is the salary?'
        },

        {
            type: 'list',
            name: 'name',
            message: 'what is the department?',
            choices: [
                'Engineering',
                'Finance',
                'Legal',
                'Sales',
            ]
        }
    ]).then((newRole) =>
        { const params = [newRole.title, newRole.salary, newRole.department_id]
        db.promise().query('INSERT INTO role(title, salary, department_id) VALUES (?, ?, 5)', params).then(init) }
    );

}
if (enter == 'Add Departments') {
    prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What department are you creating?'
        },
        {
            type: 'input',
            name: 'name',
            message: 'what is the department name?'
        },
    ]).then((newDepartment) =>
        db.promise().query('INSERT INTO department(name) VALUE (+1)', newDepartment).then(init)
        );
};

if (enter == 'Update Employee Role') {
    prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'which employee would you like to update?',
            choices: [
                'Jane',
                'Mad',
                'Stevo',
                'Jose',
            ]
        },
        {
            type: 'list',
            name: 'title',
            message: 'What role would you like to update them to?',
            choices: [
                'Sales Lead',
                'Engineer',
                'Software Engineer',
                'Lawyer',
                'Accountant'
            ]
        }
    ]).then((updateRole) =>
        { const params = [updateRole.role_id]
        db.promise().query('UPDATE employee(role_id) VALUES (5)', params).then(init) }
    );
}
})
}
init();