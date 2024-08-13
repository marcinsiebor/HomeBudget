import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';
import Intro from './Intro';

// Mock the toast function
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock useLocalStorage hook
jest.mock('use-local-storage', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((key, initialValue) => [initialValue, jest.fn()]),
}));

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Mock fetch API
global.fetch = jest.fn();

describe('Intro', () => {
  beforeEach(() => {
    fetch.mockClear();
    toast.success.mockClear();
    toast.info.mockClear();
    toast.error.mockClear();
    mockedNavigate.mockClear();
  });

  test('renders the form correctly for registration', () => {
    render(
      <Router>
        <Intro />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Already Registered\? Login/i)).toBeInTheDocument();
  });

  test('toggles between login and registration forms', () => {
    render(
      <Router>
        <Intro />
      </Router>
    );

    fireEvent.click(screen.getByText(/Already Registered\? Login/i));

    expect(screen.queryByPlaceholderText(/Name/i)).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Not Registered\? Create an Account/i)).toBeInTheDocument();
  });

  test('handles registration form submission successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Registered successfully' }),
    });

    render(
      <Router>
        <Intro />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText(/Create Account/i));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(toast.success).toHaveBeenCalledWith('Registered successfully');
    expect(toast.info).toHaveBeenCalledWith('Registered Successfully. Please Login.');
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('handles login form submission successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Login successful' }),
    });

    render(
      <Router>
        <Intro />
      </Router>
    );

    fireEvent.click(screen.getByText(/Already Registered\? Login/i));

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(toast.success).toHaveBeenCalledWith('Login successful');
    expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('handles form submission failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(
      <Router>
        <Intro />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText(/Create Account/i));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(toast.error).toHaveBeenCalledWith('Failed to Authenticate');
  });
});
