// Table.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Table from './Table';

describe('Table Component', () => {
  test('renders Table component correctly with provided expenses and budgets data', () => {
    const expenses = [
      { id: '1', name: 'Coffee', amount: 3.50, createdAt: new Date(), budgetId: '1' },
      { id: '2', name: 'Lunch', amount: 12.99, createdAt: new Date(), budgetId: '2' },
    ];
    const budgets = [
      { id: '1', name: 'Groceries', color: '#ff0000' },
      { id: '2', name: 'Dining Out', color: '#00ff00' },
    ];

    render(<Table expenses={expenses} budgets={budgets} />);

    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('$3.50')).toBeInTheDocument();
    expect(screen.getByText(expect.stringContaining(new Date().toLocaleDateString()))).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  test('renders correct number of table headers based on showBudget prop', () => {
    const expenses = [{ id: '1', name: 'Coffee', amount: 3.50, createdAt: new Date(), budgetId: '1' }];
    const budgets = [{ id: '1', name: 'Groceries', color: '#ff0000' }];

    render(<Table expenses={expenses} budgets={budgets} showBudget />);

    expect(screen.getAllByRole('columnheader')).toHaveLength(5); // Name, Amount, Date, Budget, Delete
  });

  test('renders correct number of ExpenseItem components based on expenses data', () => {
    const expenses = [
      { id: '1', name: 'Coffee', amount: 3.50, createdAt: new Date(), budgetId: '1' },
      { id: '2', name: 'Lunch', amount: 12.99, createdAt: new Date(), budgetId: '2' },
    ];
    const budgets = [
      { id: '1', name: 'Groceries', color: '#ff0000' },
      { id: '2', name: 'Dining Out', color: '#00ff00' },
    ];

    render(<Table expenses={expenses} budgets={budgets} />);

    expect(screen.getAllByRole('row')).toHaveLength(3); // Header row + 2 expense rows
  });
});