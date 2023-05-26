-- database set up and use
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

-- establish dept table
CREATE TABLE dept (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    deptName VARCHAR(30) NOT NULL
);

-- establish role table
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR (30),
    salary DECIMAL,
    deptID INT,
    FOREIGN KEY (deptID)
    REFERENCES dept(id)
);

-- establish employee table
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleID INT,
    FOREIGN KEY (roleID)
    REFERENCES role(id),
    managerID INT,
    FOREIGN KEY (managerID)
    REFERENCES employee(id)
);