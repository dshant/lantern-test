import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/signup.module.css";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { key } from "../helpers/localStorageKey";
const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        firstName,
        lastName
      );
      localStorage.setItem(key, res?.user?.email);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={handleSignup}>
        <h1>Create an Account</h1>

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

        <button type="submit" className={styles.button}>
          Sign Up
        </button>

        <h5 className={styles.link} onClick={() => navigate("/")}>
          Already have an account? Sign in
        </h5>
      </form>
    </div>
  );
};

export default Signup;
