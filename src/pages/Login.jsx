import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { key } from "../helpers/localStorageKey";
import { toast } from "react-toastify";

// Login Component
const Login = () => {
  // Initializing state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle email and password login
  const handleLogin = async (e) => {
    // Preventing the page from refreshing
    e.preventDefault();
    try {
      // Attempting to sign in with email and password
      const res = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(key, res?.user?.email); // Set email in localStorage to retrieve it on the calculator page
      toast.success("Logged in successfully!"); // To show success message
      navigate("/calculator"); // On successful API call, navigate to the calculator page
    } catch (error) {
      toast.error("Invalid email or password!"); // Show error message
    }
  };

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Attempting to sign in with Google using a popup
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res, "res======");
      localStorage.setItem(key, res?.user?.email);
      toast.success("Logged in successfully!");
      navigate("/calculator");
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  // Rendering the Login component
  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h1>Login</h1>

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

        {/* Button to submit login form */}
        <button type="submit" className={styles.button}>
          Login
        </button>

        {/* Separator for alternative login option */}
        <div className={styles.orSeparator}>or</div>

        {/* Button for Google login */}
        <button
          type="button"
          className={styles.googleLogin}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </button>

        {/* Link to navigate to the signup page */}
        <h5 className={styles.account} onClick={() => navigate("/signup")}>
          Don't have an account? SignUp
        </h5>
      </form>
    </div>
  );
};

// Exporting the Login component
export default Login;
