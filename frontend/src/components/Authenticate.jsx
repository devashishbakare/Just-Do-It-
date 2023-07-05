import React, { useState } from "react";
import Sign_in_up from "./Sign_in_up/Sign_in_up";
import style from "./Cart/cart.module.css";
import { useNavigate, useLocation } from "react-router-dom";
export const Authenticate = () => {
  const location = useLocation();
  const navigateTo = location.state;
  console.log("state Value " + navigateTo);
  const loginStatus = localStorage.getItem("isLoggedIn");
  const [showLoginForm, setShowLoginForm] = useState(
    loginStatus === "false" ? false : true
  );
  const navigate = useNavigate();
  const handleLoginStatusUpdate = (status) => {
    console.log("updation status " + status);
    setShowLoginForm(status);
  };

  if (!showLoginForm) {
    return (
      <div className={style.loginComponentWrapper}>
        <Sign_in_up updateChange={handleLoginStatusUpdate} />
      </div>
    );
  } else {
    navigate(`${navigateTo}`);

    return null; // Return null when navigating to prevent rendering of other components
  }
};
