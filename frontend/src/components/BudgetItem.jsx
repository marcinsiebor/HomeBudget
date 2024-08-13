import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { formatCurrency, formatPercentage } from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget; // Destructuring budget object
  const [spent, setSpent] = useState(0); // State to track spent amount
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchSpent();
    const refreshDataInterval = setInterval(() => {
      fetchSpent()
  }, 1000);
    return () => clearInterval(refreshDataInterval);
  }, []);

  // Function to fetch spent amount for the budget
  const fetchSpent = async () => {
    try {
      const response = await fetch(`https://expensetrackerbackend.azurewebsites.net/budgets/${id}/spent`);
      if (!response.ok) {
        throw new Error("Failed to Fetch Spent Amount"); // Throw error if response is not OK
      }
      const data = await response.json(); // Parse response JSON
      setSpent(data.spent); // Update spent amount state
    } catch (error) {
      console.error("Error Fetching Spent Amount:", error); // Log error if request fails
      toast.error("Failed to Fetch Spent Amount"); // Display error message using toast
    }
  };

  // Function to handle deleting the budget
  const handleDeleteBudget = async () => {
    try {
      const response = await fetch(`https://expensetrackerbackend.azurewebsites.net/budgets/${id}`, {
        method: "DELETE", // HTTP DELETE method
      });
      if (!response.ok) {
        throw new Error("Failed to Delete Budget"); // Throw error if response is not OK
      }
      toast.success("Budget Deleted Successfully"); // Display success message using toast
      navigate("/dashboard"); // Navigate to dashboard after successful deletion
    } catch (error) {
      console.error("Error Deleting Budget:", error); // Log error if request fails
      toast.error("Failed to Delete Budget"); // Display error message using toast
    }
  };

  return (
    <div
      className="budget"
      style={{
        "--accent": color, // Set CSS variable for accent color
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? ( // Conditionally render delete button based on showDelete prop
        <div className="flex-sm">
          <button
            className="btn"
            onClick={() => {
              if (window.confirm("Are You Sure You Want To Delete This Budget?")) {
                handleDeleteBudget(); // Call handleDeleteBudget function on button click
              }
            }}
          >
            <span>Delete Budget</span>
            <TrashIcon width={20} /> {/* Display trash icon */}
          </button>
        </div>
      ) : (
        <div className="flex-sm">
          <button
            className="btn"
            onClick={() =>
              navigate(`/budget/${budget.id}`, {
                state: { budget }, // Pass budget object as state to details page
              })
            }
          >
            <span>View Details</span>
            <BanknotesIcon width={20} /> {/* Displaying the banknotes icon */}
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;