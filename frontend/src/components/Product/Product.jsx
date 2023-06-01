import React from "react";
import style from "./product.module.css";
const Product = ({ props }) => {
  return (
    <>
      <div className={style.productContainer}>
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
              Colors : &nbsp;{props.availableSize.length}
            </span>
          </div>
          <div className={style.shoePriceContainer}>
            <span className={style.shoeAmountText}>{props.price}&nbsp; Rs</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
