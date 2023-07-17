import React, { useEffect, useState } from "react";
import style from "./favoritePage.module.css";
import NavBar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import baseUrl from "../Constant";
import axios from "axios";
import Spinners from "../Spinners";
import Sign_in_up from "../Sign_in_up/Sign_in_up";
const FavoritePage = () => {
  //fetching login status
  const LoginStatus = localStorage.getItem("isLoggedIn");
  console.log("logIn Status  " + LoginStatus);
  const [showLoginForm, setShowLoginForm] = useState(
    LoginStatus === "false" ? false : true
  );

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //fetching all favorite item on initial rendering
  useEffect(() => {
    const fetchFavorite = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        console.log("token " + token);
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
            console.log("favorite fetch data " + response.data);
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
  }, [showLoginForm]);

  //updating when user gets sign-in/up
  const handleLoginStatusUpdate = (status) => {
    setShowLoginForm(status);
  };

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
      console.log("suuu " + favoriteItem_id);
    } catch (error) {
      console.log(error);
      console.log(error.data);
    }
  };

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
        setProducts((prevProduct) =>
          products.filter(
            (eachProduct) => eachProduct.favoriteItemId !== addToCartItem_id
          )
        );
      }
      setIsLoading(false);
      console.log("suuu " + addToCartItem_id);
    } catch (error) {
      console.log("error in moving to cart " + error);
    }
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
                        <div
                          className={style.favoriteCartWrapper}
                          key={product.favoriteItemId}
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
      )}
    </>
  );
};

export default FavoritePage;
//
/*

*/
