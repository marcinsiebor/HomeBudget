// Importing necessary libraries, components, and pages
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // React Router DOM imports
import { ToastContainer } from "react-toastify"; // Toast notification container
import "react-toastify/dist/ReactToastify.css"; // Toast notification styles

// Layouts
import Main from "./layout/Main"; // Main layout component

// Pages
import Intro from "./components/Intro"; // Introduction page component
import Error from "./pages/Error"; // Error page component
import Dashboard from "./pages/Dashboard"; // Dashboard page component
import ExpensesPage from "./pages/ExpensesPage"; // Expenses page component
import BudgetPage from "./pages/BudgetPage"; // Budget page component

// Creating the router configuration
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <Main />, // Main layout component
    errorElement: <Error />, // Error page component
    children: [
      {
        index: true, // Index route
        element: <Intro />, // Introduction page component
        errorElement: <Error />, // Error page component
      },
      {
        path: "dashboard", // Dashboard path
        element: <Dashboard />, // Dashboard page component
        errorElement: <Error />, // Error page component
      },
      {
        path: "budget/:id", // Budget detail path
        element: <BudgetPage />, // Budget page component
        errorElement: <Error />, // Error page component
      },
      {
        path: "expenses", // Expenses path
        element: <ExpensesPage />, // Expenses page component
        errorElement: <Error />, // Error page component
      }
    ],
  },
]);

// Main application component
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} /> {/* Router provider */}
      <ToastContainer /> {/* Toast notification container */}
    </div>
  );
}

export default App;