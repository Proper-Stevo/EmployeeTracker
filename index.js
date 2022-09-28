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

    if (enter == 'Add Role') {
        prompt ([
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
                type: 'choices',
                name: 'department_id',
                message: 'what is the department?',
                choices: [
                    'Engineering',
                    'Finance', 
                    'Legal',
                    'Sales'
                ]
            }
        ]).then((newRole) =>
        db.promise().query('INSERT INTO role SET ?', newRole).then(init)
        );

    }
    if (enter == 'Add Department') {
        prompt ([
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
        db.promise().query('INSERT INTO department SET ?', newDepartment).then(init))
    };

    if (enter == 'Update Employee Role') {
        prompt ([
            {
                type: 'choices',
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
                type: 'choices',
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
        db.promse().query('UPDATE employee SET role', updateRole).then(init)
        );
    }
}