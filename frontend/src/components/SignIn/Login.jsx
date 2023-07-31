import React, { useState } from "react";
import style from "./login.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Sign_in_up from "../Sign_in_up/Sign_in_up";
export const Login = () => {
  // updating login status
  const LoginStatus = localStorage.getItem("isLoggedIn");
  const [showLoginForm, setShowLoginForm] = useState(
    LoginStatus === "false" ? false : true
  );
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.state.from;
  const data = location.state.data;

  const handleLoginStatusUpdate = (status) => {
    if (status === true) {
      localStorage.setItem("isLoggedIn", "true");
    }
    setShowLoginForm(status);
    if (data) {
      navigate(`${url}`, { state: data });
    } else {
      navigate(`${url}`);
    }
  };

  return (
    <>
      {showLoginForm === false && (
        <>
          <div className={style.loginComponentWrapper}>
            <Sign_in_up updateChange={handleLoginStatusUpdate} />
          </div>
        </>
      )}
    </>
  );
};
