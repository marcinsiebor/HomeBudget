import React, { useEffect, useState } from 'react'
import Table from '../components/Table';

const ExpensesPage = () => {

    const [expensesExist, setExpensesExist] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);


    useEffect(() => {
        fetchBudgets();
        fetchExpense();
        const refreshDataInterval = setInterval(() => {
          fetchBudgets();
          fetchExpense();
        }, 1000);
        return () => clearInterval(refreshDataInterval);
    }, []);

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


    const fetchBudgets = async () => {
        try {
            const response = await fetch('https://expensetrackerbackend.azurewebsites.net/budgets');
            if (!response.ok) {
                throw new Error('Failed to fetch budgets');
            }
            const data = await response.json();
            setBudgets(data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
            toast.error('Failed to fetch budgets');
        }
    };

    
  return (
    <div className="grid-lg">
        <h1>All Expenses</h1>
        {
            expenses && expensesExist ? (
                <div className="grid-md">
                    <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                    <Table expenses={expenses} budgets={budgets}/>
                </div>
            )
            :
            <p> No Expenses to show</p>
        }
    </div>
  )
}

export default ExpensesPage