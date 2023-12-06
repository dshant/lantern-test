import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navigation from "./routes/Navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
