import React, { useState } from "react";
import style from "./profile.module.css";
import Spinners from "../Spinners";
import Sign_in_up from "../Sign_in_up/Sign_in_up";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  //todo : you need to add showLoginForm state update in useEffect dependency array
  const navigate = useNavigate();

  const LoginStatus = localStorage.getItem("isLoggedIn");
  console.log("logIn Status  " + LoginStatus);
  const [showLoginForm, setShowLoginForm] = useState(
    LoginStatus === "false" ? false : true
  );
  //updating when user gets sign-in/up
  const handleLoginStatusUpdate = (status) => {
    setShowLoginForm(status);
  };

  const handleLogout = () => {
    localStorage.removeItem("cartSum");
    localStorage.removeItem("userId");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/");
  };

  return (
    <>
      {showLoginForm === false ? (
        <>
          <div className={style.loginComponentWrapper}>
            <Sign_in_up updateChange={handleLoginStatusUpdate} />
          </div>
        </>
      ) : (
        <>
          <div className={style.logoutContainer} onClick={handleLogout}>
            <button className={style.logoutButton}>Logout</button>
          </div>
        </>
      )}
    </>
  );
};
