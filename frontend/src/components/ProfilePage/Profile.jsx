import React, { useState } from "react";
import style from "./profile.module.css";
import Spinners from "../Spinners";
import Sign_in_up from "../Sign_in_up/Sign_in_up";
import { useNavigate, Link } from "react-router-dom";
import baseUrl from "../Constant";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
export const Profile = () => {
  //todo : you need to add showLoginForm state update in useEffect dependency array
  const navigate = useNavigate();

  const LoginStatus = localStorage.getItem("isLoggedIn");
  console.log("logIn Status  " + LoginStatus);
  const [showLoginForm, setShowLoginForm] = useState(
    LoginStatus === "false" ? false : true
  );
  //updating when user gets sign-in/up
  const handleLoginStatusUpdate = (status) => {
    setShowLoginForm(status);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/logout`);
      if (response.status === 200) {
        localStorage.removeItem("cartSum");
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", "false");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
      console.log("there is error in logging out at frontend");
    }

    navigate("/");
  };

  return (
    <>
      {showLoginForm === false ? (
        <>
          <div className={style.loginComponentWrapper}>
            <Sign_in_up updateChange={handleLoginStatusUpdate} />
          </div>
        </>
      ) : (
        <>
          <div className={style.profilePageContainer}>
            <div className={style.navBarContainer}>
              <Navbar />
            </div>
            <div className={style.profileContaintContainer}>
              <div className={style.profileInfoContainer}>
                <div className={style.profileInfoWrapper}>
                  <div className={style.userImageWrapper}>
                    <img
                      src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      alt="profieImage"
                      className={style.profileImage}
                    />
                  </div>
                  <div className={style.userInfoTextWrapper}>
                    <span className={style.userNameText}>Devashish Bakare</span>
                    <span className={style.userEmailText}>
                      devashishbakare@gmail.com
                    </span>
                  </div>
                </div>
              </div>
              <div className={style.userCategoryContainer}>
                <div className={style.userPersonaliseInfoContainer}>
                  {/* todo : add background color to selected menu black and white combination is good*/}

                  <div className={style.topMenuWrapper}>
                    <span className={style.menu}>Orders</span>
                    <span className={style.menu}>Favorites</span>
                    <span className={style.menu}>Cart</span>
                    <span className={style.menu}>Edit Profile</span>
                  </div>
                  <div className={style.menuOutputContainer}>
                    {/* *********** Product Cart ************** */}
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
                          <div className={style.cartProductName}>
                            Nike jorden 1X3K
                          </div>
                          <div className={style.cartProductPrice}>10054 Rs</div>
                        </div>
                        <span className={style.productTypeShoesNaming}>
                          mens Road Running Shoes
                        </span>
                        <div className={style.productSizeAndColorWrapper}>
                          <span className={style.sizeText}>Size : 8 Uk</span>
                          <span className={style.colorText}>
                            Color : &nbsp; Orange
                          </span>
                        </div>

                        <div className={style.quantityWrapper}>
                          <div className={style.increaseIcon}>
                            <span className={style.quantityText}>Quantity</span>
                            <span className={style.quantityText}>2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* *********** Product end ************** */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
/*
<div className={style.logoutContainer} onClick={handleLogout}>
    <button className={style.logoutButton}>Logout</button>
  </div>
"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

/* ********* Order Details Cart Start ************ *
                    // <div className={style.orderDetailsCart}>
                    //   <div className={style.orderDetailsCartHeading}>
                    //     <div className={style.topRowAlignWrapper}>
                    //       <span className={style.TopRowLeftFeild}>Date :</span>
                    //       <span className={style.TopRowrightFeild}>
                    //         {" "}
                    //         12/06/2023
                    //       </span>
                    //     </div>
                    //     <span className={style.navigationLink}>
                    //       <Link to="">View Details</Link>
                    //     </span>
                    //   </div>
                    //   <div className={style.orderDetailsCartDetails}>
                    //     <div className={style.rowAlignWrapper}>
                    //       <span className={style.orderRowLeftFeild}>
                    //         Price :
                    //       </span>
                    //       <span className={style.orderRowrightFeild}>
                    //         {" "}
                    //         12754 Rs
                    //       </span>
                    //     </div>
                    //     <div className={style.rowAlignWrapper}>
                    //       <span className={style.orderRowLeftFeild}>
                    //         Number Of Products :
                    //       </span>
                    //       <span className={style.orderRowrightFeild}>3</span>
                    //     </div>
                    //     <div className={style.rowAlignWrapper}>
                    //       <span className={style.orderRowLeftFeild}>
                    //         Placed To :
                    //       </span>
                    //       <span className={style.orderRowrightFeild}>
                    //         Devashish Bakare
                    //       </span>
                    //     </div>
                    //   </div>
                    // </div>
************* Order Details cart end *******************

*/
