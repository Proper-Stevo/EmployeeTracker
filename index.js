const mysql = require('mysql2');
const { prompt } = require('inquirer');
const tableConsole = require('console.table');
const db = mysql.createConnection({host: 'localhost', user:'root', password:'password789', database: 'employee_db' }).promise();
const departmentChoices = async () => {
    const departmentQuery = `SELECT id AS value, name FROM department;`;
    const departments =  await db.query(departmentQuery)
    return departments[0]
}

const start = async () => {
    const temp = await departmentChoices()
    console.log(temp)
}
// const roleChoices = async () => {
//     const roleQuery = `SELECT * FROM role;`;
//     const roles =  await db.query(roleQuery)
//     return roles[0]
// }

// const start2 = async () => {
//     const tempRoles = await roleChoices()
//     console.log(tempRoles)
// }


const addRole = async () => {
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
            choices: await departmentChoices(),
        }
    ]).then((newRole) =>
        { const params = [newRole.title, newRole.salary, newRole.name]
        db.query('INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)', params).then(init) }
    );
}


const init = async () => {
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
            db.query('SELECT * FROM employee')
                .then((data) => {
                    console.table(data[0]);
                    init();
                });
        }

        if (enter == 'View All Roles') {
            db.query('SELECT * FROM role')
                .then((data) => {
                    console.log(data[0]);
                    init();
                });
        }

        if (enter == 'View All Departments') {
            db.query('SELECT * FROM department')
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
                db.query('INSERT INTO employee(first_name, last_name) VALUES (? , ?)', params).then(init) }
            );
        }
    // });

if (enter == 'Add Role') {
   addRole();
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
        db.query('INSERT INTO department(name) VALUE (?)', newDepartment.name).then(init)
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
        db.query('UPDATE employee SET role_id WHERE id = ?', params).then(init) }
    );
}
})
}
init();