import React, { useContext, useState } from "react";
import style from "./sign_in_up.module.css";
import { SiNike } from "react-icons/si";
import axios from "axios";
import baseUrl from "../Constant";
import Navbar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartCountContext from "../CartCountContext";

const Sign_in_up = ({ updateChange }) => {
  const { setCartCount } = useContext(CartCountContext);
  const [userTryToRegister, setUserTryToRegister] = useState(false);
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
      if (
        credentials.email === "" ||
        credentials.name === "" ||
        credentials.password === "" ||
        credentials.confirmPassword === ""
      ) {
        toast.error(
          "Fields can't be empty. Please fill in the data correctly",
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        return;
      }
      if (credentials.confirmPassword !== credentials.password) {
        toast.error("Password and confirm password are not correct", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      try {
        const response = await axios.post(
          `${baseUrl}/user/register`,
          credentials
        );
        if (response.status === 200) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", response.data);
          updateChange(true);
        }
      } catch (err) {
        console.log(err.response.data);
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      try {
        const response = await axios.post(`${baseUrl}/user/login`, credentials);

        if (response.status === 200) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", response.data.token);
          setCartCount(response.data.cartCount);
          updateChange(true);
        }
      } catch (err) {
        console.log(err.response.data);
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }

    setCredentials({
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleGuestLogin = async () => {
    try {
      const data = {
        email: "johndoe@gmail.com",
        userName: "",
        password: "7890",
        confirmPassword: "",
      };
      const response = await axios.post(`${baseUrl}/user/login`, data);

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", response.data.token);
        setCartCount(response.data.cartCount);
        updateChange(true);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("Something went wrong, try to register", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
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
            <div className={style.formSection}>
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
                    <button
                      className={`${style.registerButton} ${style.loginButtonSection}`}
                      onClick={handleLoginSubmit}
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    <div className={style.guestLoginContainer}>
                      <button
                        className={style.loginButtonSection}
                        onClick={handleLoginSubmit}
                      >
                        Login
                      </button>
                      <button
                        className={style.loginButtonSection}
                        onClick={handleGuestLogin}
                      >
                        Guest Login
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={style.ContactSectionWrapper}>
          <ContactFooter />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Sign_in_up;
