import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BudgetItem from '../components/BudgetItem';
import AddExpenseForm from '../components/AddExpenseForm';
import Table from '../components/Table';

const BudgetPage = () => {
    const location = useLocation();
    const { budget } = location.state;

    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        fetchExpenses();
        fetchBudgets();
        const refreshDataInterval = setInterval(() => {
            fetchExpenses();
            fetchBudgets();
        }, 1000);
        return () => clearInterval(refreshDataInterval);
      }, []);

    const fetchExpenses = async () => {
        try {
            const response = await fetch('https://expensetrackerbackend.azurewebsites.net/expenses');
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
            const data = await response.json();
            const filteredExpenses = data.filter(expense => expense.budgetId === budget.id);
            setExpenses(filteredExpenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
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
        }
    };

    return (
        <div className="grid-lg" style={{ "--accent": budget.color }}>
            <h1 className="h2">
                <span className="accent">{budget.name}</span> Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {expenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                        <span className="accent">{budget.name}</span> Expenses
                    </h2>
                    <Table expenses={expenses} budgets={budgets} showBudget={false} />
                </div>
            )}
        </div>
    );
};

export default BudgetPage;
