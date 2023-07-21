import React, { useState } from "react";
import style from "./navbar.module.css";
import { SiNike } from "react-icons/si";
import axios from "axios";
import baseUrl from "../Constant";
import {
  BsPerson,
  BsMinecart,
  BsHeart,
  BsPersonFill,
  BsCart,
} from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Sign_in_up from "../Sign_in_up/Sign_in_up";
const Navbar = () => {
  const LoginStatus = localStorage.getItem("isLoggedIn");
  console.log("logIn Status  " + LoginStatus);
  const [userLoggedIn, setUserLoggedIn] = useState(
    LoginStatus === "false" ? false : true
  );
  const currentState = { from: window.location.pathname };
  const [isHovered, setIsHovered] = useState(false);
  const [profileMouseHover, setProfileMouseHover] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/logout`);
      if (response.status === 200) {
        localStorage.removeItem("cartSum");
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", "false");
        console.log(response.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      console.log("there is error in logging out at frontend");
    }
  };

  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.nikeLogoConatainer}>
          <SiNike className={style.nikeLogo} />
        </div>
        <div className={style.shoppingOptionsWrapper}>
          <div className={style.NavBarOptionsWrapper}>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}></span>
              New & Featured
              {isHovered && (
                <>
                  <div className={style.hoverContainer}>
                    <div className={style.hoverOptionsContainer}>
                      <div className={style.optionContainer}>
                        <span className={style.hoverOptionHeading}>
                          New & Feature
                        </span>

                        <span className={style.hoverOptionText}>Shoes</span>

                        <span className={style.hoverOptionText}>Clothing</span>
                        <span className={style.hoverOptionText}>
                          Accessories
                        </span>
                        <span className={style.hoverOptionText}>
                          Shop All New
                        </span>
                      </div>

                      <div className={style.optionContainer}>
                        <span className={style.hoverOptionHeading}>Men</span>
                        <span className={style.hoverOptionText}>Shoes</span>
                        <span className={style.hoverOptionText}>Clothing</span>
                        <span className={style.hoverOptionText}>
                          Accessories
                        </span>
                        <span className={style.hoverOptionText}>
                          Shop All New
                        </span>
                      </div>

                      <div className={style.optionContainer}>
                        <span className={style.hoverOptionHeading}>Women</span>
                        <span className={style.hoverOptionText}>Shoes</span>
                        <span className={style.hoverOptionText}>Clothing</span>
                        <span className={style.hoverOptionText}>
                          Accessories
                        </span>
                        <span className={style.hoverOptionText}>
                          Shop All New
                        </span>
                      </div>

                      <div className={style.optionContainer}>
                        <span className={style.hoverOptionHeading}>Kid</span>
                        <span className={style.hoverOptionText}>Shoes</span>
                        <span className={style.hoverOptionText}>Clothing</span>
                        <span className={style.hoverOptionText}>
                          Accessories
                        </span>
                        <span className={style.hoverOptionText}>
                          Shop All New
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}>Men</span>
            </div>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}>Women</span>
            </div>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}>Kid</span>
            </div>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}>Sale</span>
            </div>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}>SNKRS</span>
            </div>
          </div>
        </div>
        <div className={style.activityWrapper}>
          <div className={style.searchBarContainer}>
            <div className={style.searchBar}>
              <FaSearch className={style.searchIcon} />
              <input className={style.seachInputFeild} placeholder="Search" />
            </div>
          </div>
          <div className={style.navBarIconContainer}>
            <div
              className={style.favoriteContainer}
              onClick={() => navigate("/favorite")}
            >
              <BsHeart className={style.navBarIcons} />
            </div>
            <div
              className={style.cartConatainer}
              onClick={() => navigate("/cart")}
            >
              <BsMinecart className={style.navBarIcons} />
            </div>
            {userLoggedIn ? (
              <>
                <div
                  className={style.profileContainer}
                  // onClick={() => navigate("/profile")}
                  onClick={() => setProfileMouseHover(!profileMouseHover)}
                  // onMouseLeave={() => setProfileMouseHover(false)}
                >
                  <BsPerson className={style.navBarIcons} />
                </div>
                {profileMouseHover && (
                  <>
                    <div className={style.profileMenuContainer}>
                      <div
                        className={style.profileMenuWrapper}
                        onClick={() => navigate("/profile")}
                      >
                        <span className={style.menuIcons}>
                          <BsPersonFill className={style.menuIconStyle} />
                        </span>
                        <span className={style.profileHoverMenu}>Profile</span>
                      </div>

                      <div
                        className={style.profileMenuWrapper}
                        onClick={() => navigate("/cart")}
                      >
                        <span className={style.menuIcons}>
                          <BsCart className={style.menuIconStyle} />
                        </span>
                        <span className={style.profileHoverMenu}>Cart</span>
                      </div>

                      <div
                        className={style.profileMenuWrapper}
                        onClick={() => navigate("/favorite")}
                      >
                        <span className={style.menuIcons}>
                          <BsHeart className={style.menuIconStyle} />
                        </span>
                        <span className={style.profileHoverMenu}>
                          Favorites
                        </span>
                      </div>

                      <div
                        className={style.profileMenuWrapper}
                        onClick={handleLogout}
                      >
                        <span className={style.menuIcons}>
                          <BiLogOutCircle className={style.menuIconStyle} />
                        </span>
                        <span className={style.profileHoverMenu}>Sign Out</span>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div
                  className={style.signInText}
                  onClick={() => navigate("/login", { state: currentState })}
                >
                  Sign In
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
