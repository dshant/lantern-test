import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Calculator from "../pages/Calculator";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/calculator" element={<Calculator />} />
    </Routes>
  );
};
export default Navigation;
