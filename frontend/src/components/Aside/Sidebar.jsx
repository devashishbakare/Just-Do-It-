import React, { useState } from "react";
import style from "./sidebar.module.css";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
const Sidebar = () => {
  const [sectionClick, setSectionClick] = useState({
    genderFilterClick: false,
    sportFilterClick: false,
    priceFilterClick: false,
  });

  const [showGenderFilter, setShowGenderFilter] = useState(false);
  const [showSportFilter, setShowSportFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  const [genderFilterOptions, setGenderFilterOptions] = useState({
    male: false,
    female: false,
    kid: false,
  });

  const [sportFilterOptions, setSportFilterOptions] = useState({
    lifestyle: false,
    running: false,
    basketball: false,
  });

  const [priceFilterOptions, setPriceFilterOptions] = useState({
    twoToFive: false,
    fiveToEight: false,
    eightAndMore: false,
  });

  const handleSectionClick = (sectionName) => {
    console.log(sectionName);
    setSectionClick((prevSectionData) => ({
      ...prevSectionData,
      [sectionName]: !prevSectionData[sectionName],
    }));
  };
  const handleGenderFilterClick = (event) => {
    const name = event.target.name;
    setGenderFilterOptions((prevGenderFilterOptions) => ({
      ...prevGenderFilterOptions,
      [name]: !prevGenderFilterOptions[name],
    }));
  };

  const handleSportFilterClick = (event) => {
    const name = event.target.name;
    setSportFilterOptions((prevSportFilterOptions) => ({
      ...prevSportFilterOptions,
      [name]: !prevSportFilterOptions[name],
    }));
  };

  const handlePriceFilterClick = (event) => {
    const name = event.target.name;
    setPriceFilterOptions((prevPriceFilterOptions) => ({
      ...prevPriceFilterOptions,
      [name]: !prevPriceFilterOptions[name],
    }));
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
                {sectionClick.genderFilterClick ? (
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
          {sectionClick.genderFilterClick && (
            <>
              <div className={style.filterCheckboxContainer}>
                <div className={style.optionInputWrapper}>
                  <label className={style.selectOptions}>
                    <input
                      type="checkbox"
                      name="male"
                      checked={genderFilterOptions.male}
                      onChange={handleGenderFilterClick}
                      className={style.checkboxInputCss}
                    />
                    <span className={style.optionText}>Male</span>
                  </label>
                </div>
                <div className={style.optionInputWrapper}>
                  <label className={style.selectOptions}>
                    <input
                      type="checkbox"
                      name="female"
                      checked={genderFilterOptions.female}
                      onChange={handleGenderFilterClick}
                      className={style.checkboxInputCss}
                    />
                    <span className={style.optionText}>Female</span>
                  </label>
                </div>

                <div className={style.optionInputWrapper}>
                  <label className={style.selectOptions}>
                    <input
                      type="checkbox"
                      name="kid"
                      checked={genderFilterOptions.kid}
                      onChange={handleGenderFilterClick}
                      className={style.checkboxInputCss}
                    />
                    <span className={style.optionText}>Kid</span>
                  </label>
                </div>
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
                {sectionClick.sportFilterClick ? (
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
          {sectionClick.sportFilterClick && (
            <>
              <div className={style.filterCheckboxContainer}>
                <div className={style.optionInputWrapper}>
                  <label className={style.selectOptions}>
                    <input
                      type="checkbox"
                      name="lifestyle"
                      checked={sportFilterOptions.lifestyle}
                      onChange={handleSportFilterClick}
                      className={style.checkboxInputCss}
                    />
                    <span className={style.optionText}>Lifestyle</span>
                  </label>
                </div>
                <div className={style.optionInputWrapper}>
                  <label className={style.selectOptions}>
                    <input
                      type="checkbox"
                      name="running"
                      checked={sportFilterOptions.running}
                      onChange={handleSportFilterClick}
                      className={style.checkboxInputCss}
                    />
                    <span className={style.optionText}>Running</span>
                  </label>
                </div>

                <div className={style.optionInputWrapper}>
                  <label className={style.selectOptions}>
                    <input
                      type="checkbox"
                      name="basketball"
                      checked={sportFilterOptions.basketball}
                      onChange={handleSportFilterClick}
                      className={style.checkboxInputCss}
                    />
                    <span className={style.optionText}>Basketball</span>
                  </label>
                </div>
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
                {sectionClick.priceFilterClick ? (
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
          {sectionClick.priceFilterClick && (
            <>
              <div className={style.filterCheckboxContainer}>
                <div className={style.optionInputWrapper}>
                  <label className={style.selectOptions}>
                    <input
                      type="checkbox"
                      name="twoToFive"
                      checked={priceFilterOptions.twoToFive}
                      onChange={handlePriceFilterClick}
                      className={style.checkboxInputCss}
                    />
                    <span className={style.optionText}>2K - 5K</span>
                  </label>
                </div>
                <div className={style.optionInputWrapper}>
                  <label className={style.selectOptions}>
                    <input
                      type="checkbox"
                      name="fiveToEight"
                      checked={priceFilterOptions.fiveToEight}
                      onChange={handlePriceFilterClick}
                      className={style.checkboxInputCss}
                    />
                    <span className={style.optionText}>5K - 8K</span>
                  </label>
                </div>

                <div className={style.optionInputWrapper}>
                  <label className={style.selectOptions}>
                    <input
                      type="checkbox"
                      name="eightAndMore"
                      checked={priceFilterOptions.eightAndMore}
                      onChange={handlePriceFilterClick}
                      className={style.checkboxInputCss}
                    />
                    <span className={style.optionText}>Over 8K</span>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
