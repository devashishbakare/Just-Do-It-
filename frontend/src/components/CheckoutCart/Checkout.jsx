import React, { useState } from "react";
import style from "./checkout.module.css";
import Navbar from "../Navbar/Navbar";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export const Checkout = () => {
  const [showMenu, setShowMenu] = useState(Array(2).fill(false));
  const handleShowButtonMenu = (index) => {
    setShowMenu((prevMenu) => {
      let prevMenuOptions = [...prevMenu];
      prevMenuOptions[index] = !prevMenuOptions[index];
      return prevMenuOptions;
    });
  };

  return (
    <>
      <div className={style.checkoutContainer}>
        <div className={style.navBarContainer}>
          <Navbar />
        </div>
        <div className={style.checkoutDetailsContainer}>
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
                        //onChange={handleChange}
                      />
                    </div>
                    {/* ********* */}
                    <div className={style.formInputAndTextWrapper}>
                      <span className={style.leftSideText}>Full Name :</span>
                      <input
                        type="text"
                        className={style.rightSideText}
                        placeholder="Enter your full name"
                        name="country"
                        //onChange={handleChange}
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
                        name="country"
                        //onChange={handleChange}
                      />
                    </div>
                    {/* ********* */}
                    <div className={style.formInputAndTextWrapper}>
                      <span className={style.leftSideText}>Pincode :</span>
                      <input
                        type="text"
                        className={style.rightSideText}
                        placeholder="Enter your pincode"
                        name="country"
                        //onChange={handleChange}
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
                        name="country"
                        //onChange={handleChange}
                      />
                    </div>

                    {/* ********* */}
                    <div className={style.formInputAndTextWrapper}>
                      <span className={style.leftSideText}>Landmark :</span>
                      <input
                        type="text"
                        className={style.rightSideText}
                        placeholder="Enter your landmark"
                        name="country"
                        //onChange={handleChange}
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
                      <span className={style.paymentAviailableText}>COD</span>
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
                <div className={style.summeryHeadingText}>Order Summary</div>
                <div className={style.subTotalWrapper}>
                  <span className={style.leftWrap}>Subtotal </span>
                  <span className={style.rightWrap}>Rs : 100003</span>
                </div>
                <div className={style.deliveryChargesWrapper}>
                  <span className={style.leftWrap}>
                    Estimated Delivery charge
                  </span>
                  <span className={style.rightWrap}>Free</span>
                </div>
                <div className={style.cartTotalAmountWrapper}>
                  <span className={style.leftWrap}>Total </span>
                  <span className={style.rightWrap}>Rs : 100003</span>
                </div>
                <div className={style.summeryButton}>
                  <button className={style.summeryButtonText}>
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* todo : we have to add contact section here */}
        </div>
      </div>
    </>
  );
};
