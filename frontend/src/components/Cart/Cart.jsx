import React from "react";
import style from "./cart.module.css";
import Navbar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import { RiDeleteBin6Line } from "react-icons/ri";
const Cart = () => {
  const handleQuantitySelection = (event) => {
    console.log(event.target.value);
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
              <div className={style.showProductCart}>
                <div className={style.cartProductImageWrapper}>
                  <img
                    src="https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/7e65ca39-7f9d-4542-a7bf-a093ec642800/air-max-tw-shoes-1sPZb3.png"
                    alt="shoe_image"
                    className={style.cartProductImag}
                  />
                </div>
                <div className={style.cartProductDetailsWrapper}>
                  <div className={style.headingAndPriceWrapper}>
                    <div className={style.cartProductName}>
                      Nike Air Force A1
                    </div>
                    <div className={style.cartProductPrice}>10799 Rs</div>
                  </div>
                  <span className={style.productTypeShoesNaming}>
                    Men's Road Running Shoes
                  </span>
                  <div className={style.productSizeAndColorWrapper}>
                    <span className={style.sizeText}>Size : 7 Uk</span>
                    <span className={style.colorText}>Color : Orange</span>
                  </div>
                  <div className={style.quantityWrapper}>
                    <div className={style.increaseIcon}>
                      <span className={style.quantityText}>Quantity</span>
                      <select
                        onChange={handleQuantitySelection}
                        className={style.quantitySelectionWrapper}
                      >
                        <option value="2">1</option>
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
              {/* *************************** Separator ************************** */}
              <div className={style.showProductCart}>
                <div className={style.cartProductImageWrapper}>
                  <img
                    src="https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/7e65ca39-7f9d-4542-a7bf-a093ec642800/air-max-tw-shoes-1sPZb3.png"
                    alt="shoe_image"
                    className={style.cartProductImag}
                  />
                </div>
                <div className={style.cartProductDetailsWrapper}>
                  <div className={style.headingAndPriceWrapper}>
                    <div className={style.cartProductName}>
                      Nike Air Force A1
                    </div>
                    <div className={style.cartProductPrice}>10799 Rs</div>
                  </div>
                  <span className={style.productTypeShoesNaming}>
                    Men's Road Running Shoes
                  </span>
                  <div className={style.productSizeAndColorWrapper}>
                    <span className={style.sizeText}>Size : 7 Uk</span>
                    <span className={style.colorText}>Color : Orange</span>
                  </div>
                  <div className={style.quantityWrapper}>
                    <div className={style.increaseIcon}>
                      <span className={style.quantityText}>Quantity</span>
                      <select
                        onChange={handleQuantitySelection}
                        className={style.quantitySelectionWrapper}
                      >
                        <option value="2">1</option>
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
              {/* *************************** Separator ************************** */}
              <div className={style.showProductCart}>
                <div className={style.cartProductImageWrapper}>
                  <img
                    src="https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/7e65ca39-7f9d-4542-a7bf-a093ec642800/air-max-tw-shoes-1sPZb3.png"
                    alt="shoe_image"
                    className={style.cartProductImag}
                  />
                </div>
                <div className={style.cartProductDetailsWrapper}>
                  <div className={style.headingAndPriceWrapper}>
                    <div className={style.cartProductName}>
                      Nike Air Force A1
                    </div>
                    <div className={style.cartProductPrice}>10799 Rs</div>
                  </div>
                  <span className={style.productTypeShoesNaming}>
                    Men's Road Running Shoes
                  </span>
                  <div className={style.productSizeAndColorWrapper}>
                    <span className={style.sizeText}>Size : 7 Uk</span>
                    <span className={style.colorText}>Color : Orange</span>
                  </div>
                  <div className={style.quantityWrapper}>
                    <div className={style.increaseIcon}>
                      <span className={style.quantityText}>Quantity</span>
                      <select
                        onChange={handleQuantitySelection}
                        className={style.quantitySelectionWrapper}
                      >
                        <option value="2">1</option>
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
              {/* *************************** Separator ************************** */}
              <div className={style.showProductCart}>
                <div className={style.cartProductImageWrapper}>
                  <img
                    src="https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/7e65ca39-7f9d-4542-a7bf-a093ec642800/air-max-tw-shoes-1sPZb3.png"
                    alt="shoe_image"
                    className={style.cartProductImag}
                  />
                </div>
                <div className={style.cartProductDetailsWrapper}>
                  <div className={style.headingAndPriceWrapper}>
                    <div className={style.cartProductName}>
                      Nike Air Force A1
                    </div>
                    <div className={style.cartProductPrice}>10799 Rs</div>
                  </div>
                  <span className={style.productTypeShoesNaming}>
                    Men's Road Running Shoes
                  </span>
                  <div className={style.productSizeAndColorWrapper}>
                    <span className={style.sizeText}>Size : 7 Uk</span>
                    <span className={style.colorText}>Color : Orange</span>
                  </div>
                  <div className={style.quantityWrapper}>
                    <div className={style.increaseIcon}>
                      <span className={style.quantityText}>Quantity</span>
                      <select
                        onChange={handleQuantitySelection}
                        className={style.quantitySelectionWrapper}
                      >
                        <option value="2">1</option>
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
            </div>
            <div className={style.summeryWrapper}>
              <div className={style.cartSummaryTextWrapper}>
                <div className={style.summeryHeadingText}>Summary</div>
                <div className={style.subTotalWrapper}>
                  <span className={style.leftWrap}>Subtotal </span>
                  <span className={style.rightWrap}>Rs : 24,385</span>
                </div>
                <div className={style.deliveryChargesWrapper}>
                  <span className={style.leftWrap}>
                    Estimated Delivery charge
                  </span>
                  <span className={style.rightWrap}>Free</span>
                </div>
                <div className={style.cartTotalAmountWrapper}>
                  <span className={style.leftWrap}>Total </span>
                  <span className={style.rightWrap}>Rs : 24,385</span>
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
