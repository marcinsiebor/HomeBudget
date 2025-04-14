# 🏠 HomeBudget: Budget Planner with Expense Tracking

A full-stack budget management app that helps users easily create budgets, track expenses, and visualize their financial data. Built with **React.js**, **Node.js**, and **SQLite**.

Developed as part of the *Software Development Techniques Project* at the University of Information Technology and Management in Rzeszów, Poland.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)

---

## 📖 Overview

HomeBudget was created to simplify the way individuals manage their personal finances. It offers tools to:
- Securely register and log in
- Create personalized budgets
- Log and categorize expenses
- View real-time budget insights through an interactive dashboard

The platform emphasizes usability, data security, and responsive design.

---

## 💻 Tech Stack

### Frontend (React.js)
- React – UI component library
- React Router DOM – Routing and navigation
- React Toastify – Notifications

### Backend (Node.js)
- Express.js – Server-side framework
- SQLite3 – Lightweight embedded database
- bcrypt – Password hashing
- express-session – Session management

---

## ✅ Features

- 🔐 User authentication (Register, Login, Logout)
- 📊 Budget creation and editing
- 💸 Expense logging with categorization
- 🧾 Dashboard displaying budget status and recent expenses
- ✂️ Delete budgets and expenses
- 📈 Budget-specific breakdown and progress visualization

---

## 🏗️ System Architecture

### Database Schema (SQLite)
- **Users**
  - `id`, `username`, `email`, `password`
- **Budgets**
  - `id`, `name`, `amount`, `color`, `userId`, `createdAt`
- **Expenses**
  - `id`, `name`, `amount`, `budgetId`, `userId`, `createdAt`

### API Endpoints (Node.js)

| Endpoint                        | Method | Description                                |
|---------------------------------|--------|--------------------------------------------|
| `/register`                     | POST   | Register new user                          |
| `/login`                        | POST   | Log in existing user                       |
| `/logout`                       | POST   | Log out user                               |
| `/create-budget`                | POST   | Add a new budget                           |
| `/create-expense`               | POST   | Add a new expense                          |
| `/fetch-budgets`                | GET    | Retrieve all user budgets                  |
| `/fetch-expenses`               | GET    | Retrieve all user expenses                 |
| `/calculate-spent/:id`          | GET    | Calculate total spent on a budget          |
| `/delete-budget/:id`            | DELETE | Delete budget and its expenses             |
| `/delete-expense/:id`           | DELETE | Delete a specific expense                  |
| `/fetch-username`               | GET    | Get the username of the authenticated user |

---

## ⚙️ Installation

### Backend
```bash
cd backend/
npm install
node index.js
```

### Frontend
```bash
cd frontend/
npm install
npm start
```

---

## 🚀 Usage

1. Open your browser at `http://localhost:3000`
2. Register a new account or log in with existing credentials
3. Create a budget by entering a name and amount
4. Add expenses and assign them to budgets
5. View and manage your data via the dashboard
6. Explore budget insights and delete items when necessary

---

## 👥 Contributors

| Name                   | Student ID | Role         |
|------------------------|------------|--------------|
| Marcin Siebor          | w67069     | Developer    |
| Ahmed Alkali Mohammed  | w66986     | Developer    |
