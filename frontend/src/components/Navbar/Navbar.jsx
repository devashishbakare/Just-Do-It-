import React, { useState, useRef, useContext } from "react";
import style from "./navbar.module.css";
import { SiNike } from "react-icons/si";
import axios from "axios";
import baseUrl from "../Constant";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BsPerson,
  BsMinecart,
  BsHeart,
  BsPersonFill,
  BsCart,
} from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartCountContext from "../CartCountContext";
const Navbar = () => {
  // updating login status
  const LoginStatus = localStorage.getItem("isLoggedIn");
  const [userLoggedIn, setUserLoggedIn] = useState(
    LoginStatus === "false" ? false : true
  );

  // states
  const [searchKey, setSearchKey] = useState("");
  const [resultFound, setResultFound] = useState(true);
  const pattern = /^(?!^\s+$)(?!^[0-9])([a-zA-Z0-9\s-]+)$/;
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const currentState = { from: window.location.pathname };
  const [isHovered, setIsHovered] = useState(false);
  const [profileMouseHover, setProfileMouseHover] = useState(false);
  const [totalSearchResult, setTotalSearchResult] = useState(-1);

  const navigate = useNavigate();
  const { cartCount, setCartCount } = useContext(CartCountContext);

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
        localStorage.removeItem("productDetails");
        setCartCount(0);
        setUserLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
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

  const fetchSearchResult = async (key, currentPage) => {
    try {
      if (pattern.test(searchKey) === false) {
        toast.warning("input type not allowed, try string", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      const response = await axios.get(
        `${baseUrl}/shoe/searchProduct?searchKey=${key}&page=${currentPage}&pageSize=${pageSize}`
      );
      if (response.status === 200) {
        if (response.data.data.length === 0) {
          setResultFound(false);
        }
        setSearchResult(response.data.data);
        setCurrentPage(currentPage);
        setTotalSearchResult(response.data.totalPages);
      }
    } catch (error) {
      console.log("error in seaching result " + error);
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
  const debouncing = useRef(null);
  const handleInput = (event) => {
    setSearchKey(event.target.value);

    clearTimeout(debouncing.current);

    debouncing.current = setTimeout(() => {
      fetchSearchResult(searchKey, 1);
    }, 800);
  };

  const handleNextButtonClick = () => {
    const nextPage = currentPage + 1;
    fetchSearchResult(searchKey, nextPage);
  };

  const handlePrevButtonClick = () => {
    const nextPage = currentPage - 1;
    fetchSearchResult(searchKey, nextPage);
  };

  const productDisaplyNavigation = (shoeDetails) => {
    localStorage.setItem("productDetails", JSON.stringify(shoeDetails));
    navigate("/productDetails");
  };

  const closeResultSection = () => {
    setResultFound(true);
    setSearchKey("");
    setCurrentPage(1);
    setTotalSearchResult(-1);
    setSearchResult([]);
  };
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.nikeLogoConatainer} onClick={() => navigate("/")}>
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
                  <div
                    className={style.hoverContainer}
                    onClick={() => navigate("/shop")}
                  >
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
              className={`${style.navbarOptions} ${style.lastTwoMenu}`}
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
              <input
                className={style.seachInputFeild}
                value={searchKey}
                onChange={handleInput}
                placeholder="Search.."
              />
            </div>
          </div>
          <div className={style.navBarIconContainer}>
            <div
              className={style.favoriteContainer}
              onClick={() => navigate("/favorite")}
            >
              <BsHeart className={`${style.navBarIcons}`} />
            </div>
            <div
              className={style.cartConatainer}
              onClick={() => navigate("/cart")}
            >
              <BsMinecart className={style.navBarIcons} />
              {cartCount !== 0 && (
                <>
                  <div className={style.cartCountWrapper}>
                    <span className={style.cartCount}>{cartCount}</span>
                  </div>
                </>
              )}
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
                        <span className={style.profileHoverMenu}>Logout</span>
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
                  Login
                </div>
              </>
            )}
          </div>
        </div>
        {resultFound === false && (
          <>
            <div className={style.searchResultContainer}>
              <div className={style.closeResultWrapper}>
                <span className={style.closeResultText}>
                  Result Not Found..
                </span>
                <span onClick={closeResultSection}>
                  <AiFillCloseCircle className={style.closeResultIcon} />
                </span>
              </div>
            </div>
          </>
        )}
        {searchResult.length > 0 && (
          <>
            <div className={style.searchResultContainer}>
              <div className={style.closeResultWrapper}>
                <span className={style.closeResultText}>Search Results</span>
                <span onClick={closeResultSection}>
                  <AiFillCloseCircle className={style.closeResultIcon} />
                </span>
              </div>

              {searchResult.map((result, index) => (
                <>
                  <div
                    className={style.shoeResultRow}
                    key={index - "searchResult"}
                    onClick={() => productDisaplyNavigation(result)}
                  >
                    <span className={style.imageWrapper}>
                      <img
                        src={result.images[0]}
                        alt="shoeImage"
                        className={style.shoeResultImage}
                      />
                    </span>
                    <span className={style.shoeResultShoeName}>
                      {result.name}
                    </span>
                  </div>
                </>
              ))}

              <div className={style.searchNavigationWrapper}>
                <button
                  onClick={handlePrevButtonClick}
                  className={`${
                    currentPage !== 1
                      ? style.searchNavigationButton
                      : style.hideButton
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextButtonClick}
                  className={`${
                    currentPage !== totalSearchResult
                      ? style.searchNavigationButton
                      : style.hideButton
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Navbar;
