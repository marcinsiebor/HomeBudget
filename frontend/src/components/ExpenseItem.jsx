import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { formatCurrency, formatDateToLocaleString } from "../helpers"; // Import helper functions for formatting
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Component for rendering a single expense item
const ExpenseItem = ({ expense, budgets, showBudget }) => {
  const budget = budgets.find((b) => b.id === expense.budgetId); // Find budget corresponding to expense

  // Function to handle deleting the expense
  const handleDeleteExpense = async () => {
    try {
      const response = await fetch(`https://expensetrackerbackend.azurewebsites.net/expenses/${expense.id}`, {
        method: "DELETE", // HTTP DELETE method
      });
      if (response.ok) {
        toast.success("Expense Deleted Successfully"); // Display success message using toast
      } else {
        console.error("Failed to Delete Expense:", response.statusText); // Log error if request fails
        toast.error("Failed to Delete Expense"); // Display error message using toast
      }
    } catch (error) {
      console.error("Error Deleting Expense:", error); // Log error if request fails
      toast.error("Error Deleting Expense"); // Display error message using toast
    }
  };

  return (
    <>
      <td>{expense.newExpense}</td> {/* Display the expense name */}
      <td>{formatCurrency(expense.newExpenseAmount)}</td> {/* Format and display expense amount */}
      <td>{formatDateToLocaleString(expense.createdAt)}</td> {/* Format and display expense creation date */}
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            state={{ budget, expense }}
            style={{ "--accent": budget.color }} // Set CSS variable for accent color
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <button
          type="button"
          className="btn btn--warning"
          aria-label={`Delete ${expense.newExpenseAmount} expense`}
          onClick={handleDeleteExpense} // Call handleDeleteExpense function on button click
        >
          <TrashIcon width={20} /> {/* Display trash icon */}
        </button>
      </td>
    </>
  );
};

export default ExpenseItem;