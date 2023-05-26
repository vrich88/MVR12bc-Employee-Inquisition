// required dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

// set up sql server
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "C0D3red@2023",
  database: "employees_db",
});

// variable for viewing & connecting tables
const allRoles = `
SELECT role.title, role.salary, dept.deptName
  FROM role
  JOIN dept ON dept.id = role.deptID
`;
// JOIN dept ON role.deptID = dept.id

const allEmployees = `
SELECT employee.firstName, employee.lastName, role.title, role.salary, dept.deptName,
  concat(manager.firstName, ' ', manager.lastName) AS managerName
  FROM employee
  JOIN role ON role.id = employee.roleID
  JOIN dept ON dept.id = role.deptID
  LEFT JOIN employee manager ON manager.id = employee.managerID
`;
// JOIN role ON employee.roleID = role.id
// JOIN dept ON role.deptID = dept.id
// LEFT JOIN employee manager ON employee.managerID = manager.id

// functions to add dept, role, & employee
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter new department name:",
        name: "newDept",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO dept (deptName) VALUES (?)",
        [answer.newDept],
        (err, res) => {
          mainMenu();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter new position title:",
        name: "title",
      },
      {
        type: "input",
        message: "Enter the new position salary:",
        name: "salary",
      },
      {
        type: "input",
        message: "Which department does the new position belong under:",
        name: "deptID",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO role (title, salary, deptID) VALUES (?, ?, ?)",
        [answer.title, answer.salary, answer.deptID],
        (err, res) => {
          mainMenu();
        }
      );
    });
}

function addEE() {
  db.query("SELECT * FROM role", (err, data) => {
    const roles = data.map((row) => {
      return { name: row.title, value: row.id };
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter employee's first name:",
          name: "firstName",
        },
        {
          type: "input",
          message: "Enter new employee's last name:",
          name: "lastName",
        },
        {
          type: "list",
          message: "Select new employee position",
          name: "roleID",
          choices: roles,
        },
        {
          type: "input",
          message: "Enter new employee manager:",
          name: "managerID",
        },
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES (?, ?, ?, ?)",
          [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
          (err, dataRes) => {
            mainMenu();
          }
        );
      });
  });
}

// functions to update employee role
function editRole() {
  db.query("SELECT * FROM employee", (err, data) => {
    const allEmployees = data.map((row) => {
      return { name: `${row.firstName} ${row.lastName}`, value: row.id };
    });
    db.query("SELECT * FROM role", (err, data) => {
      const newPosition = data.map((row) => {
        return { name: row.title, value: row.id };
      });
      // console.log(allEmployees);
      inquirer
        .prompt([
          {
            type: "list",
            message: "Select employee to update:",
            name: "employeeSelected",
            choices: allEmployees,
          },
          {
            type: "list",
            message: "Select new employee position:",
            name: "newPosition",
            choices: newPosition,
          },
        ])
        .then((answer) => {
          console.log(answer);
          db.query(
            "UPDATE employee SET roleID = ? WHERE id = ?",
            [answer.newPosition, answer.employeeSelected],
            (err, data) => {
              mainMenu();
            }
          );
        });
    });
  });
}

// function to actually do everything in node terminal with the above scripts
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What action would you like to do:",
        name: "selection",
        choices: [
          "VIEW all departments",
          "VIEW all roles",
          "VIEW all employees",
          "ADD a new department",
          "ADD a new role",
          "ADD a new employee",
          "UPDATE an employee's role",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.selection) {
        case "VIEW all departments":
          db.query("SELECT * FROM dept", (err, res) => {
            console.table(res);
            mainMenu();
          });
          break;
        case "VIEW all roles":
          db.query(allRoles, (err, res) => {
            console.table(res);
            mainMenu();
          });
          break;
        case "VIEW all employees":
          db.query(allEmployees, (err, res) => {
            console.table(res);
            mainMenu();
          });
          break;
        case "ADD new department":
          addDept();
          break;
        case "ADD new role":
          addRole();
          break;
        case "ADD new employee":
          addEE();
          break;
        case "UPDATE employee role":
          editRole();
          break;
        default:
          console.log("Error...Error...Please try again");
          mainMenu();
          break;
      }
    });
}

mainMenu();
