import React, { useState } from "react";
import style from "./product.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsMinecart, BsHeart } from "react-icons/bs";
import { SiNike } from "react-icons/si";
import baseUrl from "../Constant";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Product = React.memo(({ props }) => {
  /*
   In this we can use if else
  */
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
      <div
        className={style.productContainer}
        onClick={() => navigate("/productDetails", { state: props })}
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
    </>
  );
});

export default Product;
