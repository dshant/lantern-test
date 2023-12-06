import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { key } from "../helpers/localStorageKey";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(key, res?.user?.email);
      navigate("/calculator");
    } catch (error) {
      console.error(error, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setValue(res.user.email);
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h1>Login</h1>
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
          Login
        </button>

        <div className={styles.orSeparator}>or</div>

        <button
          type="button"
          className={styles.googleLogin}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </button>
        <h5 className={styles.account} onClick={() => navigate("/signup")}>
          Don't have an account? SignUp
        </h5>
      </form>
    </div>
  );
};

export default Login;
