import React from "react";
import style from "./shopPage.module.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Aside/Sidebar";
import ProductContainer from "../ShopProducts/ProductContainer";
const ShopPage = () => {
  return (
    <>
      <div className={style.shopPageContainer}>
        <div className={style.nanBarContainer}>
          <Navbar />
        </div>
        <div className={style.shoppintCartContainer}>
          <div className={style.asideContainer}>
            <Sidebar />
          </div>
          <div className={style.shopProductContainer}>
            <ProductContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
