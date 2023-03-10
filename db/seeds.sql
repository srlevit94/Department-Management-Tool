INSERT INTO departments (names)
VALUES ("Marketing"),
       ("Management and HR"),
       ("Finance"),
       ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Specialist", 50000, 1),
       ("Marketing Manager", 75000, 1),
       ("CEO", 150000, 2),
       ("Executive Assistant", 55000, 2),
       ("Financial Analyst", 60000, 3),
       ("Director of Finance", 80000, 3),
       ("Seller", 70000, 4),
       ("Director of Sales", 100000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Haverford", 100, 1001),
       ("Leslie", "Knope", 101, 1002),
       ("Ron", "Swanson", 102, NULL),
       ("April", "Ludgate", 103, 1002),
       ("Ben", "Wyatt", 104, 1005),
       ("Chris", "Traeger", 105, 1002),
       ("Andy", "Dwyer", 106, 1007),
       ("Donna", "Meagle", 107, 1002);