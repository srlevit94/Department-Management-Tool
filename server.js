// packages needed for this application
const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2');

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

      case 'Add Employee':
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
  db.query('SELECT * FROM departments', function (err, results) {
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

// View All Employees: show table with...
// employee ids, first names, last names, job titles, departments, salaries, and their managers
const viewAllEmployees = () => {
    db.query(`
    SELECT DISTINCT employees.id, employees.first_name, employees.last_name, roles.title, departments.names AS department, roles.salary AS salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees As manager ON manager.id = employees.manager_id;

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
          message: "Please enter the ID of the new employee's manager",
          name: "manager_id"
      }
  ])
  // populates responses into table
  .then((response) => {

    db.query("INSERT INTO employees SET ?", {
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

// Add Department function
const addDepartment = async () => {

  return inquirer.prompt([
      {
          type: "input",
          message: "What is the new department's name",
          name: "dept_name"
      }
  ])

  .then((response) => {
  // populates responses into table
    db.query("INSERT INTO departments SET ?", {
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
          message: "What is department ID for the new role? (1s or 10s)",
          name: "role_dept"
      }
  ])
  .then((response) => {
    // populate into roles table
    db.query("INSERT INTO roles SET ?", {
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

  // Automatically shows all employees to select form
  db.promise().query(`
    SELECT DISTINCT employees.id, CONCAT(employees.first_name, " ", employees.last_name) AS employee, employees.role_id, roles.title, departments.names AS department, roles.salary AS salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees As manager ON manager.id = employees.manager_id
    `)
    
  .then( ([results]) => {
    console.table(results);
  })
  // Automatically shows all existing roles
  db.promise().query('SELECT * FROM roles')
    .then ( ([results2]) => {
      console.table(results2);
    })
  
  .then ( () => {
    return inquirer.prompt ([
    {
        type: "input",
        message: "Please input the ID of the employee whose role you wish to change. (1000s)",
        name: "employee_to_update"
    },
    {
      type: "input",
      message: "Please input the role ID of the employee's new role. (100s)",
      name: "new_role",
      // Validate Integer value
    },
    {
        type: "input",
        message: "Please input the ID the manager for the employee's new role.(1000s)",
        name: "emp_new_manager",
        // Validate Integer value
    }
    ])})

  .then((response) => {
    
    // updates new valies and populate into roles and employees table
    db.query(`
      UPDATE employees
      SET role_id=${response.new_role}, manager_id=${response.emp_new_manager}
      WHERE id=${response.employee_to_update}
      `,
      function (err, results) {
      if (err) throw err;
      console.table(results);

      mainMenu();
    })
  })
}

// initiates application
mainMenu();