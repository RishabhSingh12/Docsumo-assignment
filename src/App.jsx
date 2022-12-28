import { useState } from "react";

import "./App.css";
import LoginContainer from "./components/LoginContainer";

function App() {
  return (
    <div className="container">
      <div className="logo-container">
        <a href="#">
          <img className="logo-image" src="./src/assets/logo.png" alt="logo" />
        </a>
      </div>
      <div className="page-container">
        <LoginContainer />
      </div>
    </div>
  );
}

export default App;
