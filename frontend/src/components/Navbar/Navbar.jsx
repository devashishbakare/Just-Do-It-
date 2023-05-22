import React, { useState } from "react";
import style from "./navbar.module.css";
import { SiNike } from "react-icons/si";
const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.nikeLogoConatainer}>
          <SiNike className={style.nikeLogo} />
        </div>
        <div className={style.shoppingOptionsWrapper}>
          <div className={style.NavBarOptionsWrapper}>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}></span>
              New & Featured
              {isHovered && (
                <>
                  <div className={style.hoverContainer}>
                    <div className={style.hoverOptionsContainer}>
                      <div className={style.optionContainer}>
                        <span className={style.hoverOptionHeading}>
                          New & Feature
                        </span>

                        <span className={style.hoverOptionText}>Shoes</span>

                        <span className={style.hoverOptionText}>Clothing</span>
                        <span className={style.hoverOptionText}>
                          Accessories
                        </span>
                        <span className={style.hoverOptionText}>
                          Shop All New
                        </span>
                      </div>

                      <div className={style.optionContainer}>
                        <span className={style.hoverOptionHeading}>Men</span>
                        <span className={style.hoverOptionText}>Shoes</span>
                        <span className={style.hoverOptionText}>Clothing</span>
                        <span className={style.hoverOptionText}>
                          Accessories
                        </span>
                        <span className={style.hoverOptionText}>
                          Shop All New
                        </span>
                      </div>

                      <div className={style.optionContainer}>
                        <span className={style.hoverOptionHeading}>Women</span>
                        <span className={style.hoverOptionText}>Shoes</span>
                        <span className={style.hoverOptionText}>Clothing</span>
                        <span className={style.hoverOptionText}>
                          Accessories
                        </span>
                        <span className={style.hoverOptionText}>
                          Shop All New
                        </span>
                      </div>

                      <div className={style.optionContainer}>
                        <span className={style.hoverOptionHeading}>Kid</span>
                        <span className={style.hoverOptionText}>Shoes</span>
                        <span className={style.hoverOptionText}>Clothing</span>
                        <span className={style.hoverOptionText}>
                          Accessories
                        </span>
                        <span className={style.hoverOptionText}>
                          Shop All New
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}>Men</span>
            </div>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}>Women</span>
            </div>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}>Kid</span>
            </div>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}>Sale</span>
            </div>
            <div
              className={style.navbarOptions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.navbarOptoinsText}>SNKRS</span>
            </div>
          </div>
        </div>
        <div className={style.activityWrapper}></div>
      </div>
    </>
  );
};

export default Navbar;
