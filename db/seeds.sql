INSERT INTO department(name)
VALUES ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 4),
        ('Engineer', 12500, 1),
        ('Software Engineer', 120000, 1),
        ('Lawyer', 200000, 3),
        ('Accountant', 80000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jane', 'Doe', 1, null),
        ('Mad', 'Max', 2, 1),
        ('Stevo', 'Barrios', 3, null),
        ('Jose', 'Jose', 4, 3);
