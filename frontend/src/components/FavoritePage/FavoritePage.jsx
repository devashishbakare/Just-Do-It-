import React, { useEffect, useState } from "react";
import style from "./favoritePage.module.css";
import NavBar from "../Navbar/Navbar";
import ContactFooter from "../ContactSection/ContactFooter";
import baseUrl from "../Constant";
import axios from "axios";
import Spinners from "../Spinners";
const FavoritePage = () => {
  console.log("logIn " + localStorage.getItem("isLoggedIn"));
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
            console.log(response.data);
            setProducts(response.data);
          }
        } else {
          //todo : throw a sign-in and sign-up box
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFavorite();
  }, []);

  const handleRemoveFromFavorite = async (favoriteItem) => {
    try {
      // const favoriteCartId =
    } catch (error) {
      console.log(error);
      console.log(error.data);
    }
  };

  const handleFavoriteToCartMove = async () => {
    try {
    } catch (error) {
      console.log(error);
      console.log(error.data);
    }
  };

  return (
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
              {products.map((product) => (
                <div className={style.favoriteCartWrapper}>
                  <div className={style.imageWrapper}>
                    <img
                      src={product.images[0]}
                      alt="shoe_image"
                      className={style.productImage}
                    />
                  </div>
                  <div className={style.productInfoWrapper}>
                    <div className={style.nameAndPriceWrapper}>
                      <span className={style.productName}>{product.name}</span>
                      <span className={style.productPrice}>
                        {product.price}
                      </span>
                    </div>
                    <span className={style.productTypeShoes}>
                      {product.shoes_type} {product.category} Shoes
                    </span>
                    <div className={style.ButtonWrapper}>
                      <button
                        className={style.addToCartButton}
                        onClick={handleFavoriteToCartMove}
                      >
                        Add To Cart
                      </button>
                      <button
                        className={style.removeFromFavoriteButton}
                        onClick={handleRemoveFromFavorite}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className={style.contactSectionContainer}>
            <ContactFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritePage;

/* */
