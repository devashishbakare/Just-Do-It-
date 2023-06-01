import React, { useState } from "react";
import style from "./shopPage.module.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Aside/Sidebar";
import ProductContainer from "../ShopProducts/ProductContainer";
import shopContext from "../../Context /ShopContext";
const ShopPage = () => {
  const [selectedGender, setSelectedGender] = useState([]);
  const [shoeCategory, setShoeCategory] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);

  return (
    <>
      <div className={style.shopPageContainer}>
        <div className={style.nanBarContainer}>
          <Navbar />
        </div>
        <div className={style.shoppintCartContainer}>
          <div className={style.asideContainer}>
            <shopContext.Provider
              value={{
                selectedGender,
                setSelectedGender,
                shoeCategory,
                setShoeCategory,
                priceFilter,
                setPriceFilter,
                colorFilter,
                setColorFilter,
              }}
            >
              <Sidebar />
            </shopContext.Provider>
          </div>
          <div className={style.shopProductContainer}>
            <shopContext.Provider
              value={{
                selectedGender,
                setSelectedGender,
                shoeCategory,
                setShoeCategory,
                priceFilter,
                setPriceFilter,
                colorFilter,
                setColorFilter,
              }}
            >
              <ProductContainer />
            </shopContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
