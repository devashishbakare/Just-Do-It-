import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./productDetails.module.css";
import axios from "axios";
import baseUrl from "../Constant";
import Navbar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsMinecart, BsHeart } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import CartCountContext from "../CartCountContext";
export const ProductDetails = () => {
  const props = JSON.parse(localStorage.getItem("productDetails"));
  const currentState = { from: window.location.pathname };
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartCountContext);
  const [selectedColor, setSelectedColor] = useState(-1);
  const [selecttedSize, setSelectedSize] = useState(-1);
  const [slideNotification, setSlideNotifcation] = useState(false);
  const [notificationFor, setNotificationFor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = async () => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn");
    if (isUserLoggedIn === "false") {
      navigate("/login", { state: currentState });
    } else {
      if (selectedColor === -1 || selecttedSize === -1) {
        toast.error(
          "kindly complete all required information before proceeding",
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
          setCartCount((prevCount) => prevCount + 1);
        }
      } catch (err) {
        console.log(err.response.data);
        toast.error("Something went wrong, try again later", {
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
  };

  const handleAddToFavorite = async () => {
    // fetching user login details
    const isUserLoggedIn = localStorage.getItem("isLoggedIn");
    if (isUserLoggedIn === "false") {
      navigate("/login", { state: currentState });
    } else {
      if (selectedColor === -1 || selecttedSize === -1) {
        toast.error(
          "kindly complete all required information before proceeding",
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
          // console.log(response.data);
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
        }
      } catch (err) {
        console.log(err.response.data);
        toast.error("Something went wrong, try again later", {
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
  };
  const handleCarousel = (direction) => {
    if (direction === "prev") {
      setCurrentImageIndex(
        currentImageIndex === 0
          ? props.images.length - 1
          : currentImageIndex - 1
      );
    } else {
      setCurrentImageIndex(
        currentImageIndex === props.images.length - 1
          ? 0
          : currentImageIndex + 1
      );
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
            {slideNotification && (
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
            )}
            <div className={style.productDescriptionTable}>
              <div className={style.productInfoDisplaySection}>
                <div className={style.productImageWrapper}>
                  <div className={style.shoeImageContainer}>
                    <img
                      src={props.images[currentImageIndex]}
                      alt="shoeImage"
                      className={style.imageWrapper}
                    />
                    <div
                      className={style.prevButtonContainer}
                      onClick={() => handleCarousel("prev")}
                    >
                      <MdOutlineArrowBackIosNew
                        className={style.carouselIcons}
                      />
                    </div>

                    <div
                      className={style.nextButtonContainer}
                      onClick={() => handleCarousel("next")}
                    >
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
        <div className={style.contactSectionContainer}>
          <ContactFooter />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
