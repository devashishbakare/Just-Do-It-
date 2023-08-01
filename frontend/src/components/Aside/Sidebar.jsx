import React from "react";
import style from "./sidebar.module.css";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
const Sidebar = ({ filterOptions, onFilterOptionChange }) => {
  const handleSectionClick = (sectionName) => {
    onFilterOptionChange(sectionName);
  };

  const handleFilterClick = (event, sectionName) => {
    const { name } = event.target;
    onFilterOptionChange(sectionName, name);
  };

  const renderCheckboxes = (sectionName) => {
    const options = filterOptions[sectionName];

    return options.map((option) => (
      <div className={style.optionInputWrapper} key={option.name}>
        <label className={style.selectOptions}>
          <input
            type="checkbox"
            name={option.name}
            checked={option.checked}
            onChange={(event) => handleFilterClick(event, sectionName)}
            className={style.checkboxInputCss}
          />
          <span className={style.optionText}>{option.label}</span>
        </label>
      </div>
    ));
  };

  return (
    <>
      <div className={style.asideContainer}>
        <div className={style.optionWrapper}>
          <div
            className={style.filterOptionContainer}
            id={style.genderContainer}
          >
            <div
              className={style.textAndSymbol}
              onClick={() => handleSectionClick("genderFilterClick")}
            >
              <span className={style.filterText}>Gender</span>
              <span className={style.filterSymbol}>
                {filterOptions.genderFilterClick ? (
                  <>
                    <MdArrowDropUp className={style.dropdownSymbol} />
                  </>
                ) : (
                  <>
                    <MdArrowDropDown className={style.dropdownSymbol} />
                  </>
                )}
              </span>
            </div>
          </div>
          {filterOptions.genderFilterClick && (
            <>
              <div className={style.filterCheckboxContainer}>
                {renderCheckboxes("gender")}
              </div>
            </>
          )}
          <div className={style.filterOptionContainer}>
            <div
              className={style.textAndSymbol}
              onClick={() => handleSectionClick("sportFilterClick")}
            >
              <span className={style.filterText}>Sports</span>
              <span className={style.filterSymbol}>
                {filterOptions.sportFilterClick ? (
                  <>
                    <MdArrowDropUp className={style.dropdownSymbol} />
                  </>
                ) : (
                  <>
                    <MdArrowDropDown className={style.dropdownSymbol} />
                  </>
                )}
              </span>
            </div>
          </div>
          {filterOptions.sportFilterClick && (
            <>
              <div className={style.filterCheckboxContainer}>
                {renderCheckboxes("sport")}
              </div>
            </>
          )}
          <div className={style.filterOptionContainer}>
            <div
              className={style.textAndSymbol}
              onClick={() => handleSectionClick("priceFilterClick")}
            >
              <span className={style.filterText}>Shop By Price</span>
              <span className={style.filterSymbol}>
                {filterOptions.priceFilterClick ? (
                  <>
                    <MdArrowDropUp className={style.dropdownSymbol} />
                  </>
                ) : (
                  <>
                    <MdArrowDropDown className={style.dropdownSymbol} />
                  </>
                )}
              </span>
            </div>
          </div>
          {filterOptions.priceFilterClick && (
            <>
              <div className={style.filterCheckboxContainer}>
                {renderCheckboxes("price")}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
