//Create users table if it doesn't exist
// db.serialize(() => {
//     db.run(`CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL
//     )`, (err) => {
//         if (err) {
//             console.error('Error creating users table:', err);
//         } else {
//             console.log('Users table created successfully');
//         }
//     });
// });


//Drop existing budgets and expenses tables if they exist
// db.run(`DROP TABLE IF EXISTS budgets`, (err) => {
//     if (err) {
//         console.error('Error dropping budgets table:', err);
//     } else {
//         console.log('Budgets table dropped successfully');
//     }
// });

// db.run(`DROP TABLE IF EXISTS expenses`, (err) => {
//     if (err) {
//         console.error('Error dropping expenses table:', err);
//     } else {
//         console.log('Expenses table dropped successfully');
//     }
// });

//Create budgets table
// db.run(`CREATE TABLE IF NOT EXISTS budgets (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     createdAt INTEGER NOT NULL,
//     amount REAL NOT NULL,
//     color TEXT NOT NULL,
//     userId INTEGER NOT NULL, -- Add userId column
//     FOREIGN KEY (userId) REFERENCES users(id) 
// )`, (err) => {
//     if (err) {
//         console.error('Error creating budgets table:', err);
//     } else {
//         console.log('Budgets table created successfully');
//     }
// });

//Create expenses table
// db.run(`CREATE TABLE IF NOT EXISTS expenses (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     newExpense TEXT NOT NULL,
//     createdAt INTEGER NOT NULL,
//     newExpenseAmount REAL NOT NULL,
//     budgetId INTEGER NOT NULL,
//     userId INTEGER NOT NULL, -- Add userId column
//     FOREIGN KEY (budgetId) REFERENCES budgets(id),
//     FOREIGN KEY (userId) REFERENCES users(id) 
// )`, (err) => {
//     if (err) {
//         console.error('Error creating expenses table:', err);
//     } else {
//         console.log('Expenses table created successfully');
//     }
// });