// Nav.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Nav from './Nav';

// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the toast library
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Nav Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('renders Nav component correctly', () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );

    expect(screen.getByAltText('HomeBudget')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  test('handles logout successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'Logout successful' }), { status: 200 });

    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: /log out/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://expensetrackerbackend.azurewebsites.net/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(toast.success).toHaveBeenCalledWith('Logout successful');
    });
  });

  test('handles logout failure', async () => {
    fetch.mockReject(new Error('Failed to Logout'));

    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: /log out/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to Logout. Please Try Again Later.');
    });
  });

  test('handles non-200 response status', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'Failed to Logout' }), { status: 400 });

    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: /log out/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to Logout. Please Try Again Later.');
    });
  });
});