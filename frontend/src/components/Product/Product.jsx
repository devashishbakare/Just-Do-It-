import React, { useState } from "react";
import style from "./product.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsMinecart, BsHeart } from "react-icons/bs";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
const Product = ({ props }) => {
  /*
   In this we can use if else?
  */
  const [selectedColor, setSelectedColor] = useState(-1);
  const [selecttedSize, setSelectedSize] = useState(-1);
  const [showProductFlag, setShowProductFlag] = useState(false);
  const [notificationBar, setNotificationBar] = useState(false);

  const handleCloseModal = () => {
    setShowProductFlag(!showProductFlag);
    setSelectedColor(-1);
    setSelectedSize(-1);
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
            {notificationBar === false && (
              <>
                <div className={style.notificationContainer}>
                  <div className={style.extraInfoContainer}>
                    <div className={style.headingWrapper}>
                      <span
                        className={`${style.notificationTextStyle} ${style.textUpdatedDiv}`}
                      >
                        Added To --Cart Or Favorite --
                      </span>
                    </div>
                    <div className={style.closeButtonWrapper}>
                      <span className={style.closeNotificationWrapper}>
                        <AiFillCloseCircle
                          className={style.closeButton}
                          onClick={() => setNotificationBar(!notificationBar)}
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
                    <div className={style.buttonWrapper}>
                      <span className={style.buttonText}>Add To Cart</span>
                      <BsMinecart className={style.buttonText} />
                    </div>
                    <div className={style.buttonWrapper}>
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
