import React, { useEffect, useState, useContext } from "react";
import style from "./favoritePage.module.css";
import NavBar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import baseUrl from "../Constant";
import axios from "axios";
import Spinners from "../Spinners";
import SignInUp from "../Sign_in_up/Sign_in_up";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartCountContext from "../CartCountContext";
const FavoritePage = () => {
  //fetching login status
  const { setCartCount } = useContext(CartCountContext);
  const LoginStatus = localStorage.getItem("isLoggedIn");
  const [showLoginForm, setShowLoginForm] = useState(
    LoginStatus === "false" ? false : true
  );

  // states
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //fetching all favorite item on initial rendering
  useEffect(() => {
    const fetchFavorite = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        // console.log("token " + token);
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };

        if (token) {
          const response = await axios.get(
            `${baseUrl}/shoe/fetchFavorite`,
            config
          );
          if (response.status === 200) {
            // console.log("favorite fetch data " + response.data);
            // console.log("value " + response.data[0].shoeDetails);
            setProducts(response.data);
          }
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchFavorite();
  }, [showLoginForm]);

  //updating when user gets sign-in/up
  const handleLoginStatusUpdate = (status) => {
    setShowLoginForm(status);
  };

  // removing from favorites
  const handleRemoveFromFavorite = async (favoriteItem_id) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const data = {
        favoriteItemId: favoriteItem_id,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        data: data,
      };

      const response = await axios.delete(
        `${baseUrl}/shoe/delteFromFavorite`,
        config
      );
      if (response.status === 200) {
        setProducts((prevProduct) =>
          products.filter(
            (eachProduct) => eachProduct.favoriteItemId !== favoriteItem_id
          )
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
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

  // moving to cart
  const handleFavoriteToCartMove = async (addToCartItem_id, product_id) => {
    console.log("favId " + addToCartItem_id);
    console.log("productId " + product_id);
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const data = {
        favoriteItemId: addToCartItem_id,
        productItemId: product_id,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch(
        `${baseUrl}/shoe/moveToCart`,
        data,
        config
      );
      if (response.status === 200) {
        setCartCount(response.data.cartCount);
        setProducts((prevProduct) =>
          products.filter(
            (eachProduct) => eachProduct.favoriteItemId !== addToCartItem_id
          )
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
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

  return (
    <>
      {showLoginForm === false ? (
        <>
          <div className={style.loginComponentWrapper}>
            <SignInUp updateChange={handleLoginStatusUpdate} />
          </div>
        </>
      ) : (
        <>
          <div className={style.favoriteContainer}>
            <div className={style.NavBarContainer}>
              <NavBar />
            </div>
            <div className={style.favoriteWrapper}>
              <span className={style.favoriteText}>Favorites</span>
            </div>
            <div className={style.favoriteProductWrapperContainer}>
              {isLoading ? (
                <>
                  <Spinners />
                </>
              ) : (
                <>
                  {products.length > 0 ? (
                    <>
                      {products.map((product, index) => (
                        <div
                          className={style.favoriteCartWrapper}
                          key={index + "/" + product.favoriteItemId}
                        >
                          <div className={style.imageWrapper}>
                            <img
                              src={product.shoeDetails.images[0]}
                              alt="shoe_image"
                              className={style.productImage}
                            />
                          </div>
                          <div className={style.productInfoWrapper}>
                            <div className={style.nameAndPriceWrapper}>
                              <span className={style.productName}>
                                {product.shoeDetails.name}
                              </span>
                              <span className={style.productPrice}>
                                {product.shoeDetails.price}
                              </span>
                            </div>
                            <span className={style.productTypeShoes}>
                              {product.shoeDetails.shoes_type}{" "}
                              {product.shoeDetails.category} Shoes
                            </span>
                            <div className={style.ButtonWrapper}>
                              <button
                                className={style.addToCartButton}
                                onClick={() =>
                                  handleFavoriteToCartMove(
                                    product.favoriteItemId,
                                    product.shoeDetails._id
                                  )
                                }
                              >
                                Add To Cart
                              </button>
                              <button
                                className={style.removeFromFavoriteButton}
                                onClick={() =>
                                  handleRemoveFromFavorite(
                                    product.favoriteItemId
                                  )
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className={style.noCartBoardContainer}>
                        <span className={style.noElementInCart}>
                          Your favorite shoes are yet to be added. Get started
                        </span>
                        <button
                          className={style.eseentialsShopButton}
                          onClick={() => navigate("/shop")}
                        >
                          Shop
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              <div className={style.contactSectionContainer}>
                <ContactFooter />
              </div>
            </div>
            <ToastContainer />;
          </div>
        </>
      )}
    </>
  );
};

export default FavoritePage;
//
/*

*/
