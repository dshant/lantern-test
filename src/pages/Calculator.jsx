// Calculator.js
import React, { useEffect, useState } from "react";
import styles from "../styles/calculator.module.css";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { key } from "../helpers/localStorageKey";
import { useNavigate } from "react-router";
const Calculator = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [inputError, setInputError] = useState("");
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem(key);
    navigate("/");
  };

  const fetchCalculationHistory = async (userId) => {
    try {
      setLoadingHistory(true);
      const historyRef = collection(db, "history");
      const historyQuery = query(historyRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(historyQuery);

      const history = [];
      querySnapshot.forEach((doc) => {
        history.push({ id: doc.id, ...doc.data() });
      });

      setCalculationHistory(history);
    } catch (error) {
      console.error("Error fetching calculation history:", error.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  const storeCalculationHistory = async (calculation) => {
    try {
      const userId = auth.currentUser.uid;
      const historyRef = collection(db, "history");
      await addDoc(historyRef, {
        userId,
        calculation,
        timestamp: serverTimestamp(),
        currency,
      });
      fetchCalculationHistory(userId);
    } catch (error) {
      console.error("Error storing calculation history:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCalculationHistory(user.uid);
      } else {
        setCalculationHistory([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCalculations = (number1, number2) => {
    if (!num1 || !num2) {
      setInputError("Please fill the inputs field to check the result!");
    } else {
      setInputError("");
    }
    switch (operator) {
      case "+":
        return number1 + number2;
      case "-":
        return number1 - number2;
      case "*":
        return number1 * number2;
      case "/":
        return number1 / number2;
      default:
        return null;
    }
  };

  const handleCalculate = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    const result = handleCalculations(number1, number2);
    if (result !== null && auth.currentUser) {
      const calculationString = `${number1} ${operator} ${number2} = ${result}`;
      storeCalculationHistory(calculationString);
    }

    setResult(result);
  };

  const handleCurrencyChange = () => {
    setCurrency((prevCurrency) => (prevCurrency === "USD" ? "Euro" : "USD"));
  };

  const formatCurrency = (value) => {
    const conversionFactor = 0.93;

    const formattedValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "USD" ? "USD" : "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(currency === "USD" ? value : value * conversionFactor);

    return formattedValue;
  };

  useEffect(() => {
    if (localStorage.getItem(key)) {
      const userData = localStorage.getItem(key);
      setUserEmail(userData);
    }
  }, []);

  const deleteCalculationHistory = async (id) => {
    try {
      const historyRef = doc(db, "history", id);
      await deleteDoc(historyRef);
      setCalculationHistory((prevHistory) =>
        prevHistory.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting calculation history:", error.message);
    }
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.header}>
        {userEmail && <h4>Welcome&nbsp;{userEmail}</h4>}
        <button className={styles.logout} onClick={handleLogout}>
          Log Out!
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.calculatorData}>
          <h4 className={styles.calculatorHeading}>Calculator</h4>
          <div className={styles.calculatorInput}>
            <label>Number 1:</label>
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />

            <label>Number 2:</label>
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />

            <label>Select an Operator:</label>
            <div className={styles.buttons}>
              <button
                className={styles.operator}
                onClick={() => setOperator("+")}
              >
                <span>+</span>
              </button>

              <button
                className={styles.operator}
                onClick={() => setOperator("-")}
              >
                <span> -</span>
              </button>
            </div>
            <div className={styles.buttons}>
              <button
                className={styles.operator}
                onClick={() => setOperator("*")}
              >
                <span> *</span>
              </button>

              <button
                className={styles.operator}
                onClick={() => setOperator("/")}
              >
                <span> /</span>
              </button>
            </div>

            <button onClick={handleCalculate} className={styles.button}>
              Calculate
            </button>
          </div>
          <div className={styles.calculatorResult}>
            <label>Currency:</label>
            <button className={styles.button} onClick={handleCurrencyChange}>
              {currency}
            </button>

            <div>
              <h4 className={styles.resultHeading}>
                Result:{" "}
                {!inputError
                  ? result !== null
                    ? formatCurrency(result)
                    : "Please calculate"
                  : inputError}
              </h4>
            </div>
          </div>
        </div>

        {calculationHistory?.length > 0 && (
          <div className={styles.calculationHistory}>
            <h4>Calculation History</h4>
            {calculationHistory?.map((item, index) => (
              <div className={styles.items} key={index}>
                <h5>
                  {item?.calculation} &nbsp;
                  {item.currency}
                </h5>
                <button
                  className={styles.delete}
                  onClick={() => deleteCalculationHistory(item?.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
