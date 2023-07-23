import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./productDetails.module.css";
import axios from "axios";
import baseUrl from "../Constant";
import Spinners from "../Spinners";
import Navbar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsMinecart, BsHeart } from "react-icons/bs";
import { SiNike } from "react-icons/si";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export const ProductDetails = () => {
  const location = useLocation();
  const props = location.state;
  console.log(props);
  const userLoggedIn = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(-1);
  const [selecttedSize, setSelectedSize] = useState(-1);
  const [showProductFlag, setShowProductFlag] = useState(false);
  const [slideNotification, setSlideNotifcation] = useState(false);
  const [notificationFor, setNotificationFor] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userTryToRegister, setUserTryToRegister] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [cartOrfavorite, setCartOrfavorite] = useState("");
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
          localStorage.setItem("token", response.data);
          console.log("succesfull");
          setResponseMessage("");

          if (cartOrfavorite === "cart") {
            setCartOrfavorite("");
            setShowLoginForm(false);
            handleAddToCart();
          } else {
            setCartOrfavorite("");
            setShowLoginForm(false);
            handleAddToFavorite();
          }
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
          localStorage.setItem("token", response.data);
          console.log(response.data);
          setResponseMessage("");

          if (cartOrfavorite === "cart") {
            console.log("call from cart condition");
            setCartOrfavorite("");
            handleAddToCart();
          } else {
            setCartOrfavorite("");
            handleAddToFavorite();
          }
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

  const handleCloseModal = () => {
    setShowProductFlag(!showProductFlag);
    setSelectedColor(-1);
    setSelectedSize(-1);
    setSlideNotifcation(false);
    setNotificationFor("");
  };

  const handleAddToCart = async () => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn");
    if (isUserLoggedIn === false) {
      console.log("call initialise from here");
      setCartOrfavorite("cart");
      setShowLoginForm(true);
    } else {
      setShowLoginForm(false);
      console.log("Add to cart");
      const token = localStorage.getItem("token");

      const info = {
        productItemId: props._id,
        size: selecttedSize,
        color: selectedColor,
        quantity: 1,
        productPrice: props.price,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.post(
          `${baseUrl}/shoe/addToCart`,
          info,
          config
        );

        if (response.status === 200) {
          console.log(response.data);
          if (slideNotification === true) {
            setNotificationFor("Cart");
          } else {
            setNotificationFor("Cart");
            setSlideNotifcation(true);
            setTimeout(() => {
              setSlideNotifcation(false);
            }, 4000);
          }
          setSelectedColor(-1);
          setSelectedSize(-1);
        } else {
          console.log("there is error in add to cart");
        }
      } catch (err) {
        console.log(err + " error in cart selection");
        console.log(err.response.data);
      }
    }
  };

  const handleAddToFavorite = async () => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn");
    if (isUserLoggedIn === false) {
      setCartOrfavorite("fav");
      setShowLoginForm(true);
    } else {
      console.log("Add to Fav");
      setShowLoginForm(false);
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };

        const info = {
          productItemId: props._id,
          size: selecttedSize,
          color: selectedColor,
          quantity: 1,
          productPrice: props.price,
        };

        const response = await axios.post(
          `${baseUrl}/shoe/addFavorite`,
          info,
          config
        );

        if (response.status === 200) {
          console.log(response.data);
          if (slideNotification === true) {
            setNotificationFor("Favorite");
          } else {
            setNotificationFor("Favorite");
            setSlideNotifcation(true);
            setTimeout(() => {
              setSlideNotifcation(false);
            }, 4000);
          }
          setSelectedColor(-1);
          setSelectedSize(-1);
        } else {
          console.log("there is error in add to cart");
        }
      } catch (err) {
        console.log(err + " error in cart selection");
        console.log(err.response.data);
      }
    }
  };
  return (
    <>
      <div className={style.productDetailsContainer}>
        <div className={style.navBarWrapper}>
          <Navbar />
        </div>
        <div className={style.containtWrapper}>
          <div className={style.productDesciptionContainer}>
            <div className={style.productDescriptionTable}>
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
        </div>
      </div>
    </>
  );
};
