import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import illustration from "../assets/illustration.png";
import { toast } from "react-toastify";

// Component for introduction and user authentication (login/register)
const Intro = () => {
  const [isLogin, setIsLogin] = useState(false); // State to manage login/register toggle
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  }); // State to manage form data
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formData }; // Copy form data to new object

    try {
      const response = await fetch(isLogin ? "https://expensetrackerbackend.azurewebsites.net/login" : "https://expensetrackerbackend.azurewebsites.net/register", {
        method: "POST", // HTTP POST method
        headers: {
          "Content-Type": "application/json" // Specify JSON content type
        },
        body: JSON.stringify(data) // Convert form data to JSON string for request body
      });

      if (!response.ok) {
        throw new Error("Failed to Authenticate"); // Throw error if response is not OK
      }

      const responseData = await response.json(); // Parse response JSON

      toast.success(responseData.message); // Display success message using toast
      
      if (isLogin) {
        navigate("/dashboard"); // Navigate to dashboard after successful login
      } else {
        setIsLogin(true); // Switch to login form
        setFormData({
          username: "",
          email: "",
          password: ""
        }); // Clear form data
        toast.info("Registered Successfully. Please Login."); // Display info message using toast
      }
    } catch (error) {
      console.error("Error:", error); // Log error if request fails
      toast.error("Failed to Authenticate"); // Display error message using toast
    }
  };

  // Function to handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to toggle between login and registration forms
  const toggleForm = () => {
    setIsLogin((prevState) => !prevState); // Toggle isLogin state
    setFormData({
      username: "",
      email: "",
      password: ""
    }); // Clear form data
  };

  return (
    <div className='intro'>
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>Personal budgeting is the secret to financial freedom. Start your journey today.</p>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                aria-label="Your Email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                aria-label="Your Password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="username"
                required
                placeholder="Name"
                aria-label="Your Name"
                autoComplete="given-name"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                aria-label="Your Email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                aria-label="Your Password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </>
          )}
          <input type="hidden" name="_action" value={isLogin ? "login" : "register"} />
          <button type="submit" className="btn btn--dark">
            <span>{isLogin ? "Login" : "Create Account"}</span>
            <UserPlusIcon width={20} />
          </button>
        </form>
        <button onClick={toggleForm} className="btn btn--transparent">
          {isLogin ? "Not Registered? Create an Account" : "Already Registered? Login"}
        </button>
      </div>
      <img src={illustration} alt="Person with Money" width={600} />
    </div>
  );
};

export default Intro;