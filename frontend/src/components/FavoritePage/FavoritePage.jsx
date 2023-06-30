import React, { useEffect, useState } from "react";
import style from "./favoritePage.module.css";
import NavBar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import baseUrl from "../Constant";
import axios from "axios";
import Spinners from "../Spinners";
import Sign_in_up from "../Sign_in_up/Sign_in_up";
const FavoritePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const LoginStatus = localStorage.getItem("isLoggedIn");
  console.log("logIn Status  " + LoginStatus);
  const [showLoginForm, setShowLoginForm] = useState(
    LoginStatus === "false" ? true : false
  );

  console.log("modal status " + showLoginForm);
  //fetching all favorite item on initial rendering
  useEffect(() => {
    const fetchFavorite = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        console.log("userId " + userId);
        if (userId) {
          const response = await axios.get(
            `${baseUrl}/shoe/fetchFavorite/${userId}`
          );
          if (response.status === 200) {
            console.log("value " + response.data[0].shoeDetails);
            setProducts(response.data);
          }
        } else {
          //todo : throw a sign-in and sign-up box
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchFavorite();
  }, []);

  const handleRemoveFromFavorite = async (favoriteItem_id) => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");
      const config = {
        userId,
        favoriteItemId: favoriteItem_id,
      };

      const response = await axios.delete(`${baseUrl}/shoe/delteFromFavorite`, {
        data: config,
      });
      if (response.status === 200) {
        setProducts((prevProduct) =>
          products.filter(
            (eachProduct) => eachProduct.favoriteItemId !== favoriteItem_id
          )
        );
      }
      setIsLoading(false);
      console.log("suuu " + favoriteItem_id);
    } catch (error) {
      console.log(error);
      console.log(error.data);
    }
  };

  const handleFavoriteToCartMove = async (addToCartItem_id) => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");
      const config = {
        userId: userId,
        favoriteItemId: addToCartItem_id,
        productItemId: products.shoeDetails._id,
      };

      const response = await axios.patch(`${baseUrl}/shoe/moveToCart`, {
        data: config,
      });
      if (response.status === 200) {
        setProducts((prevProduct) =>
          products.filter(
            (eachProduct) => eachProduct.favoriteItemId !== addToCartItem_id
          )
        );
      }
      setIsLoading(false);
      console.log("suuu " + addToCartItem_id);
    } catch (error) {
      console.log(error);
      console.log(error.data);
    }
  };

  const handleLoginStatusUpdate = (status) => {
    setShowLoginForm(status);
  };

  return (
    <>
      {showLoginForm === false ? (
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
                      {products.map((product) => (
                        <div className={style.favoriteCartWrapper}>
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
                                    product.favoriteItemId
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
                          No Favorite Shoes Added...
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}

              <div className={style.contactSectionContainer}>
                <ContactFooter />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={style.loginComponentWrapper}>
            <Sign_in_up updateChange={handleLoginStatusUpdate} />
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
