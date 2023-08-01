import React from "react";
import style from "./product.module.css";
import { useNavigate } from "react-router-dom";
const Product = React.memo(({ props }) => {
  const navigate = useNavigate();
  // setting up data to be render for product detail view"
  const handleProductDetailsClick = () => {
    localStorage.setItem("productDetails", JSON.stringify(props));
    navigate("/productDetails", { state: props });
  };
  return (
    <>
      <div
        className={style.productContainer}
        onClick={handleProductDetailsClick}
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
