import React, { useState } from "react";
import style from "./profile.module.css";
import Spinners from "../Spinners";
import Sign_in_up from "../Sign_in_up/Sign_in_up";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  const navigate = useNavigate();
  //fetching data from localstorage
  const LoginStatus = localStorage.getItem("isLoggedIn");
  console.log("logIn Status  " + LoginStatus);
  const [showLoginForm, setShowLoginForm] = useState(
    LoginStatus === "false" ? true : false
  );
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
      <div className={style.logoutContainer} onClick={handleLogout}>
        <button className={style.logoutButton}>Logout</button>
      </div>
    </>
  );
};
