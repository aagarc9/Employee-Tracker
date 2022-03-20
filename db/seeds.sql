USE tracker_db;

INSERT INTO department (name, id)
VALUES ("Sales", 1), ("Engineer", 2), ("Finance", 3), ("Legal", 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 150000, 1), ("Sales Person", 80000, 1), ("Lead Engineer", 120000, 2), ("Software Engineer", 100000, 2), ("Account Manager", 100000, 3), ("Accountant", 75000, 3), ("Lawyer", 150000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Paola", "Road", 1), ("Chris", "Goldern", 2, 1), ("Andy", "Garcia", 3), ("Diego", "Jota", 4, 3), ("Mo", "Salah", 5), ("Roberto", "Firmno", 6, 5), ("Luis", "Diaz", 7);
