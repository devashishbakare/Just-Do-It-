import React, { useState } from "react";
import style from "./product.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsMinecart, BsHeart } from "react-icons/bs";
import { SiNike } from "react-icons/si";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
const Product = ({ props }) => {
  /*
   In this we can use if else
  */
  const userLoggedIn = localStorage.getItem("isLoggedIn");
  const [selectedColor, setSelectedColor] = useState(-1);
  const [selecttedSize, setSelectedSize] = useState(-1);
  const [showProductFlag, setShowProductFlag] = useState(false);
  const [slideNotification, setSlideNotifcation] = useState(false);
  const [notificationFor, setNotificationFor] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userTryToRegister, setUserTryToRegister] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (userTryToRegister === true) {
      //todo : handle registrastion here
      console.log("Password:", credentials.password);
      console.log("Confirm Password:", credentials.confirmPassword);
    } else {
      //todo : handle login here
      console.log("Username:", credentials.username);
      console.log("Password:", credentials.password);
    }

    // Reset form fields
    setCredentials({
      username: "",
      password: "",
    });
  };

  const handleCloseModal = () => {
    setShowProductFlag(!showProductFlag);
    setSelectedColor(-1);
    setSelectedSize(-1);
    setSlideNotifcation(false);
    setNotificationFor("");
  };

  const handleAddToCart = () => {
    if (!showLoginForm) {
      // I have a floating div, and its position is absolute, now I want to show one div above of that? how to do that?
      setShowLoginForm(true);
    }
    // if (slideNotification === true) {
    //   setNotificationFor("Cart");
    // } else {
    //   setNotificationFor("Cart");
    //   setSlideNotifcation(true);
    //   setTimeout(() => {
    //     setSlideNotifcation(false);
    //   }, 4000);
    // }
  };

  const handleAddToFavorite = () => {
    // if (slideNotification === true) {
    //   setNotificationFor("Favorite");
    // } else {
    //   setNotificationFor("Favorite");
    //   setSlideNotifcation(true);
    //   setTimeout(() => {
    //     setSlideNotifcation(false);
    //   }, 4000);
    // }
  };
  return (
    <>
      <div
        className={style.productContainer}
        onClick={() => setShowProductFlag(!showProductFlag)}
      >
        <div className={style.productImagerContainer}>
          <img
            src={props.images[0]}
            alt="shoeImage"
            className={style.productImage}
          />
        </div>
        <div className={style.productInfoContainer}>
          <div className={style.shoeHeadingContainer}>
            <span className={style.shoeNameHeadingText}>{props.name}</span>
            <span className={style.shoeTypeText}>
              {props.shoes_type}
              &nbsp;
              {props.category}
              &nbsp;shoes
            </span>
            <span className={style.shoeColorCount}>
              Colors : &nbsp;{props.availableColors.length}
            </span>
          </div>
          <div className={style.shoePriceContainer}>
            <span className={style.shoeAmountText}>{props.price}&nbsp;Rs</span>
          </div>
        </div>
      </div>
      {showProductFlag && (
        <>
          <div className={style.productDesciptionContainer}>
            {showLoginForm && (
              <>
                <div className={style.loginDivContainer}>
                  <div className={style.loginBoxContainer}>
                    <form
                      className={style.formSection}
                      onSubmit={handleLoginSubmit}
                    >
                      <div className={style.loginOrRegisterContainer}>
                        <span
                          className={style.TextWrapper}
                          onClick={() => setUserTryToRegister(false)}
                        >
                          Login
                        </span>
                        <span
                          className={style.TextWrapper}
                          onClick={() => setUserTryToRegister(true)}
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
                        <div className={style.inputSectionWrapper}>
                          <input
                            type="text"
                            className={style.inputBar}
                            name="username"
                            placeholder="Enter Your Email"
                            value={credentials.username}
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
                            By logging in, you agree to Nike's Privacy Policy
                            and Term of use
                          </span>
                        </div>
                      </div>
                      <div className={style.loginButtonContainer}>
                        {userTryToRegister ? (
                          <>
                            <div className={style.loginButtonSection}>
                              Login
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={style.loginButtonSection}>
                              Register
                            </div>
                          </>
                        )}
                        <div className={style.signInWrapper}>
                          Notification Section
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
            <>
              <div
                className={`${style.notificationContainer} ${
                  slideNotification ? style.slideNotifacationBar : ""
                }`}
              >
                <div className={style.extraInfoContainer}>
                  <div className={style.headingWrapper}>
                    <span
                      className={`${style.notificationTextStyle} ${style.textUpdatedDiv}`}
                    >
                      Added To {notificationFor}
                    </span>
                  </div>
                  <div className={style.closeButtonWrapper}>
                    <span className={style.closeNotificationWrapper}>
                      <AiFillCloseCircle
                        className={style.notficationCloseButton}
                        onClick={() => setSlideNotifcation(false)}
                      />
                    </span>
                  </div>
                </div>
                <div className={style.addProductInfo}>
                  <div className={style.addedProductImageWrapper}>
                    <img
                      src={props.images[0]}
                      alt=""
                      className={style.addedProductImg}
                    />
                  </div>
                  <div className={style.addedProductName}>
                    <span className={style.addedProductNameHeading}>
                      {props.name}
                    </span>
                    <span className={style.notificationTextStyle}>
                      {props.shoes_type}
                      &nbsp;
                      {props.category}
                      &nbsp;shoes
                    </span>
                    <span className={style.notificationTextStyle}>
                      {props.price} &nbsp;Rs
                    </span>
                  </div>
                </div>
              </div>
            </>

            <div className={style.productDescriptionTable}>
              <div className={style.closureSection}>
                <AiFillCloseCircle
                  className={style.closeButton}
                  onClick={handleCloseModal}
                />
              </div>
              <div className={style.productInfoDisplaySection}>
                <div className={style.productImageWrapper}>
                  <div className={style.shoeImageContainer}>
                    <img
                      src={props.images[0]}
                      alt="shoeImage"
                      className={style.imageWrapper}
                    />
                    <div className={style.prevButtonContainer}>
                      <MdOutlineArrowBackIosNew
                        className={style.carouselIcons}
                      />
                    </div>

                    <div className={style.nextButtonContainer}>
                      <MdOutlineArrowForwardIos
                        className={style.carouselIcons}
                      />
                    </div>
                  </div>
                  <div className={style.shoeDetailInfoContainer}>
                    <div className={style.showShoeHeadingContainer}>
                      <span className={style.showProductShoeHeadingText}>
                        {props.name}
                      </span>
                      <span className={style.showProductShoeTypeText}>
                        {props.shoes_type}
                        &nbsp;
                        {props.category}
                        &nbsp;Shoes
                      </span>
                    </div>
                    <div className={style.showProductShoePriceContainer}>
                      <span className={style.showProductShoeAmountText}>
                        {props.price}&nbsp;Rs
                      </span>
                    </div>
                  </div>
                </div>
                <div className={style.productInfoWrapper}>
                  <div className={style.availableColorsWrapper}>
                    <div className={style.colorTextWrapper}>
                      <span className={style.availableText}>
                        Available Colors
                      </span>
                    </div>
                    <div className={style.colorWrapper}>
                      {props.availableColors.map((color, index) => (
                        <>
                          <div
                            className={`${style.colorOuterBorder} ${
                              selectedColor === index
                                ? style.highlightBorder
                                : ""
                            }`}
                            onClick={() => setSelectedColor(index)}
                            key={"color" + index}
                          >
                            <div
                              className={style.colorDiv}
                              style={{ backgroundColor: color }}
                            ></div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  <div className={style.availableSizeWrapper}>
                    <span className={style.sizeText}>Available Size</span>
                    <div className={style.showSizeContainer}>
                      {props.availableSize.map((size, index) => (
                        <>
                          <div
                            className={`${style.shoeSizeWrapper} ${
                              selecttedSize === index ? style.highlightSize : ""
                            }`}
                            key={"size" + index}
                            onClick={() => setSelectedSize(index)}
                          >
                            <span className={style.shoeSize}> {size} UK</span>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  <div className={style.productSummaryWrapper}>
                    <span className={style.summaryHeadingText}>More Info</span>
                    <span className={style.shoeSummaryContainer}>
                      {props.summary}
                    </span>
                  </div>
                  <div className={style.buttonContainer}>
                    <div
                      className={style.buttonWrapper}
                      onClick={handleAddToCart}
                    >
                      <span className={style.buttonText}>Add To Cart</span>
                      <BsMinecart className={style.buttonText} />
                    </div>
                    <div
                      className={style.buttonWrapper}
                      onClick={handleAddToFavorite}
                    >
                      <span className={style.buttonText}>Add To Favorite</span>
                      <BsHeart className={style.buttonText} />
                    </div>
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

export default Product;
//
