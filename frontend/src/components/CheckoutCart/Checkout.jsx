import React, { useState } from "react";
import style from "./checkout.module.css";
import Navbar from "../Navbar/Navbar";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import axios from "axios";
import baseUrl from "../Constant";
import Spinners from "../Spinners";
import { useNavigate } from "react-router-dom";
//razorpay_Doc = https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/
export const Checkout = React.memo(() => {
  const [isLoding, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(Array(2).fill(false));
  const totalAmount = parseInt(localStorage.getItem("cartSum"), 10);
  const currentState = { from: window.location.pathname };
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

  const handleOnlinePayment = async (amount) => {
    try {
      const isUserLoggedIn = localStorage.getItem("isLoggedIn");
      if (isUserLoggedIn == "false") {
        navigate("/login", { state: currentState });
      }
      const data = {
        amount,
      };
      const response = await axios.post(`${baseUrl}/payment/createOrder`, data);
      if (response.status === 200) {
        console.log("order Id", response.data);
        handleOpenRazorpay(response.data);
      }
    } catch (error) {
      //todo : add notification here for something went wrong with online payment, try again later
      console.log(error, error.response);
    }
  };

  const handleOpenRazorpay = async (order) => {
    var options = {
      key: "rzp_test_uYsyA6UZFPgGxV", // Enter the Key ID generated from the Dashboard
      amount: Number(order.amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Nike Store",
      description: "Test Transaction",
      image:
        "http://res.cloudinary.com/djgouef8q/image/upload/v1689941580/vlquytreyljotsbsdfms.jpg",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        console.log(response, 121);
        const data = {
          order_id: order.id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          razorpay_payment_id: response.razorpay_payment_id,
        };
        const responseForVarification = await axios.post(
          `${baseUrl}/payment/verify`,
          data
        );
        if (responseForVarification.status === 200) {
          handlePlaceOrder();
        } else {
          //todo : add notification like something went wrong
        }
      },
      prefill: {
        name: "Devashish Bakare",
        email: "devashishbakare@gmail.com",
        contact: "7774816727",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp = new window.Razorpay(options);
    rzp.open();
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
                        <div
                          className={style.onlinePaymentWrapper}
                          onClick={() => handleOnlinePayment(totalAmount)}
                        >
                          <span className={style.paymentMethodText}>
                            Online Payment
                          </span>
                        </div>
                        {/* <div className={style.paymentMethodBox}>
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
                        </div> */}
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
