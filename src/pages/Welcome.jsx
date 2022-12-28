import React from "react";
import "./Welcome.css";

const Welcome = ({ loggedUser }) => {
  const { email } = loggedUser;
  let username = email.split("@");
  return (
    <div className="welcome">
      <h2>Hi, {username[0]}</h2>
      <p>Welcome !</p>
    </div>
  );
};

export default Welcome;
