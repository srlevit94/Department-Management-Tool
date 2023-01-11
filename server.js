// packages needed for this application
const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2');


const PORT = process.env.PORT || 3005;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'jQ294*c1Ey4Y',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

// Default response for any other request (Not Found)
// ref 11-INs
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
  }
  ])
  .then((response) => {
    switch (response.main) {
      case 'Add employee':
        addEmployee();
        break;

      case 'Update Employee Role':
        updateEmployeeRole();
        break;
            
      case 'View All Roles':
        console.log('now showing roles');
        viewAllRoles();
        break;

      case 'Add Role':
        addRole();
        break;

      case 'View all Departments':
        viewAllDepartments();
        break;

      case 'Add Department':
        addDepartment();
        break;

      case 'View All Employees':
        viewAllEmployees();
        break;
            
      case 'Quit':
      default: db.end();
    }
  })
}

// If View All Depts
// show table with department names and department ids

const viewAllDepartments = () => {
  db.query('SELECT * FROM departments', function (err, results) {
    console.table(results);
    mainMenu();
  });
  
}

// If View All roles
// show table with job title, role id, the department that role belongs to, and the salary for that role
const viewAllRoles = async () => {
  db.query('SELECT * FROM roles', function (err, results) {
    console.table(results);
    mainMenu();
  });
  
}

// If View All Employees
// show table with employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

const viewAllEmployees = () => {
    db.query('SELECT * FROM employees', function (err, results) {
      console.table(results);
      mainMenu();
    });
    
}

// If Add Emmployee 
// // Add Employee, log message to console

const addEmployee = async () => {
  return inquirer.prompt([
      {
          type: "input",
          message: "Please enter new employee's first name",
          name: "first_name"
          // when: (data) => data.role !== "None, build my page!"
      },
      {
          type: "input",
          message: "Please enter new employee's last name",
          name: "last_name"
          // when: (data) => data.role !== "None, build my page!"
      },
      {
        type: "input",
        message: "Please enter new employee's role ID",
        name: "role_id"
        // when: (data) => data.role !== "None, build my page!"
      },
      {
          type: "input",
          message: "Please enter new employee's manager ID",
          name: "manager_id"
          // when: (data) => data.role !== "None, build my page!"
      }
  ])
  .then((response) => {

    let query = "INSERT INTO employees SET ?";

    db.query(query, {
      first_name: response.first_name,
      last_name: response.last_name,
      role_id: parseInt(response.role_id),
      manager_id: parseInt(response.manager_id)

    }, function (err, results) {
      if (err) throw err;
      console.table(results);

      mainMenu();
    })
  })


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


mainMenu();