import { useState } from "react";
import { Routes, Route } from "react-router";
import logoimage from "./assets/docsumologo.png";

import "./App.css";
import LoginContainer from "./components/LoginContainer";
import Welcome from "./pages/Welcome";

function App() {
  const [loggedUser, setloggedUser] = useState({ email: "" });

  return (
    <div className="container">
      <div className="logo-container">
        <a href="#">
          <img className="logo-image" src={logoimage} alt="logo" />
        </a>
      </div>
      <div className="page-container">
        <LoginContainer loggedUser={loggedUser} setloggedUser={setloggedUser} />
        <Routes>
          <Route
            to="/login"
            element={<Welcome loggedUser={loggedUser} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
