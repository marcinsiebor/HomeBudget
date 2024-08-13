import React, { useRef, useState } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'; // Import currency icon
import { toast } from 'react-toastify';

// Component for adding a new budget
const AddBudgetForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status
  const formRef = useRef(); // Reference to the form element
  const focusRef = useRef(); // Reference to the input element for focusing

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Set submitting state to true

    const formData = new FormData(formRef.current); // Get form data
    const jsonData = Object.fromEntries(formData.entries()); // Convert form data to JSON object
    console.log(jsonData); // Log JSON data for debugging

    try {
      const response = await fetch('https://expensetrackerbackend.azurewebsites.net/budgets', {
        method: 'POST', // HTTP POST method
        headers: {
          'Content-Type': 'application/json', // Specify JSON content type
        },
        body: JSON.stringify(jsonData), // Convert JSON data to string for request body
      });

      if (!response.ok) {
        throw new Error('Failed to Create Budget'); // Throw error if response is not OK
      }

      const responseData = await response.json(); // Parse response JSON
      toast.success(responseData.message); // Display success message using toast

      setIsSubmitting(false); // Reset submitting state to false
      formRef.current.reset(); // Reset form fields
      focusRef.current.focus(); // Set focus to input field
    } catch (error) {
      console.error('Error creating budget:', error); // Log error if request fails
      setIsSubmitting(false); // Reset submitting state to false
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <form method="post" className="grid-sm" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="name"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef} // Set reference to input field for focusing
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="amount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span> // Display "Submitting..." when form is submitting
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} /> {/* Display currency icon */}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBudgetForm;