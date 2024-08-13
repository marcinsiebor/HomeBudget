import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import logomark from "../assets/logomark.svg";

// Component for navigation bar
const Nav = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle logout
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://expensetrackerbackend.azurewebsites.net/logout", {
        method: "POST", // HTTP POST method
        headers: {
          "Content-Type": "application/json" // Specify JSON content type
        }
      });
      
      if (response.ok) {
        const responseData = await response.json(); // Parse response JSON
        toast.success(responseData.message); // Display success message using toast
        navigate("/"); // Navigate to home page after successful logout
      } else {
        throw new Error("Failed to Logout"); // Throw error if response is not OK
      }
    } catch (error) {
      console.error("Error Logging Out:", error); // Log error if request fails
      toast.error("Failed to Logout. Please Try Again Later."); // Display error message using toast
    }
  };

  return (
    <nav>
      <NavLink to="/dashboard" aria-label="Go to Home">
        <img src={logomark} alt="HomeBudget" height={30} />
        <span>HomeBudget</span>
      </NavLink>
      
      <form onSubmit={handleLogout}>
        <button type="submit" className="btn btn--warning">
          <span>Log Out</span>
          <ArrowRightEndOnRectangleIcon width={30} />
        </button>
      </form>
    </nav>
  );
};

export default Nav;