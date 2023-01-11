DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

SELECT DATABASE();

CREATE TABLE departments (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(30) NOT NULL,
  -- adds an additional constraint, cannot enter two rows with the same value --
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
);