import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/signup.module.css";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { key } from "../helpers/localStorageKey";
import { toast } from "react-toastify";

// Signup Component
const Signup = () => {
  // Initializing state variables to capture email and password
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle user registration with email and password
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Attempting to create a new user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Saving user email in local storage
      localStorage.setItem(key, res?.user?.email);
      toast.success("Registered Successfully!"); // Showing success message
      navigate("/"); // Redirecting to the home page on successful registration
    } catch (error) {
      toast.error("Email already exists!"); // Showing error message if email already exists
    }
  };

  // Rendering the Signup component
  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={handleSignup}>
        <h1>Create an Account</h1>

        {/* Input fields for email and password */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Button to submit the signup form */}
        <button type="submit" className={styles.button}>
          Sign Up
        </button>

        {/* Link to navigate to the signin page */}
        <h5 className={styles.link} onClick={() => navigate("/")}>
          Already have an account? Sign in
        </h5>
      </form>
    </div>
  );
};

// Exporting the Signup component
export default Signup;
