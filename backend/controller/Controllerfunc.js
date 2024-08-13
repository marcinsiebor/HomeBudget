const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// SQLite3 database connection
const db = new sqlite3.Database('database.db');

let globalUserId = null;


//registration endpoint
const register = async(req, res) => {
    console.log("Received a request to register a user:", req.body);
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); 

    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [username, email, hashedPassword], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to register user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
}


// Login endpoint
const login = async(req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate' });
        }
        if (!row) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare hashed password
        if (bcrypt.compareSync(password, row.password)) {
            // Passwords match, authentication successful
            globalUserId = row.id;
            res.json({ message: 'Login successful', user: row });
        } else {
            // Passwords do not match
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
}


//color generator 
const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 65); 
    const saturation = Math.floor(Math.random() * 101);
    const lightness = Math.floor(Math.random() * 101); 
  
    return `${hue} 65% 50%`;
};


// Endpoint to create budgets
const createBudget = async(req, res) => {
    const { name, amount } = req.body;
    const userId = globalUserId; 
    const color = generateRandomColor();
    const createdAt = Date.now();

    const sql = `INSERT INTO budgets (name, createdAt, amount, color, userId) VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [name, createdAt, amount, color, userId], (err) => {
        if (err) {
            console.error('Error creating budget:', err);
            return res.status(500).json({ error: 'Failed to create budget' });
        }
        res.status(201).json({ message: 'Budget created successfully' });
    });
}

// Endpoint to create expenses
const createExpense = async(req, res) => {
    const { newExpense, newExpenseAmount, budgetId } = req.body;
    const userId = globalUserId; 
    const createdAt = Date.now();

    const sql = `INSERT INTO expenses (newExpense, createdAt, newExpenseAmount, budgetId, userId) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [newExpense, createdAt, newExpenseAmount, budgetId, userId], (err) => {
        if (err) {
            console.error('Error creating expense:', err);
            return res.status(500).json({ error: 'Failed to create expense' });
        }
        res.status(201).json({ message: 'Expense created successfully' });
    });
}

// Endpoint to fetch budgets for the authenticated user
const fetchBudgets = async(req, res) => {
    const userId = globalUserId; // Assuming user object is attached to the request
    const sql = `SELECT * FROM budgets WHERE userId = ?`;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching budgets:', err);
            return res.status(500).json({ error: 'Failed to fetch budgets' });
        }
        res.status(200).json(rows); // Send the fetched budgets as JSON response
    });
}

// Endpoint to fetch expenses for the authenticated user
const fetchExpenses = async(req, res) => {
    const userId = globalUserId; // Assuming user object is attached to the request
    const sql = `SELECT * FROM expenses WHERE userId = ?`;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching expenses:', err);
            return res.status(500).json({ error: 'Failed to fetch expenses' });
        }
        res.status(200).json(rows); // Send the fetched expenses as JSON response
    });
}


// Endpoint to calculate spent by budget
const calculateSpent = async(req, res) => {
    const budgetId = req.params.budgetId;
    const sql = `SELECT SUM(newExpenseAmount) AS spent FROM expenses WHERE budgetId = ?`;

    db.get(sql, [budgetId], (err, row) => {
        if (err) {
            console.error('Error calculating spent by budget:', err);
            return res.status(500).json({ error: 'Failed to calculate spent by budget' });
        }
        const spent = row.spent || 0; // If there are no expenses, set spent to 0
        res.status(200).json({ spent });
    });
}


// Endpoint to delete a budgets
const deleteBudget = async(req, res) => {
    const budgetId = req.params.id;

    // Delete the expenses associated with the budget
    const deleteExpenses = `DELETE FROM expenses WHERE budgetId = ?`;
    db.run(deleteExpenses, [budgetId], (err) => {
        if (err) {
            console.error('Error deleting expenses:', err);
            return res.status(500).json({ error: 'Failed to delete expenses' });
        }

        // Proceed to delete the budget
        const deleteBudget = `DELETE FROM budgets WHERE id = ?`;
        db.run(deleteBudget, [budgetId], (err) => {
            if (err) {
                console.error('Error deleting budget:', err);
                return res.status(500).json({ error: 'Failed to delete budget' });
            }
            res.status(200).json({ message: 'Budget and associated expenses deleted successfully' });
        });
    });
}


// Endpoint to delete a Expense
const deleteExpense = async(req, res) => {
    const expenseId = req.params.id;

    // Check if the expense exists
    const checkExpenseExists = `SELECT * FROM expenses WHERE id = ? AND userId = ?`;
    db.get(checkExpenseExists, [expenseId, globalUserId], (err, row) => {
        if (err) {
            console.error('Error checking expense existence:', err);
            return res.status(500).json({ error: 'Failed to delete expense' });
        }

        if (!row) {
            // If the expense doesn't exist or doesn't belong to the user, return an error
            return res.status(404).json({ error: 'Expense not found or unauthorized' });
        }

        // Expense exists and belongs to the user, proceed with deletion
        const deleteExpense = `DELETE FROM expenses WHERE id = ?`;
        db.run(deleteExpense, [expenseId], (err) => {
            if (err) {
                console.error('Error deleting expense:', err);
                return res.status(500).json({ error: 'Failed to delete expense' });
            }
            res.status(200).json({ message: 'Expense deleted successfully' });
        });
    });
}


// Endpoint to fetch the user's name
const fetchUsername = async(req, res) => {
    // Fetch user's name based on globalUserId
    const sql = `SELECT username FROM users WHERE id = ?`;

    db.get(sql, [globalUserId], (err, row) => {
        if (err) {
            console.error('Error fetching user name:', err);
            return res.status(500).json({ error: 'Failed to fetch user name' });
        }

        // Return the user's name to the frontend
        res.status(200).json({ userName: row.username });
    });
}


// Logout endpoint
const logout = async(req, res) => {
    // Clear globalUserId on logout
    globalUserId = null;
    res.status(200).json({ message: 'Logout successful' });
}



module.exports = {
    register,
    login,
    createBudget,
    createExpense,
    fetchBudgets,
    fetchExpenses,
    calculateSpent,
    deleteBudget,
    deleteExpense,
    fetchUsername,
    logout
}