import React, { useState } from "react";
import style from "./checkout.module.css";
import Navbar from "../Navbar/Navbar";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import axios from "axios";
import baseUrl from "../Constant";
import Spinners from "../Spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
//razorpay_Doc = https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/
export const Checkout = React.memo(() => {
  // states, data needed to compute component
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
    if (checkAddress() === false) {
      toast.error(
        "Kindly complete all required information before proceeding",
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
          localStorage.removeItem("cartDetails");
          setAddress({
            country: "",
            fullName: "",
            mobileNumber: "",
            pincode: "",
            addressLine: "",
            landmark: "",
          });
          navigate("/orderDetails", { state: response.data });
        }
      }
    } catch (error) {
      console.log(error);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnlinePayment = async (amount) => {
    if (checkAddress() === false) {
      toast.error(
        "Kindly complete all required information before proceeding",
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
      const isUserLoggedIn = localStorage.getItem("isLoggedIn");
      if (isUserLoggedIn === "false") {
        navigate("/login", { state: currentState });
      }
      setIsLoading(true);
      const data = {
        amount,
      };
      const response = await axios.post(`${baseUrl}/payment/createOrder`, data);
      if (response.status === 200) {
        setIsLoading(false);
        handleOpenRazorpay(response.data);
      }
    } catch (error) {
      console.log(error, error.response);
      setIsLoading(false);
      toast.error("Oops! Something went wrong. Please try again later", {
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

  const handleOpenRazorpay = async (order) => {
    var options = {
      key: "rzp_test_uYsyA6UZFPgGxV",
      amount: Number(order.amount),
      currency: order.currency,
      name: "Nike Store",
      description: "Test Transaction",
      image:
        "http://res.cloudinary.com/djgouef8q/image/upload/v1689941580/vlquytreyljotsbsdfms.jpg",
      order_id: order.id,
      handler: async function (response) {
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

  const checkAddress = () => {
    const { country, fullName, mobileNumber, pincode, addressLine, landmark } =
      address;

    if (
      country === "" ||
      fullName === "" ||
      mobileNumber === "" ||
      pincode === "" ||
      addressLine === "" ||
      landmark === ""
    ) {
      return false;
    } else {
      return true;
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
                        <div
                          className={style.onlinePaymentWrapper}
                          onClick={() => handleOnlinePayment(totalAmount)}
                        >
                          <span className={style.paymentMethodText}>
                            Online Payment
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
        <ToastContainer />
      </div>
    </>
  );
});
