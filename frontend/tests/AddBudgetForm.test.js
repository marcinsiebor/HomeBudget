// AddBudgetForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBudgetForm from './AddBudgetForm';

// Mock the fetch API
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('AddBudgetForm Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('renders AddBudgetForm component correctly', () => {
    render(<AddBudgetForm />);
    expect(screen.getByText('Create Budget')).toBeInTheDocument();
    expect(screen.getByLabelText('Budget Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  });

  test('submits form data correctly', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'Budget created successfully' }), { status: 200 });

    render(<AddBudgetForm />);

    fireEvent.change(screen.getByLabelText('Budget Name'), { target: { value: 'Groceries' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '350' } });
    fireEvent.submit(screen.getByRole('button', { name: /create budget/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://expensetrackerbackend.azurewebsites.net/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Groceries', amount: '350' }),
      });
    });
  });

  test('handles successful submission', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'Budget created successfully' }), { status: 200 });

    render(<AddBudgetForm />);

    fireEvent.submit(screen.getByRole('button', { name: /create budget/i }));

    await waitFor(() => {
      expect(screen.getByText('Budget created successfully')).toBeInTheDocument();
    });
  });

  test('handles failed submission', async () => {
    fetch.mockReject(new Error('Failed to Create Budget'));

    render(<AddBudgetForm />);

    fireEvent.submit(screen.getByRole('button', { name: /create budget/i }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error creating budget:', expect.any(Error));
    });
  });
});