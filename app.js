const inquirer = require("inquirer");

const questions = [
    {   type: 'list',
        message: "What would you like to do?",
        name: 'main',
        default:  'Sample title',
        choices: [
            'Add employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View all Departments',
            'Add Department',
            'View All Employees',
            'Quit'
        ]
    },
]

// If View All Depts
// show table with department names and department ids

// If View All roles
// show table with job title, role id, the department that role belongs to, and the salary for that role

// If View All Employees
// show table with employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// If Add Emmployee 
// // Add Employee, log message to console

// If Add Deptartment
// // What is the department name?
// // Add Department, log message to console

// If Add Role
// // What is the name of the role?
// // What is the salary of the role?
// //  Which dept does the role belong to?
// // Add role, log message to console

// If ADD Employee
// // What is the employee's firs name?
// // What is the employee's last name?
// what is the employee's role?
// // If appllicable, who es the employee's manager?

// If Update Employee Role
// // show table, select employee, update their role



