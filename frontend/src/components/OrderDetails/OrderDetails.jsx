import React from "react";
import style from "./orderDetails.module.css";
import Navbar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
export const OrderDetails = () => {
  return (
    <>
      <div className={style.orderDetailsContainer}>
        <div className={style.navBarContainer}>
          <Navbar />
        </div>
        <div className={style.contentContainer}>
          <div className={style.productsWrapper}>
            {/* **************************** */}
            <div className={style.showProductCart}>
              <div className={style.cartProductImageWrapper}>
                <img
                  src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/8b8054bd-e5e4-4c0d-9c6b-79c57367b041/nike-just-do-it.jpg"
                  alt="shoe_image"
                  className={style.cartProductImag}
                />
              </div>
              <div className={style.cartProductDetailsWrapper}>
                <div className={style.headingAndPriceWrapper}>
                  <div className={style.cartProductName}>Nike jorden 1X3K</div>
                  <div className={style.cartProductPrice}>10054 Rs</div>
                </div>
                <span className={style.productTypeShoesNaming}>
                  mens Road Running Shoes
                </span>
                <div className={style.productSizeAndColorWrapper}>
                  <span className={style.sizeText}>Size : 8 Uk</span>
                  <span className={style.colorText}>Color : &nbsp; Orange</span>
                </div>

                <div className={style.quantityWrapper}>
                  <div className={style.increaseIcon}>
                    <span className={style.quantityText}>Quantity</span>
                    <span className={style.quantityText}>2</span>
                  </div>
                </div>
              </div>
            </div>
            {/* **************************** */}
            <div className={style.showProductCart}>
              <div className={style.cartProductImageWrapper}>
                <img
                  src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/8b8054bd-e5e4-4c0d-9c6b-79c57367b041/nike-just-do-it.jpg"
                  alt="shoe_image"
                  className={style.cartProductImag}
                />
              </div>
              <div className={style.cartProductDetailsWrapper}>
                <div className={style.headingAndPriceWrapper}>
                  <div className={style.cartProductName}>Nike jorden 1X3K</div>
                  <div className={style.cartProductPrice}>10054 Rs</div>
                </div>
                <span className={style.productTypeShoesNaming}>
                  mens Road Running Shoes
                </span>
                <div className={style.productSizeAndColorWrapper}>
                  <span className={style.sizeText}>Size : 8 Uk</span>
                  <span className={style.colorText}>Color : &nbsp; Orange</span>
                </div>

                <div className={style.quantityWrapper}>
                  <div className={style.increaseIcon}>
                    <span className={style.quantityText}>Quantity</span>
                    <span className={style.quantityText}>2</span>
                  </div>
                </div>
              </div>
            </div>
            {/* **************************** */}
            <div className={style.showProductCart}>
              <div className={style.cartProductImageWrapper}>
                <img
                  src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/8b8054bd-e5e4-4c0d-9c6b-79c57367b041/nike-just-do-it.jpg"
                  alt="shoe_image"
                  className={style.cartProductImag}
                />
              </div>
              <div className={style.cartProductDetailsWrapper}>
                <div className={style.headingAndPriceWrapper}>
                  <div className={style.cartProductName}>Nike jorden 1X3K</div>
                  <div className={style.cartProductPrice}>10054 Rs</div>
                </div>
                <span className={style.productTypeShoesNaming}>
                  mens Road Running Shoes
                </span>
                <div className={style.productSizeAndColorWrapper}>
                  <span className={style.sizeText}>Size : 8 Uk</span>
                  <span className={style.colorText}>Color : &nbsp; Orange</span>
                </div>

                <div className={style.quantityWrapper}>
                  <div className={style.increaseIcon}>
                    <span className={style.quantityText}>Quantity</span>
                    <span className={style.quantityText}>2</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.productOrderAddressWrapper}>
              <span className={style.productOrderAddressHeadingText}>
                Delivery Address
              </span>
              <span className={style.productOrderTopAddressHeading}>
                Country
              </span>
              <span className={style.productOrderAddressOutput}>India</span>
              {/*  */}
              <span className={style.productOrderTopAddressHeading}>
                Full Name
              </span>
              <span className={style.productOrderAddressOutput}>
                Devashish Bakare
              </span>
              {/*  */}
              <span className={style.productOrderTopAddressHeading}>
                Mobile Number
              </span>
              <span className={style.productOrderAddressOutput}>
                7774816727
              </span>
              {/*  */}
              <span className={style.productOrderTopAddressHeading}>
                Pincode
              </span>
              <span className={style.productOrderAddressOutput}>422605</span>
              {/*  */}
              <span className={style.productOrderTopAddressHeading}>
                Address Line
              </span>
              <span className={style.productOrderAddressOutput}>
                Raj Apartment, Shivaji Nager, Pune
              </span>
              {/*  */}
              <span className={style.productOrderTopAddressHeading}>
                Landmark
              </span>
              <span className={style.productOrderAddressOutput}>
                Near Police Station
              </span>
            </div>
          </div>

          <div className={style.priceAndAddressWrapper}>
            <div className={style.orderPlacePriceBox}>
              <div className={style.cartSummaryTextWrapper}>
                <div className={style.summeryHeadingText}>Order Details</div>
                <div className={style.subTotalWrapper}>
                  <span className={style.leftWrap}>Subtotal </span>
                  <span className={style.rightWrap}>Rs : 10054</span>
                </div>
                <div className={style.deliveryChargesWrapper}>
                  <span className={style.leftWrap}>
                    Estimated Delivery charge
                  </span>
                  <span className={style.rightWrap}>Free</span>
                </div>
                <div className={style.cartTotalAmountWrapper}>
                  <span className={style.leftWrap}>Total </span>
                  <span className={style.rightWrap}>Rs : 10054</span>
                </div>
                <div className={style.summeryButton}>
                  <button className={style.summeryButtonText}>
                    Cancle Order
                  </button>
                </div>
              </div>
            </div>
            <div className={style.orderAddressWrapper}>
              <span className={style.addressHeadingText}>Delivery Address</span>
              <span className={style.topAddressHeading}>Country</span>
              <span className={style.addressOutput}>India</span>
              {/*  */}
              <span className={style.topAddressHeading}>Full Name</span>
              <span className={style.addressOutput}>Devashish Bakare</span>
              {/*  */}
              <span className={style.topAddressHeading}>Mobile Number</span>
              <span className={style.addressOutput}>7774816727</span>
              {/*  */}
              <span className={style.topAddressHeading}>Pincode</span>
              <span className={style.addressOutput}>422605</span>
              {/*  */}
              <span className={style.topAddressHeading}>Address Line</span>
              <span className={style.addressOutput}>
                Raj Apartment, Shivaji Nager, Pune
              </span>
              {/*  */}
              <span className={style.topAddressHeading}>Landmark</span>
              <span className={style.addressOutput}>Near Police Station</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
