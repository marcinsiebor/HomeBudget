// BudgetItem.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BudgetItem from './BudgetItem';

// Mock the fetch API
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('BudgetItem Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('renders BudgetItem component correctly with provided budget data', () => {
    const budget = {
      id: '1',
      name: 'Groceries',
      amount: 500,
      color: '#ff0000',
    };

    render(<BudgetItem budget={budget} />);
    
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('$500.00 Budgeted')).toBeInTheDocument();
  });

  test('fetches spent amount correctly and updates state', async () => {
    const budget = {
      id: '1',
      name: 'Groceries',
      amount: 500,
      color: '#ff0000',
    };

    fetch.mockResponseOnce(JSON.stringify({ spent: 200 }), { status: 200 });

    render(<BudgetItem budget={budget} />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://expensetrackerbackend.azurewebsites.net/budgets/1/spent');
      expect(screen.getByText('$200.00 spent')).toBeInTheDocument();
      expect(screen.getByText('$300.00 remaining')).toBeInTheDocument();
    });
  });

  test('handles deleting budget correctly', async () => {
    const budget = {
      id: '1',
      name: 'Groceries',
      amount: 500,
      color: '#ff0000',
    };

    fetch.mockResponseOnce(JSON.stringify({ message: 'Budget Deleted Successfully' }), { status: 200 });

    render(<BudgetItem budget={budget} showDelete />);

    fireEvent.click(screen.getByText('Delete Budget'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://expensetrackerbackend.azurewebsites.net/budgets/1', {
        method: 'DELETE',
      });
      expect(screen.getByText('Budget Deleted Successfully')).toBeInTheDocument();
    });
  });

  test('navigates to budget details page correctly', () => {
    const budget = {
      id: '1',
      name: 'Groceries',
      amount: 500,
      color: '#ff0000',
    };

    const { navigate } = require('react-router-dom');

    render(<BudgetItem budget={budget} />);

    fireEvent.click(screen.getByText('View Details'));

    expect(navigate).toHaveBeenCalledWith('/budget/1', {
      state: { budget },
    });
  });

  test('displays error toast message when fetching spent amount fails', async () => {
    const budget = {
      id: '1',
      name: 'Groceries',
      amount: 500,
      color: '#ff0000',
    };

    fetch.mockReject(new Error('Failed to Fetch Spent Amount'));

    render(<BudgetItem budget={budget} />);

    await waitFor(() => {
      expect(screen.getByText('Failed to Fetch Spent Amount')).toBeInTheDocument();
    });
  });

  test('displays error toast message when deleting budget fails', async () => {
    const budget = {
      id: '1',
      name: 'Groceries',
      amount: 500,
      color: '#ff0000',
    };

    fetch.mockReject(new Error('Failed to Delete Budget'));

    render(<BudgetItem budget={budget} showDelete />);

    fireEvent.click(screen.getByText('Delete Budget'));

    await waitFor(() => {
      expect(screen.getByText('Failed to Delete Budget')).toBeInTheDocument();
    });
  });
});
