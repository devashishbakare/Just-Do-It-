import React, { useState } from "react";
import style from "./sign_in_up.module.css";
import { SiNike } from "react-icons/si";
import axios from "axios";
import baseUrl from "../Constant";
import Navbar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";

const Sign_in_up = ({ updateChange }) => {
  const userLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("userLoggedIn status " + userLoggedIn);
  const [userTryToRegister, setUserTryToRegister] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLoginSectionClick = () => {
    setUserTryToRegister(false);
    setCredentials({
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    });
  };

  const handleRegisterSectionClick = () => {
    setUserTryToRegister(true);
    setCredentials({
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (userTryToRegister === true) {
      try {
        const response = await axios.post(
          `${baseUrl}/user/register`,
          credentials
        );
        if (response.status === 200) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userId", response.data._id);
          console.log("succesfull");
          setResponseMessage("");
          updateChange(true);
        }
      } catch (err) {
        console.log(err, " Error in registering user");
        console.log(err.response.data);
        setResponseMessage(err.response.data);
      }
    } else {
      try {
        const response = await axios.post(`${baseUrl}/user/login`, credentials);

        if (response.status === 200) {
          localStorage.setItem("isLoggedIn", "true");
          console.log("here we updated a status after login");
          localStorage.setItem("userId", response.data._id);
          console.log(response.data);
          setResponseMessage("");
          updateChange(true);
        }
      } catch (err) {
        console.log(err, "Error while Logging");
        console.log(err.response.data);
        setResponseMessage(err.response.data);
      }
    }

    setCredentials({
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className={style.loginDivContainer}>
        <div className={style.navBarWrapper}>
          <Navbar />
        </div>
        <div className={style.formContainerWrapper}>
          <div
            className={`${style.loginBoxContainer} ${
              userTryToRegister ? style.updatedLoginBoxContainer : ""
            }`}
          >
            <form className={style.formSection} onSubmit={handleLoginSubmit}>
              <div className={style.loginOrRegisterContainer}>
                <span
                  className={`${style.TextWrapper} ${
                    !userTryToRegister ? style.updatedTextWrapper : ""
                  }`}
                  onClick={handleLoginSectionClick}
                >
                  Login
                </span>
                <span
                  className={`${style.TextWrapper} ${
                    userTryToRegister ? style.updatedTextWrapper : ""
                  }`}
                  onClick={handleRegisterSectionClick}
                >
                  Register
                </span>
              </div>
              <div className={style.loginHeadingWrapper}>
                <span className={style.loginLogo}>
                  <SiNike className={style.nikeLogo} />
                </span>
                <span className={style.loginSlogan}>
                  YOUR ACCOUNT FOR EVERTHING NIKE
                </span>
              </div>
              <div className={style.inputeContainer}>
                <div
                  className={`${style.inputSectionWrapper} ${
                    userTryToRegister ? style.updatedInputSectionWrapper : ""
                  }`}
                >
                  {userTryToRegister && (
                    <>
                      <input
                        type="text"
                        className={style.inputBar}
                        placeholder="Enter Your Name"
                        name="userName"
                        value={credentials.userName}
                        onChange={handleChange}
                      />
                    </>
                  )}
                  <input
                    type="text"
                    className={style.inputBar}
                    name="email"
                    placeholder="Enter Your Email"
                    value={credentials.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    className={style.inputBar}
                    name="password"
                    placeholder="Enter Your Password"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                  {userTryToRegister && (
                    <>
                      <input
                        type="password"
                        className={style.inputBar}
                        placeholder="Enter confirm Password"
                        name="confirmPassword"
                        value={credentials.confirmPassword}
                        onChange={handleChange}
                      />
                    </>
                  )}
                </div>
                <div className={style.termsAndPrivacySection}>
                  <span className={style.privacyText}>
                    By logging in, you agree to Nike's Privacy Policy and Term
                    of use
                  </span>
                </div>
              </div>
              <div className={style.loginButtonContainer}>
                {userTryToRegister ? (
                  <>
                    <button className={style.loginButtonSection}>
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    <button className={style.loginButtonSection}>Login</button>
                  </>
                )}
              </div>
              {responseMessage ? (
                <>
                  <div className={style.responseMessageWrapper}>
                    <span className={style.responseMessageText}>
                      {responseMessage}
                    </span>
                  </div>
                </>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>

        <div className={style.ContactSectionWrapper}>
          <ContactFooter />
        </div>
      </div>
    </>
  );
};

export default Sign_in_up;
