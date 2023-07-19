import React, { useState, useEffect } from "react";
import style from "./profile.module.css";
import Spinners from "../Spinners";
import Sign_in_up from "../Sign_in_up/Sign_in_up";
import { useNavigate, Link } from "react-router-dom";
import baseUrl from "../Constant";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
export const Profile = () => {
  //todo : you need to add showLoginForm state update in useEffect dependency array
  const navigate = useNavigate();

  const LoginStatus = localStorage.getItem("isLoggedIn");
  console.log("logIn Status  " + LoginStatus);
  const [showLoginForm, setShowLoginForm] = useState(
    LoginStatus === "false" ? false : true
  );

  const [displayMenu, setDisplayMenu] = useState(0);
  const menuColor = new Array(2).fill(false);
  menuColor[0] = true;
  const [colorSelected, setColorSelected] = useState(menuColor);

  const updateDisplayMenu = (menuIndex) => {
    let updatedColorArray = new Array(2).fill(false);
    updatedColorArray[menuIndex] = true;
    setColorSelected(updatedColorArray);
    setDisplayMenu(menuIndex);
  };
  //updating when user gets sign-in/up
  const handleLoginStatusUpdate = (status) => {
    setShowLoginForm(status);
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
          <div className={style.profilePageContainer}>
            <div className={style.navBarContainer}>
              <Navbar />
            </div>
            <div className={style.profileContaintContainer}>
              <div className={style.profileInfoContainer}>
                <div className={style.profileInfoWrapper}>
                  <div className={style.userImageWrapper}>
                    <img
                      src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      alt="profieImage"
                      className={style.profileImage}
                    />
                  </div>
                  <div className={style.userInfoTextWrapper}>
                    <span className={style.userNameText}>Devashish Bakare</span>
                    <span className={style.userEmailText}>
                      devashishbakare@gmail.com
                    </span>
                  </div>
                </div>
              </div>
              <div className={style.userCategoryContainer}>
                <div className={style.userPersonaliseInfoContainer}>
                  <div className={style.topMenuWrapper}>
                    <span
                      className={`${style.menu} ${
                        colorSelected[0] ? style.selectedMenu : ""
                      }`}
                      onClick={() => updateDisplayMenu(0)}
                    >
                      Orders
                    </span>
                    <span
                      className={`${style.menu} ${
                        colorSelected[1] ? style.selectedMenu : ""
                      }`}
                      onClick={() => updateDisplayMenu(1)}
                    >
                      Edit Profile
                    </span>
                  </div>
                  <div className={style.menuOutputContainer}>
                    {/* Favorites */}
                    {displayMenu === 0 && <>in Orders</>}
                    {displayMenu === 1 && <>in cart</>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
