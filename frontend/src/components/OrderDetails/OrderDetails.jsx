import React, { useEffect, useState } from "react";
import style from "./orderDetails.module.css";
import Navbar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import baseUrl from "../Constant";
import Spinners from "../Spinners";
export const OrderDetails = React.memo(() => {
  const location = useLocation();
  const orderId = location.state;
  console.log("orderId", orderId);
  const userId = localStorage.getItem("userId");
  console.log("userId!!! " + userId);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("is Loggd in " + isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [orderItems, setOrderItems] = useState({});

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        console.log("here we go!!!");
        const userId = localStorage.getItem("userId");
        const config = {
          userId,
        };
        //deleting cart item, after placing order
        const deleteCartItem = await axios.delete(
          `${baseUrl}/shoe/deleteAllCartItems`,
          { data: config }
        );
        //fetching data from orderId
        const orderDetails = await axios.get(
          `${baseUrl}/shoe/orderDetails?userId=${userId}&orderId=${orderId}`
        );

        if (deleteCartItem.status === 200 && orderDetails.status === 200) {
          console.log("here we are setting data");
          console.log(orderDetails.data);

          setOrderItems(orderDetails.data);
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Something went wrong, please try agian later");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <>
      <div className={style.orderDetailsContainer}>
        <div className={style.navBarContainer}>
          <Navbar />
        </div>
        <div className={style.contentContainer}>
          {isLoading === true ? (
            <>
              <Spinners />
            </>
          ) : (
            <>
              <div className={style.productsWrapper}>
                {/* **************************** */}
                {orderItems.cartItemDetails.map((orderItem, index) => (
                  <>
                    <div
                      className={style.showProductCart}
                      key={"orderDetails" + index}
                    >
                      <div className={style.cartProductImageWrapper}>
                        <img
                          src={orderItem.productInfo.images[0]}
                          alt="shoe_image"
                          className={style.cartProductImag}
                        />
                      </div>
                      <div className={style.cartProductDetailsWrapper}>
                        <div className={style.headingAndPriceWrapper}>
                          <div className={style.cartProductName}>
                            {orderItem.productInfo.name}
                          </div>
                          <div className={style.cartProductPrice}>
                            {orderItem.price} Rs
                          </div>
                        </div>
                        <span className={style.productTypeShoesNaming}>
                          {orderItem.productInfo.shoes_type}{" "}
                          {orderItem.productInfo.category} shoe
                        </span>
                        <div className={style.productSizeAndColorWrapper}>
                          <span className={style.sizeText}>
                            Size :{" "}
                            {
                              orderItem.productInfo.availableSize[
                                orderItem.size
                              ]
                            }{" "}
                            Uk
                          </span>
                          <span className={style.colorText}>
                            Color : &nbsp;{" "}
                            {
                              orderItem.productInfo.availableColors[
                                orderItem.color
                              ]
                            }
                          </span>
                        </div>

                        <div className={style.quantityWrapper}>
                          <div className={style.increaseIcon}>
                            <span className={style.quantityText}>Quantity</span>
                            <span className={style.quantityText}>
                              {orderItem.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}

                <div className={style.productOrderAddressWrapper}>
                  <span className={style.productOrderAddressHeadingText}>
                    Delivery Address
                  </span>
                  <span className={style.productOrderTopAddressHeading}>
                    Country
                  </span>
                  <span className={style.productOrderAddressOutput}>
                    {orderItems.orderDetails.address.country}
                  </span>
                  {/*  */}
                  <span className={style.productOrderTopAddressHeading}>
                    Full Name
                  </span>
                  <span className={style.productOrderAddressOutput}>
                    {orderItems.orderDetails.address.fullName}
                  </span>
                  {/*  */}
                  <span className={style.productOrderTopAddressHeading}>
                    Mobile Number
                  </span>
                  <span className={style.productOrderAddressOutput}>
                    {orderItems.orderDetails.address.mobileNumber}
                  </span>
                  {/*  */}
                  <span className={style.productOrderTopAddressHeading}>
                    Pincode
                  </span>
                  <span className={style.productOrderAddressOutput}>
                    {orderItems.orderDetails.address.pincode}
                  </span>
                  {/*  */}
                  <span className={style.productOrderTopAddressHeading}>
                    Address Line
                  </span>
                  <span className={style.productOrderAddressOutput}>
                    {" "}
                    {orderItems.orderDetails.address.addressLine}
                  </span>
                  {/*  */}
                  <span className={style.productOrderTopAddressHeading}>
                    Landmark
                  </span>
                  <span className={style.productOrderAddressOutput}>
                    {orderItems.orderDetails.address.landmark}
                  </span>
                </div>
              </div>

              <div className={style.priceAndAddressWrapper}>
                <div className={style.orderPlacePriceBox}>
                  <div className={style.cartSummaryTextWrapper}>
                    <div className={style.summeryHeadingText}>
                      Order Details
                    </div>
                    <div className={style.subTotalWrapper}>
                      <span className={style.leftWrap}>Subtotal </span>
                      <span className={style.rightWrap}>
                        Rs : {orderItems.orderDetails.totalAmount}
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
                        Rs : {orderItems.orderDetails.totalAmount}
                      </span>
                    </div>
                    <div className={style.summeryButton}>
                      <button className={style.summeryButtonText}>
                        Cancle Order
                      </button>
                    </div>
                  </div>
                </div>
                <div className={style.orderAddressWrapper}>
                  <span className={style.addressHeadingText}>
                    Delivery Address
                  </span>
                  <span className={style.topAddressHeading}>Country</span>
                  <span className={style.addressOutput}>
                    {orderItems.orderDetails.address.country}
                  </span>
                  {/*  */}
                  <span className={style.topAddressHeading}>Full Name</span>
                  <span className={style.addressOutput}>
                    {orderItems.orderDetails.address.fullName}
                  </span>
                  {/*  */}
                  <span className={style.topAddressHeading}>Mobile Number</span>
                  <span className={style.addressOutput}>
                    {orderItems.orderDetails.address.mobileNumber}
                  </span>
                  {/*  */}
                  <span className={style.topAddressHeading}>Pincode</span>
                  <span className={style.addressOutput}>
                    {orderItems.orderDetails.address.pincode}
                  </span>
                  {/*  */}
                  <span className={style.topAddressHeading}>Address Line</span>
                  <span className={style.addressOutput}>
                    {orderItems.orderDetails.address.addressLine}
                  </span>
                  {/*  */}
                  <span className={style.topAddressHeading}>Landmark</span>
                  <span className={style.addressOutput}>
                    {orderItems.orderDetails.address.landmark}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
});
