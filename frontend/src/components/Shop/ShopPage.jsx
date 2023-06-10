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
      { name: "male", label: "Male", checked: false },
      { name: "female", label: "Female", checked: false },
      { name: "kid", label: "Kid", checked: false },
    ],
    sport: [
      { name: "lifestyle", label: "Lifestyle", checked: false },
      { name: "running", label: "Running", checked: false },
      { name: "basketball", label: "Basketball", checked: false },
    ],
    price: [
      { name: "twoToFive", label: "2K - 5K", checked: false },
      { name: "fiveToEight", label: "5K - 8K", checked: false },
      { name: "eightAndMore", label: "Over 8K", checked: false },
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
