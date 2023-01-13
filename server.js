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
      user: 'root',
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

// Main Menu questions.
const mainMenu = async () => {
  return inquirer.prompt ([
  {   type: 'list',
      message: "What would you like to do?",
      name: 'main',
      default:  'Sample title',
      choices: [
          'View all Departments',
          'View All Roles',
          'View All Employees',
          'Add Department',
          'Add Role',
          'Add Employee',
          'Update Employee Role',
          'Quit'
      ]
  }
  ])

  // start functions depending on menu selection
  .then((response) => {
    switch (response.main) {
      case 'View all Departments':
        viewAllDepartments();
        break;

      case 'View All Roles':
        viewAllRoles();
        break;

      case 'View All Employees':
        viewAllEmployees();
        break;
      
      case 'Add Department':
      addDepartment();
      break;

      case 'Add Role':
        addRole();
        break;

      case 'Add employee':
        addEmployee();
        break;

      case 'Update Employee Role':
        updateEmployeeRole();
        break;
               
      case 'Quit':
      default: db.end();
    }
  })
}

// View All Depts: shows table with department names and department ids
const viewAllDepartments = () => {
  db.query('SELECT names FROM departments', function (err, results) {
    console.log("Departments:");
    console.table(results);
    mainMenu();
  });
  
}

// View All roles: show tables with...
// job title, role id, its department , and its salary
const viewAllRoles = async () => {
  db.query('SELECT roles.id, roles.title, roles.salary, departments.names AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id ', function (err, results) {
    console.log("Roles:");
    console.table(results);
    mainMenu();
  });
  
}

// iew All Employees: show table with...
// employee ids, first names, last names, job titles, departments, salaries, and their managers
// CONCAT(employees.first_name," ",employees.last_name) AS manager
const viewAllEmployees = () => {
    let concatManager = "CONCAT(manager.first_name, ' ', manager.last_name) AS manager";
    let joinManager = 'LEFT JOIN employees As manager ON manager.id = employees.manager_id';

    db.query(`
    SELECT DISTINCT employees.id, employees.first_name, employees.last_name, roles.title, departments.names AS department, roles.salary AS salary, 
    ${concatManager}
    
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id
    ${joinManager};
    

    `, function (err, results) {
      console.log("Employees:");
      console.table(results);
      mainMenu();
    });
}

// Add Employee Function
const addEmployee = async () => {
  return inquirer.prompt([
      {
          type: "input",
          message: "Please enter new employee's first name",
          name: "first_name"
      },
      {
          type: "input",
          message: "Please enter new employee's last name",
          name: "last_name"
      },
      {
        type: "input",
        message: "Please enter new employee's role ID",
        name: "role_id"
      },
      {
          type: "input",
          message: "Please enter new employee's manager ID",
          name: "manager_id"
      }
  ])
  // populates responses into table
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

// Add Deptartment function
const addDepartment = async () => {

  return inquirer.prompt([
      {
          type: "input",
          message: "What is the new department's name",
          name: "dept_name"
          // when: (data) => data.role !== "None, build my page!"
      }
  ])

  .then((response) => {
  // populates responses into table
    let query = "INSERT INTO departments SET ?";

    db.query(query, {
      names: response.dept_name,

    }, function (err, results) {
      if (err) throw err;
      console.table(results);

      mainMenu();
    })
  })
}

// Add Role function
const addRole = async () => {

  return inquirer.prompt([
      {
          type: "input",
          message: "Please enter the new role's name",
          name: "role_name"
      },
      {
          type: "input", //choice?
          message: "What is the salary of the new role?",
          name: "role_salary",
          // TODO: Validate Integer value
      },
      {
          type: "input", // choice?
          message: "Which department does the role belong to?",
          name: "role_dept"
      }
  ])
  .then((response) => {
    // populate into roles table
    let query = "INSERT INTO roles SET ?";

    db.query(query, {
      title: response.role_name,
      salary: response.role_salary,
      department_id: response.role_dept

    }, function (err, results) {
      if (err) throw err;
      console.table(results);

      mainMenu();
    })
  })
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
      },
      {
          type: "input", //choice?
          message: "Please select a new role for the employee.",
          name: "new-role",
          // Validate Integer value
      }
  ])
}

// initiates application
mainMenu();