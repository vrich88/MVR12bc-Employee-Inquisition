-- pre seeded data to populate db
-- dept info
INSERT INTO dept (deptName)
VALUES 
    ("Hobbit"),
    ("Ainur"),
    ("Man"),
    ("Elf"),
    ("Dwarf");

-- role info
INSERT INTO role (title, salary, deptID)
VALUES 
    ("Ring Bearer", 100000, 1),
    ("Wizard", 90000, 2),
    ("Sword", 85000, 3),
    ("Bow", 75000, 4),
    ("Axe", 70000, 5),
    ("Guardian", 60000, 3),
    ("Support", 50000, 1);

-- employee info
INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES 
    ("Frodo", "Baggins", 1, NULL),
    ("Gandalf", "the Grey", 2, NULL),
    ("Aragorn", "Elessar", 3, 2),
    ("Legolas", "Greenleaf", 4, 3),
    ("Gimli", "son of Gloin", 5, 3),
    ("Boromir", "Denethorson", 6, 3),
    ("Samwise", "Gamgee", 7, 1),
    ("Meriadoc", "Brandybuck", 7, 6),
    ("Peregrin", "Took", 7, 6);