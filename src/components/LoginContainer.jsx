import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./LoginContainer.css";

const LoginContainer = ({ loggedUser, setloggedUser }) => {
  const [email, setEmail] = useState("");
  const [invalidemail, setInvalidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [invalidpassword, setInvalidPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (e.target.value !== "") {
      setInvalidEmail(false);
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== "") {
      setInvalidPassword(false);
    }
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log(email, password);

    if (email === "" || password === "") {
      setInvalidEmail(true);
      setInvalidPassword(true);
    } else if (!email.includes("@")) {
      setInvalidEmail(true);
    } else if (password.length < 6) {
      setInvalidPassword(true);
    } else {
      setInvalidEmail(false);
      setInvalidPassword(false);

      try {
        let res = await fetch(
          "https://apptesting.docsumo.com/api/v1/eevee/login/",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );

        let data = await res.json();
        console.log(data);
        if (res.status === 200) {
          setloggedUser({ ...loggedUser, email: email });
          setEmail("");
          setPassword("");
          navigate("/login");
        }
      } catch (err) {
        setEmail("");
        setPassword("");
        setDisplay(true);
        setMessage("User doesn't exist!");
        console.log(err);
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submitHandler}>
        <h3>Login to your Docsumo account</h3>
        <div
          style={{ visibility: display ? "visible" : "hidden" }}
          className="message"
        >
          {message}
        </div>
        <div className="email-input">
          <label htmlFor="email">Email</label>
          <input
            className="email"
            id="email"
            onChange={emailHandler}
            type="email"
            name="email"
            value={email}
            placeholder="janedoe@abc.com"
          />
          {invalidemail && (
            <p className="error-message">Enter a valid email !</p>
          )}
        </div>

        <div className="password-input">
          <label htmlFor="password">Password</label>
          <div className="pwd">
            <input
              id="password"
              onChange={passwordHandler}
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="Enter password here..."
            />
            <span className="show-password" onClick={showPasswordHandler}>
              {showPassword ? (
                <i className="fa-regular fa-eye"></i>
              ) : (
                <i className="fa-regular fa-eye-slash"></i>
              )}
            </span>
          </div>
          {invalidpassword && (
            <p className="error-message">Enter a valid password !</p>
          )}
          <div className="forgot-password">
            <a href="#">Forgot Password ?</a>
          </div>
        </div>

        <button className="button login">Login</button>
        <span></span>
      </form>
    </div>
  );
};

export default LoginContainer;
