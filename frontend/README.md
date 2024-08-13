# Home Budget Tracker - Frontend (React.js)

## Overview

The frontend of the Home Budget Tracker project utilizes React.js, a popular JavaScript library for building user interfaces. It offers a flexible and efficient approach to creating interactive UI components.

### User Interface Design

The user interface design of the Home Budget Tracker application is meticulously crafted to ensure an intuitive and seamless experience for users across various pages.

- **Home / Sign-Up Page:** This page serves as the entry point for the application, featuring a welcoming layout with the Home Budget Tracker logo and a registration form for new users. Users can sign up by providing their username, email address, and password. The form includes validation to ensure accurate and complete information.

- **Login Page:** The login page features a form for users to enter their email address and password to access their accounts. Custom Toast Error messages are displayed for invalid inputs, and a "Sign Up" link is provided for new users.

- **Add Budget Page:** This page enables users to create and manage their budgets efficiently. Users can input budget details such as category and amount. Interactive features facilitate seamless budget creation and modification.

- **Add Expense Page:** Users can log their expenses effortlessly through the add expense page. The intuitive interface allows users to categorize expenses, specify dates, and enter amounts with ease. Real-time validation ensures data accuracy.

- **Budget Details Page:** The budget details page provides users with in-depth insights into their budget allocations. Users can view a breakdown of expenses within each budget category, helping them make informed financial decisions.

### React Components and Pages

The React application is organized into reusable components and pages to ensure modularity and ease of maintenance.

#### Components

- **AddBudgetForm.jsx:** This component displays a form for creating a new budget, featuring input fields for the budget name and amount. Upon submission, it sends a POST request to the server. If successful, it displays a success message using react-toastify; otherwise, it logs an error message to the console.

- **AddExpenseForm.jsx:** The AddExpenseForm.jsx component renders a form to add a new expense, including fields for the expense name and amount. It optionally includes a dropdown to select the budget category from an array of budgets. Upon submission, it sends a POST request to the server and displays success or error messages using react-toastify.

- **BudgetItem.jsx:** Represents a single budget item in the application. It displays the budget's name, the amount budgeted, and a progress bar indicating the amount spent relative to the budgeted amount. It also shows the amount spent and the remaining budget. Additionally, it provides an option to delete the budget if showDelete prop is set to true, otherwise, it offers an option to view the details of the budget.

- **ExpenseItem.jsx:** Represents a single expense item in the application. It displays details of the expense including the name of the expense, the amount, and the date it was created. If showBudget prop is true, it also displays the associated budget's name, which is clickable and navigates to the budget details page. Additionally, it provides an option to delete the expense item.

- **Intro.jsx:** Serves as the introduction section of the application, featuring an illustration and a form for user authentication. Users can either log in or register for an account, with the form dynamically changing based on the selected option. Upon submission, the form sends data to the backend for authentication. Successful authentication redirects the user to the dashboard page, while unsuccessful attempts prompt error messages.

- **Nav.jsx:** Provides navigation functionalities within the application. It includes a link to the dashboard and a button for logging out. Upon clicking the logout button, the component sends a request to the backend to log out the user. If successful, the user is redirected to the home page, and a success message is displayed. If the logout attempt fails, an error message is shown, prompting the user to try again later.

- **Table.jsx:** Renders a table displaying expense data. It includes columns for the expense name, amount, date, and, optionally, the budget category. Each row corresponds to an individual expense item, displayed using the ExpenseItem component. If the showBudget prop is set to true, the table also includes a column for the budget category.

#### Pages

- **App.jsx:** The main component of the application, responsible for routing and rendering different pages based on the URL. Utilizes react-router-dom's createBrowserRouter to define routes for different components and pages, including Intro, Error, Dashboard, BudgetPage, and ExpensesPage. Also includes the ToastContainer component from react-toastify for displaying notification messages.

- **BudgetPage.jsx:** Dynamically fetches and displays expense data related to a specific budget, enabling users to manage expenses within the budget's context, visualize expense details, and add new expenses.

- **Dashboard.jsx:** Renders the user's personalized dashboard, displaying existing budgets, recent expenses, and providing options to add new budgets and expenses. It dynamically fetches user information, budgets, and expenses from the backend, enabling seamless management of financial data.

- **Error.jsx:** Handles route errors by displaying an error message and providing options to navigate back or return to the home page. It utilizes React Router's useRouteError hook to access error information and enables navigation using the useNavigate hook.

- **ExpensePage.jsx:** Displays all expenses fetched from the backend, along with recent expenses. It fetches expense data and budget data from the server and updates them periodically. If expenses exist, it renders a table showing recent expenses along with the total count, utilizing the Table component. Otherwise, it displays a message indicating no expenses to show.