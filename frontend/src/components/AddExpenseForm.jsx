import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

// Component for adding a new expense
const AddExpenseForm = ({ budgets }) => {
  const formRef = useRef(); // Reference to the form element
  const focusRef = useRef(); // Reference to the input field for focusing

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(formRef.current); // Get form data
    const jsonData = Object.fromEntries(formData.entries()); // Convert form data to JSON object
    console.log(jsonData); // Log JSON data for debugging

    try {
      const response = await fetch('https://expensetrackerbackend.azurewebsites.net/expenses', {
        method: 'POST', // HTTP POST method
        headers: {
          'Content-Type': 'application/json', // Specify JSON content type
        },
        body: JSON.stringify(jsonData), // Convert JSON data to string for request body
      });

      if (!response.ok) {
        throw new Error('Failed to Create Expense'); // Throw error if response is not OK
      }

      const responseData = await response.json(); // Parse response JSON
      toast.success(responseData.message); // Display success message using toast

      // Clear the form after successful submission
      formRef.current.reset(); // Reset form fields
      focusRef.current.focus(); // Set focus to input field
    } catch (error) {
      console.error('Error Creating Expense:', error); // Log error if request fails
      toast.error('Failed to Create Expense'); // Display error message using toast
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && budgets.map((budget) => budget.name)} {/* Display budget name */}
        </span>{" "}
        Expense
      </h2>
      <form method="post" className="grid-sm" ref={formRef} onSubmit={handleSubmit}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef} // Set reference to input field for focusing
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="budgetId" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt) // Sort budgets by creation date
              .map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark">
          <span>Add Expense</span>
          <PlusCircleIcon width={20} /> {/* Display plus icon for button */}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;