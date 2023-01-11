const inquirer = require("inquirer");

const mainMenu = async () => {
    return inquirer.prompt ([
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
    }])
    .then(response => {
        switch (response.mainMenu) {
            case 'Add employee':
                addEmployee();
                break;

            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            
            case 'View All Roles':
                viewAllRoles();
                break;

            case 'Add Role':
                addRole();
                break;

            case 'View all Departments':
                viewAllDepts();
                break;

            case 'Add Department':
                addDept();
                break;

            case 'View All Employees':
                viewAllEmployees();
                break;
            
            case 'Quit':
                quitApp();
                break;
        }

    })
}

// If View All Depts
// show table with department names and department ids

// If View All roles
// show table with job title, role id, the department that role belongs to, and the salary for that role

// If View All Employees
// show table with employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// If Add Emmployee 
// // Add Employee, log message to console

const addEmployee = async () => {

    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter employee's first name",
            name: "first-name"
            // when: (data) => data.role !== "None, build my page!"
        },
        {
            type: "input",
            message: "Please enter employee's last name",
            name: "first-name"
            // when: (data) => data.role !== "None, build my page!"
        },
        {
            type: "input",
            message: "Please enter employee's manager",
            name: "manager"
            // when: (data) => data.role !== "None, build my page!"
        },
    ])
}

// If Add Deptartment
// // What is the department name?
// // Add Department, log message to console
const addDepartment = async () => {

    return inquirer.prompt([
        {
            type: "input",
            message: "What is the new department's name",
            name: "dept-name"
            // when: (data) => data.role !== "None, build my page!"
        }
    ])
}

// If Add Role
// // What is the name of the role?
// // What is the salary of the role?
// //  Which dept does the role belong to?
// // Add role, log message to console

const addRole = async () => {

    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter the new role's name",
            name: "role-name"
            // when: (data) => data.role !== "None, build my page!"
        },
        {
            type: "input", //choice?
            message: "What is the salary of the new role?",
            name: "role-salary",
            // Validate Integer value
            // when: (data) => data.role !== "None, build my page!"
        },
        {
            type: "input", // choice?
            message: "Which department does the role belong to?",
            name: "role-dept"
            // when: (data) => data.role !== "None, build my page!"
        }
    ])
}

// If Update Employee Role
// // show table, select employee, update their role

const updateEmployeeRole = async () => {

    // show roster table of employees

    return inquirer.prompt([
        {
            type: "input", // choice ?
            message: "Please select an employee whose role you wish to change.",
            name: "employee-to-update"
            // when: (data) => data.role !== "None, build my page!"
        },
        {
            type: "input", //choice?
            message: "Please select a new role for the employee.",
            name: "new-role",
            // Validate Integer value
            // when: (data) => data.role !== "None, build my page!"
        }
    ])
}






