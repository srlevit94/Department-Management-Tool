INSERT INTO departments (id, name)
VALUES (1, "Marketing"),
       (2, "Management and HR"),
       (3, "Finance"),
       (4, "Sales");

INSERT INTO roles (id, title, salary, department_id)
VALUES (100, "Marketing Specialist", 50000, 1),
       (101, "Marketing Manager", 75000, 1),
       (102, "CEO", 150000, 2),
       (103, "Executive Assistant", 55000, 2),
       (104, "Financial Analyst", 60000, 3),
       (105, "Director of Finance", 80000, 3),
       (106, "Seller", 70000, 4),
       (107, "Director of Sales", 100000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1001, "Tom", "Haverford", 100, 101),
       (1002, "Leslie", "Knope", 101, 102),
       (1003, "Ron", "Swanson", 102, NULL),
       (1004, "April", "Ludgate", 103, 102),
       (1005, "Ben", "Wyatt", 104, 105),
       (1006, "Chris", "Traeger", 105, 102),
       (1007, "Andy", "Dwyer", 106, 107),
       (1008, "Donna", "Meagle", 107, 102);