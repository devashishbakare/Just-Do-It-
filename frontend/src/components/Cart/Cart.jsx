import React, { useEffect, useState } from "react";
import style from "./cart.module.css";
import Navbar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import { RiDeleteBin6Line } from "react-icons/ri";
import baseUrl from "../Constant";
import Spinners from "../Spinners";
import Sign_in_up from "../Sign_in_up/Sign_in_up";
import axios from "axios";

const Cart = () => {
  //todo : to make the data persistance
  //complete : quantity : you can update by respose.data, whole state will not re-render only index will rendered
  //todo : totalSum : use logic of localStorage, if getItem is not there, it return a null use this in first few lines
  //todo : we have to check whether user is logged in or not, before we here to navigate
  // localStorage.setItem("cartSum");
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    const fetchCartProducts = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        console.log("can't we come here?");
        const response = await axios.get(`${baseUrl}/shoe/cartItems/${userId}`);
        if (response.status === 200) {
          console.log(response.data);
          setCartProducts(response.data);
        }

        let sum = 0;
        cartProducts.map((cartProduct) => {
          const quantity = cartProduct.cartItem.quantity;
          const price = cartProduct.cartItem.price;
          console.log("her im computing");
          sum += quantity * price;
        });
        localStorage.setItem("cartSum", sum);
        setTotalSum(sum);
      } catch (error) {
        console.log("Error in fetching cart product");
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchCartProducts();
  }, []);

  const handleQuantitySelection = async (
    quantity,
    cartId,
    cartProductIndex
  ) => {
    console.log(quantity + " " + cartId + " " + cartProductIndex);
    setIsLoading(true);

    if (cartProducts[cartProductIndex].cartItem.quantity > quantity) {
      let reduceCount =
        cartProducts[cartProductIndex].cartItem.quantity - quantity;
      let productPrice = cartProducts[cartProductIndex].cartItem.price;
      let updatedSum = reduceCount * productPrice;
      setTotalSum(totalSum - updatedSum);
    } else {
      let reduceCount =
        quantity - cartProducts[cartProductIndex].cartItem.quantity;
      let productPrice = cartProducts[cartProductIndex].cartItem.price;
      let updatedSum = reduceCount * productPrice;
      setTotalSum(totalSum + updatedSum);
    }
    const userId = localStorage.getItem("userId");
    try {
      const data = {
        userId,
        cartItemId: cartId,
        quantity,
      };

      const response = await axios.post(`${baseUrl}/shoe/updateQuantity`, data);

      if (response.status === 200) {
        setCartProducts((prevCart) => {
          const updateCart = [...prevCart];
          updateCart[cartProductIndex] = response.data[0];
          return updateCart;
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={style.cartContainer}>
        <div className={style.navBarContainer}>
          <Navbar />
        </div>
        <div className={style.cartHeadingText}>Cart</div>
        <div className={style.cartProductContainer}>
          <div className={style.productItemSummeryWrapper}>
            <div className={style.productItemWrapper}>
              {cartProducts.map((cartProduct, index) => (
                <>
                  <div
                    className={style.showProductCart}
                    key={index + "-" + cartProduct.cartItem._id}
                  >
                    <div className={style.cartProductImageWrapper}>
                      <img
                        src={cartProduct.productDetails.images[0]}
                        alt="shoe_image"
                        className={style.cartProductImag}
                      />
                    </div>
                    <div className={style.cartProductDetailsWrapper}>
                      <div className={style.headingAndPriceWrapper}>
                        <div className={style.cartProductName}>
                          {cartProduct.productDetails.name}
                        </div>
                        <div className={style.cartProductPrice}>
                          {cartProduct.productDetails.price} Rs
                        </div>
                      </div>
                      <span className={style.productTypeShoesNaming}>
                        {cartProduct.productDetails.shoes_type} Road{" "}
                        {cartProduct.productDetails.category} Shoes
                      </span>
                      <div className={style.productSizeAndColorWrapper}>
                        <span className={style.sizeText}>
                          Size : {cartProduct.cartItem.size} Uk
                        </span>
                        <span className={style.colorText}>
                          Color : &nbsp;
                          {
                            cartProduct.productDetails.availableColors[
                              cartProduct.cartItem.color
                            ]
                          }
                        </span>
                      </div>

                      <div className={style.quantityWrapper}>
                        <div className={style.increaseIcon}>
                          <span className={style.quantityText}>Quantity</span>
                          <select
                            onChange={(event) =>
                              handleQuantitySelection(
                                event.target.value,
                                cartProduct.cartItem._id,
                                index
                              )
                            }
                            className={style.quantitySelectionWrapper}
                            defaultValue={cartProduct.cartItem.quantity}
                            value={cartProduct.cartItem.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                          </select>
                        </div>

                        <span className={style.deleteIconWrapper}>
                          <RiDeleteBin6Line className={style.deleteCart} />
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className={style.summeryWrapper}>
              <div className={style.cartSummaryTextWrapper}>
                <div className={style.summeryHeadingText}>Summary</div>
                <div className={style.subTotalWrapper}>
                  <span className={style.leftWrap}>Subtotal </span>
                  <span className={style.rightWrap}>Rs : {totalSum}</span>
                </div>
                <div className={style.deliveryChargesWrapper}>
                  <span className={style.leftWrap}>
                    Estimated Delivery charge
                  </span>
                  <span className={style.rightWrap}>Free</span>
                </div>
                <div className={style.cartTotalAmountWrapper}>
                  <span className={style.leftWrap}>Total </span>
                  <span className={style.rightWrap}>Rs : {totalSum}</span>
                </div>
                <div className={style.summeryButton}>
                  <button className={style.summeryButtonText}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.contactSectionContainer}>
          <ContactFooter />
        </div>
      </div>
    </>
  );
};

export default Cart;
