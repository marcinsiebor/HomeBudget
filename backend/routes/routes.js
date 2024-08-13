const express = require('express');
const {register, login, createBudget, createExpense, fetchBudgets, fetchExpenses, calculateSpent, deleteBudget, deleteExpense, fetchUsername, logout} = require('../controller/Controllerfunc')

const router = express.Router()


router.post('/register', register );

router.post('/login', login);
  
router.post('/budgets', createBudget);

router.post('/expenses', createExpense);

router.get('/budgets', fetchBudgets);

router.get('/expenses', fetchExpenses);

router.get('/budgets/:budgetId/spent', calculateSpent);

router.delete('/budgets/:id', deleteBudget);

router.delete('/expenses/:id', deleteExpense);

router.get('/user/name', fetchUsername);

router.post('/logout', logout);



module.exports = router

