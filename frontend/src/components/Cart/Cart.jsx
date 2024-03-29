import React, { useContext, useEffect, useState } from "react";
import style from "./cart.module.css";
import Navbar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import { RiDeleteBin6Line } from "react-icons/ri";
import baseUrl from "../Constant";
import Spinners from "../Spinners";
import SignInUp from "../Sign_in_up/Sign_in_up";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartCountContext from "../CartCountContext";
const Cart = () => {
  // sum of cart
  let storeCartSum = parseInt(localStorage.getItem("cartSum"), 10);
  const [cartSum, setCartSum] = useState(
    storeCartSum === null ? 0 : storeCartSum
  );

  const navigate = useNavigate();
  const { setCartCount } = useContext(CartCountContext);

  //fatching login status
  const LoginStatus = localStorage.getItem("isLoggedIn");
  const [showLoginForm, setShowLoginForm] = useState(
    LoginStatus === "false" ? false : true
  );

  // states
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
        //console.log("can I come here 2");
        const response = await axios.get(`${baseUrl}/shoe/cartItems`, config);
        if (response.status === 200) {
          let sum = 0;
          for (let index in response.data) {
            let cartProduct = response.data[index];
            const quantity = cartProduct.cartItem.quantity;
            const price = cartProduct.productDetails.price;
            sum += quantity * price;
            //console.log("index " + index);
          }

          localStorage.setItem("cartSum", sum);
          setCartProducts(response.data);
          setCartSum(sum);
        }
      } catch (error) {
        //console.log("Error in fetching cart product");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartProducts();
    // console.log("rending count");
  }, [showLoginForm]);

  //updating when user gets sign-in/up
  const handleLoginStatusUpdate = (status) => {
    setShowLoginForm(status);
  };

  // handleing quantity updaes
  const handleQuantitySelection = async (quantity, cartId, index) => {
    let productOldQuantity = cartProducts[index].cartItem.quantity;
    let productPrice = cartProducts[index].cartItem.price;
    if (quantity > productOldQuantity) {
      let diffrence = quantity - productOldQuantity;
      let amountIncreaseBy = diffrence * productPrice;
      let storeSum = parseInt(localStorage.getItem("cartSum", 10));
      let updatedSum = storeSum + amountIncreaseBy;
      localStorage.setItem("cartSum", updatedSum);
      setCartSum(updatedSum);
    } else {
      let diffrence = productOldQuantity - quantity;
      let amountIncreaseBy = diffrence * productPrice;
      let storeSum = parseInt(localStorage.getItem("cartSum", 10));
      let updatedSum = storeSum - amountIncreaseBy;
      localStorage.setItem("cartSum", updatedSum);
      setCartSum(updatedSum);
    }

    const token = localStorage.getItem("token");
    try {
      const data = {
        token,
        cartItemId: cartId,
        quantity,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${baseUrl}/shoe/updateQuantity`,
        data,
        config
      );

      if (response.status === 200) {
        setCartProducts((prevCart) => {
          const updateCart = [...prevCart];
          updateCart[index] = response.data[0];
          return updateCart;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handeling cart product deletion
  const handleCartProductDeletion = async (indexToRemove) => {
    try {
      const token = localStorage.getItem("token");
      const cartItemId = cartProducts[indexToRemove].cartItem._id;

      const data = {
        cartItemId,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        data: data,
      };

      const response = await axios.delete(
        `${baseUrl}/shoe/deleteCartItem`,
        config
      );
      if (response.status === 200) {
        let productOldQuantity = cartProducts[indexToRemove].cartItem.quantity;
        let productPrice = cartProducts[indexToRemove].cartItem.price;
        let removeSum = productOldQuantity * productPrice;
        let oldCartSum = parseInt(localStorage.getItem("cartSum"), 10);
        let currCartSum = oldCartSum - removeSum;
        localStorage.setItem("cartSum", currCartSum);
        setCartSum(currCartSum);
        const updatedCartProducts = cartProducts.filter(
          (cartProduct, index) => {
            return index !== indexToRemove;
          }
        );
        setCartProducts(updatedCartProducts);
        setCartCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      // console.log("error in deleting cart");
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
  };

  // moving for checkout
  const handleCheckout = () => {
    localStorage.setItem("cartDetails", JSON.stringify(cartProducts));
    navigate("/checkout");
  };

  return (
    <>
      {showLoginForm === false ? (
        <>
          <div className={style.loginComponentWrapper}>
            <SignInUp updateChange={handleLoginStatusUpdate} />
          </div>
        </>
      ) : (
        <>
          <div className={style.cartContainer}>
            <div className={style.navBarContainer}>
              <Navbar />
            </div>
            {isLoading === true ? (
              <>
                <div className={style.centerSpinnerWrapper}>
                  <Spinners />
                </div>
              </>
            ) : (
              <>
                <div className={style.cartHeadingText}>Cart</div>
                <div className={style.cartProductContainer}>
                  {cartProducts.length > 0 ? (
                    <>
                      <div className={style.productItemSummeryWrapper}>
                        <div className={style.productItemWrapper}>
                          {cartProducts.map((cartProduct, index) => (
                            <>
                              <div
                                className={style.showProductCart}
                                key={index + "key" + cartProduct.cartItem._id}
                              >
                                <div className={style.cartProductImageWrapper}>
                                  <img
                                    src={cartProduct.productDetails.images[0]}
                                    alt="shoe_image"
                                    className={style.cartProductImag}
                                  />
                                </div>
                                <div
                                  className={style.cartProductDetailsWrapper}
                                >
                                  <div className={style.headingAndPriceWrapper}>
                                    <div className={style.cartProductName}>
                                      {cartProduct.productDetails.name}
                                    </div>
                                    <div className={style.cartProductPrice}>
                                      {cartProduct.productDetails.price} Rs
                                    </div>
                                  </div>
                                  <span
                                    className={style.productTypeShoesNaming}
                                  >
                                    {cartProduct.productDetails.shoes_type} Road{" "}
                                    {cartProduct.productDetails.category} Shoes
                                  </span>
                                  <div
                                    className={style.productSizeAndColorWrapper}
                                  >
                                    <span className={style.sizeText}>
                                      Size :{" "}
                                      {
                                        cartProduct.productDetails
                                          .availableSize[
                                          cartProduct.cartItem.size
                                        ]
                                      }{" "}
                                      Uk
                                    </span>
                                    <span className={style.colorText}>
                                      Color : &nbsp;
                                      {
                                        cartProduct.productDetails
                                          .availableColors[
                                          cartProduct.cartItem.color
                                        ]
                                      }
                                    </span>
                                  </div>

                                  <div className={style.quantityWrapper}>
                                    <div className={style.increaseIcon}>
                                      <span className={style.quantityText}>
                                        Quantity
                                      </span>
                                      <select
                                        onChange={(event) =>
                                          handleQuantitySelection(
                                            event.target.value,
                                            cartProduct.cartItem._id,
                                            index
                                          )
                                        }
                                        className={
                                          style.quantitySelectionWrapper
                                        }
                                        defaultValue={
                                          cartProduct.cartItem.quantity
                                        }
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

                                    <span
                                      className={style.deleteIconWrapper}
                                      onClick={() =>
                                        handleCartProductDeletion(index)
                                      }
                                    >
                                      <RiDeleteBin6Line
                                        className={style.deleteCart}
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>

                        <div className={style.summeryWrapper}>
                          <div className={style.cartSummaryTextWrapper}>
                            <div className={style.summeryHeadingText}>
                              Summary
                            </div>
                            <div className={style.subTotalWrapper}>
                              <span className={style.leftWrap}>Subtotal </span>
                              <span className={style.rightWrap}>
                                Rs : {cartSum}
                              </span>
                            </div>
                            <div className={style.deliveryChargesWrapper}>
                              <span className={style.leftWrap}>
                                Estimated Delivery charge
                              </span>
                              <span className={style.rightWrap}>Free</span>
                            </div>
                            <div className={style.cartTotalAmountWrapper}>
                              <span className={style.leftWrap}>Total </span>
                              <span className={style.rightWrap}>
                                Rs : {cartSum}
                              </span>
                            </div>
                            <div className={style.summeryButton}>
                              <button
                                className={style.summeryButtonText}
                                onClick={handleCheckout}
                              >
                                Checkout
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={style.noCartBoardContainer}>
                        <span className={style.noElementInCart}>
                          Cart is currently empty. Add some shoes to get
                          started!
                        </span>
                        <button
                          className={style.eseentialsShopButton}
                          onClick={() => navigate("/shop")}
                        >
                          Shop
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            <div className={style.contactSectionContainer}>
              <ContactFooter />
            </div>
            <ToastContainer />
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
