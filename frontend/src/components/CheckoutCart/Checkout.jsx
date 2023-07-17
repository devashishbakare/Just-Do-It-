import React, { useState } from "react";
import style from "./checkout.module.css";
import Navbar from "../Navbar/Navbar";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import axios from "axios";
import baseUrl from "../Constant";
import Spinners from "../Spinners";
import { useNavigate } from "react-router-dom";
export const Checkout = React.memo(() => {
  const [isLoding, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(Array(2).fill(false));
  const totalAmount = parseInt(localStorage.getItem("cartSum"), 10);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    country: "",
    fullName: "",
    mobileNumber: "",
    pincode: "",
    addressLine: "",
    landmark: "",
  });

  const handleChange = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };

  const handleShowButtonMenu = (index) => {
    setShowMenu((prevMenu) => {
      let prevMenuOptions = [...prevMenu];
      prevMenuOptions[index] = !prevMenuOptions[index];
      return prevMenuOptions;
    });
  };

  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);
      let addAddress = await axios.post(`${baseUrl}/shoe/addAddress`, address);
      let addressId;
      if (addAddress.status === 200) {
        addressId = addAddress.data;
      }
      if (addressId) {
        const token = localStorage.getItem("token");
        const cartItemIds = JSON.parse(localStorage.getItem("cartDetails"));

        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };

        const data = {
          cartItemIds,
          addressId,
          paymentMethod: "COD",
          totalAmount,
        };
        const response = await axios.post(
          `${baseUrl}/shoe/placeOrder`,
          data,
          config
        );
        if (response.status === 200) {
          //todo : navigate to the page of viewOrder details, where user can delete the order
          //todo : on right side of page you have to add the cancle order
          localStorage.removeItem("cartDetails");
          setAddress({
            country: "",
            fullName: "",
            mobileNumber: "",
            pincode: "",
            addressLine: "",
            landmark: "",
          });

          //todo : navigate to order details page
          console.log("all good");
          navigate("/orderDetails", { state: response.data });
        }
      }
    } catch (error) {
      console.log(error);
      console.log("Error in placing order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={style.checkoutContainer}>
        <div className={style.navBarContainer}>
          <Navbar />
        </div>
        <div className={style.checkoutDetailsContainer}>
          {isLoding === true ? (
            <>
              <Spinners />
            </>
          ) : (
            <>
              <div className={style.orderSummeryText}>Checkout</div>
              <div className={style.checkoutWidthCenterWrapper}>
                <div className={style.orderSummeryWrapper}>
                  <div
                    className={style.sliderBarContainer}
                    onClick={() => handleShowButtonMenu(0)}
                  >
                    <span className={style.leftText}>Delivery Address</span>
                    {showMenu[0] === false ? (
                      <>
                        <span className={style.rightText}>
                          <MdArrowDropDown className={style.arrowCss} />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={style.rightText}>
                          <MdArrowDropUp className={style.arrowCss} />
                        </span>
                      </>
                    )}
                  </div>
                  {showMenu[0] === true && (
                    <>
                      <div className={style.addressDetailsContainer}>
                        {/* ********* */}
                        <div className={style.formInputAndTextWrapper}>
                          <span className={style.leftSideText}>Country :</span>
                          <input
                            type="text"
                            className={style.rightSideText}
                            placeholder="Enter your country"
                            name="country"
                            onChange={handleChange}
                          />
                        </div>
                        {/* ********* */}
                        <div className={style.formInputAndTextWrapper}>
                          <span className={style.leftSideText}>
                            Full Name :
                          </span>
                          <input
                            type="text"
                            className={style.rightSideText}
                            placeholder="Enter your full name"
                            name="fullName"
                            onChange={handleChange}
                          />
                        </div>
                        {/* ********* */}
                        <div className={style.formInputAndTextWrapper}>
                          <span className={style.leftSideText}>
                            Mobile Number :
                          </span>
                          <input
                            type="text"
                            className={style.rightSideText}
                            placeholder="Enter your mobile number"
                            name="mobileNumber"
                            onChange={handleChange}
                          />
                        </div>
                        {/* ********* */}
                        <div className={style.formInputAndTextWrapper}>
                          <span className={style.leftSideText}>Pincode :</span>
                          <input
                            type="text"
                            className={style.rightSideText}
                            placeholder="Enter your pincode"
                            name="pincode"
                            onChange={handleChange}
                          />
                        </div>
                        {/* ********* */}
                        <div className={style.formInputAndTextWrapper}>
                          <span className={style.leftSideText}>
                            Flat, House No, Building, Company, Apartment
                          </span>
                          <input
                            type="text"
                            className={style.rightSideText}
                            placeholder="Enter your  Flat, House No, Building, Company, Apartment"
                            name="addressLine"
                            onChange={handleChange}
                          />
                        </div>

                        {/* ********* */}
                        <div className={style.formInputAndTextWrapper}>
                          <span className={style.leftSideText}>Landmark :</span>
                          <input
                            type="text"
                            className={style.rightSideText}
                            placeholder="Enter your landmark"
                            name="landmark"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div
                    className={style.sliderBarContainer}
                    onClick={() => handleShowButtonMenu(1)}
                  >
                    <span className={style.leftText}>Payment Details</span>
                    {showMenu[1] === false ? (
                      <>
                        <span className={style.rightText}>
                          <MdArrowDropDown className={style.arrowCss} />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={style.rightText}>
                          <MdArrowDropUp className={style.arrowCss} />
                        </span>
                      </>
                    )}
                  </div>
                  {showMenu[1] === true && (
                    <>
                      <div className={style.paymentMethodContainer}>
                        <div className={style.paymentAviailableBox}>
                          <span className={style.paymentAviailableText}>
                            COD
                          </span>
                        </div>
                        <div className={style.paymentMethodBox}>
                          <span className={style.paymentMethodText}>UPI</span>
                        </div>
                        <div className={style.paymentMethodBox}>
                          <span className={style.paymentMethodText}>
                            Credit Card
                          </span>
                        </div>
                        <div className={style.paymentMethodBox}>
                          <span className={style.paymentMethodText}>
                            Debit Card
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className={style.orderSummeryPriceWrapper}>
                  <div className={style.cartSummaryTextWrapper}>
                    <div className={style.summeryHeadingText}>
                      Order Summary
                    </div>
                    <div className={style.subTotalWrapper}>
                      <span className={style.leftWrap}>Subtotal </span>
                      <span className={style.rightWrap}>
                        Rs : {totalAmount}
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
                        Rs : {totalAmount}
                      </span>
                    </div>
                    <div className={style.summeryButton}>
                      <button
                        className={style.summeryButtonText}
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* todo : we have to add contact section here */}
        </div>
      </div>
    </>
  );
});
