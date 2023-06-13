import React, { useState } from "react";
import style from "./product.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsMinecart, BsHeart } from "react-icons/bs";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
const Product = ({ props }) => {
  const [showProductFlag, setShowProductFlag] = useState(false);
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
              &nbsp; shoes
            </span>
            <span className={style.shoeColorCount}>
              Colors : &nbsp;{props.availableColors.length}
            </span>
          </div>
          <div className={style.shoePriceContainer}>
            <span className={style.shoeAmountText}>{props.price}&nbsp; Rs</span>
          </div>
        </div>
      </div>
      {showProductFlag && (
        <>
          <div className={style.productDesciptionContainer}>
            <div className={style.productDescriptionTable}>
              <div className={style.closureSection}>
                <AiFillCloseCircle
                  className={style.closeButton}
                  onClick={() => setShowProductFlag(!showProductFlag)}
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
                        &nbsp; shoes
                      </span>
                    </div>
                    <div className={style.showProductShoePriceContainer}>
                      <span className={style.showProductShoeAmountText}>
                        {props.price}&nbsp; Rs
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
                      {props.availableColors.map((color) => (
                        <>
                          <div
                            className={style.colorDiv}
                            style={{ backgroundColor: color }}
                          ></div>
                        </>
                      ))}
                    </div>
                  </div>
                  <div className={style.availableSizeWrapper}>
                    <span className={style.sizeText}>Available Size</span>
                    <div className={style.showSizeContainer}>
                      {props.availableSize.map((size) => (
                        <>
                          <div className={style.shoeSizeWrapper}>
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
