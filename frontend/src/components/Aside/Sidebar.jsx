import React, { useState } from "react";
import style from "./sidebar.module.css";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
const Sidebar = () => {
  const [genderFilterClick, setGenderFilterClick] = useState(false);
  const [sportFilterClick, setSportFilterClick] = useState(false);
  const [colorFilterClick, setColorFilterClick] = useState(false);
  const [priceFilterClick, setPriceFilterClick] = useState(false);

  return (
    <>
      <div className={style.asideContainer}>
        <div className={style.optionWrapper}>
          <div
            className={style.filterOptionContainer}
            id={style.genderContainer}
          >
            <div className={style.textAndSymbol}>
              <span className={style.filterText}>Gender</span>
              <span className={style.filterSymbol}>
                <MdArrowDropDown className={style.dropdownSymbol} />
              </span>
            </div>
          </div>
          <div className={style.filterOptionContainer}>
            <div className={style.textAndSymbol}>
              <span className={style.filterText}>Sports</span>
              <span className={style.filterSymbol}>
                <MdArrowDropDown className={style.dropdownSymbol} />
              </span>
            </div>
          </div>
          <div className={style.filterOptionContainer}>
            <div className={style.textAndSymbol}>
              <span className={style.filterText}>Color</span>
              <span className={style.filterSymbol}>
                <MdArrowDropDown className={style.dropdownSymbol} />
              </span>
            </div>
          </div>
          <div className={style.filterOptionContainer}>
            <div className={style.textAndSymbol}>
              <span className={style.filterText}>Price</span>
              <span className={style.filterSymbol}>
                <MdArrowDropDown className={style.dropdownSymbol} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
