// AddExpenseForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddExpenseForm from './AddExpenseForm';

// Mock the fetch API
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('AddExpenseForm Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('renders AddExpenseForm component correctly with provided budgets data', () => {
    const budgets = [
      { id: '1', name: 'Groceries', createdAt: new Date() },
      { id: '2', name: 'Entertainment', createdAt: new Date() },
    ];

    render(<AddExpenseForm budgets={budgets} />);
    
    expect(screen.getByText('Add New Groceries Expense')).toBeInTheDocument();
    expect(screen.getByLabelText('Expense Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  });

  test('submits form data correctly', async () => {
    const budgets = [{ id: '1', name: 'Groceries', createdAt: new Date() }];
    const formData = {
      newExpense: 'Coffee',
      newExpenseAmount: '3.50',
      budgetId: '1',
      _action: 'createExpense',
    };

    fetch.mockResponseOnce(JSON.stringify({ message: 'Expense created successfully' }), { status: 200 });

    render(<AddExpenseForm budgets={budgets} />);

    fireEvent.change(screen.getByLabelText('Expense Name'), { target: { value: 'Coffee' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '3.50' } });
    fireEvent.submit(screen.getByRole('button', { name: /add expense/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://expensetrackerbackend.azurewebsites.net/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    });
  });

  test('handles successful submission', async () => {
    const budgets = [{ id: '1', name: 'Groceries', createdAt: new Date() }];

    fetch.mockResponseOnce(JSON.stringify({ message: 'Expense created successfully' }), { status: 200 });

    render(<AddExpenseForm budgets={budgets} />);

    fireEvent.submit(screen.getByRole('button', { name: /add expense/i }));

    await waitFor(() => {
      expect(screen.getByText('Expense created successfully')).toBeInTheDocument();
    });
  });

  test('handles failed submission', async () => {
    const budgets = [{ id: '1', name: 'Groceries', createdAt: new Date() }];

    fetch.mockReject(new Error('Failed to Create Expense'));

    render(<AddExpenseForm budgets={budgets} />);

    fireEvent.submit(screen.getByRole('button', { name: /add expense/i }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error Creating Expense:', expect.any(Error));
      expect(screen.getByText('Failed to Create Expense')).toBeInTheDocument();
    });
  });
});