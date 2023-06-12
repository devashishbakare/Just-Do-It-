import React, { useState } from "react";
import style from "./shopPage.module.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Aside/Sidebar";
import ProductContainer from "../ShopProducts/ProductContainer";
import shopContext from "../../Context /ShopContext";
const ShopPage = () => {
  const [filterOptions, setFilterOptions] = useState({
    genderFilterClick: false,
    sportFilterClick: false,
    priceFilterClick: false,
    gender: [
      { name: "Male", label: "Male", checked: false },
      { name: "Female", label: "Female", checked: false },
      { name: "Kid", label: "Kid", checked: false },
    ],
    sport: [
      { name: "Lifestyle", label: "Lifestyle", checked: false },
      { name: "Running", label: "Running", checked: false },
      { name: "Basketball", label: "Basketball", checked: false },
    ],
    price: [
      { name: "2-5", label: "2K - 5K", checked: false },
      { name: "5-8", label: "5K - 8K", checked: false },
      { name: "8-100", label: "Over 8K", checked: false },
    ],
  });

  const handleFilterOptionChange = (sectionName, optionName) => {
    if (
      sectionName === "genderFilterClick" ||
      sectionName === "sportFilterClick" ||
      sectionName === "priceFilterClick"
    ) {
      setFilterOptions((prevFilterOptions) => ({
        ...prevFilterOptions,
        [sectionName]: !prevFilterOptions[sectionName],
      }));
    } else {
      setFilterOptions((prevFilterOptions) => ({
        ...prevFilterOptions,
        [sectionName]: prevFilterOptions[sectionName].map((option) => {
          if (option.name === optionName) {
            return {
              ...option,
              checked: !option.checked,
            };
          }
          return option;
        }),
      }));
    }
  };

  return (
    <>
      <div className={style.shopPageContainer}>
        <div className={style.nanBarContainer}>
          <Navbar />
        </div>
        <div className={style.shoppintCartContainer}>
          <div className={style.asideContainer}>
            <Sidebar
              filterOptions={filterOptions}
              onFilterOptionChange={handleFilterOptionChange}
            />
          </div>
          <div className={style.shopProductContainer}>
            <ProductContainer appliedFilters={filterOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
