// ExpenseItem.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExpenseItem from './ExpenseItem';

// Mock the fetch API
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('ExpenseItem Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('renders ExpenseItem component correctly with provided expense and budgets data', () => {
    const expense = {
      id: '1',
      newExpense: 'Coffee',
      newExpenseAmount: 3.50,
      createdAt: new Date(),
      budgetId: '1',
    };
    const budgets = [{ id: '1', name: 'Groceries', color: '#ff0000' }];

    render(<ExpenseItem expense={expense} budgets={budgets} showBudget />);

    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('$3.50')).toBeInTheDocument();
    expect(screen.getByText(expect.stringContaining(new Date().toLocaleDateString()))).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  test('handles deleting expense correctly', async () => {
    const expense = {
      id: '1',
      newExpense: 'Coffee',
      newExpenseAmount: 3.50,
      createdAt: new Date(),
      budgetId: '1',
    };

    fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });

    render(<ExpenseItem expense={expense} budgets={[]} />);

    fireEvent.click(screen.getByLabelText(/Delete Coffee expense/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://expensetrackerbackend.azurewebsites.net/expenses/1', {
        method: 'DELETE',
      });
      expect(screen.getByText('Expense Deleted Successfully')).toBeInTheDocument();
    });
  });

  test('handles failed deletion of expense correctly', async () => {
    const expense = {
      id: '1',
      newExpense: 'Coffee',
      newExpenseAmount: 3.50,
      createdAt: new Date(),
      budgetId: '1',
    };

    fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

    render(<ExpenseItem expense={expense} budgets={[]} />);

    fireEvent.click(screen.getByLabelText(/Delete Coffee expense/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://expensetrackerbackend.azurewebsites.net/expenses/1', {
        method: 'DELETE',
      });
      expect(screen.getByText('Failed to Delete Expense')).toBeInTheDocument();
    });
  });
});