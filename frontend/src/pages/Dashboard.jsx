import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

function Dashboard() {
  const [budgetsExist, setBudgetsExist] = useState(false);
  const [expensesExist, setExpensesExist] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchUserName();
    fetchBudgets();
    fetchExpense();
    const refreshDataInterval = setInterval(() => {
      fetchBudgets();
      fetchExpense();
    }, 1000);
    return () => clearInterval(refreshDataInterval);
  }, []);

  const fetchUserName = async () => {
    try {
      const response = await fetch('https://expensetrackerbackend.azurewebsites.net/user/name');
      if (!response.ok) {
        throw new Error('Failed to fetch user name');
      }
      const data = await response.json();
      setUserName(data.userName);
    } catch (error) {
      console.error('Error fetching user name:', error);
      toast.error('Failed to fetch user name');
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await fetch('https://expensetrackerbackend.azurewebsites.net/budgets');
      if (!response.ok) {
        throw new Error('Failed to fetch budgets');
      }
      const data = await response.json();
      setBudgets(data);
      setBudgetsExist(data.length > 0);
    } catch (error) {
      console.error('Error fetching budgets:', error);
      toast.error('Failed to fetch budgets');
    }
  };

  const fetchExpense = async () => {
    try {
      const response = await fetch('https://expensetrackerbackend.azurewebsites.net/expenses');
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpenses(data);
      setExpensesExist(data.length > 0);
    } catch (error) {
      console.error('Error fetching expense:', error);
      toast.error('Failed to fetch expense');
    }
  };

  return (
    <>
      <div className="dashboard">
        <h1>
          Welcome back, <span className="accent">{userName}</span>
        </h1>
        {budgetsExist ? (
          <div className="grid-lg">
            <div className="flex-lg">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
            </div>
            <h2>Existing Budgets</h2>
            <div className="budgets">
              {budgets.map((budget) => (
                <BudgetItem key={budget.id} budget={budget} />
              ))}
            </div>
            {expenses && expensesExist && (
              <div className="grid-md">
                <h2>Recent Expenses</h2>
                <Table
                  expenses={expenses
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(0, 8)}
                  budgets={budgets}
                />
                {expenses.length > 8 && (
                  <Link to="/expenses" className="btn btn--dark">
                    View all expenses
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid-sm">
            <p>Personal budgeting is the secret to financial freedom.</p>
            <p>Create a budget to get started!</p>
            <AddBudgetForm />
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
