import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaMapMarker,
} from "react-icons/fa";
import style from "./contactSection.module.css";
const ContactFooter = () => {
  return (
    <>
      <div className={style.footerContainer}>
        <div className={style.footerTopContainer}>
          <div className={style.aboutContainer}>
            <div className={style.infoBlock}>
              <span className={style.infoBlockHeadingText}>find a store</span>
              <span className={style.infoBlockText}>become a member</span>
              <span className={style.infoBlockText}>send us feedback</span>
              <span className={style.infoBlockText}>find a store</span>
            </div>
            <div className={style.infoBlock}>
              <span className={style.infoBlockHeadingText}>get help</span>
              <span className={style.infoBlockText}>order status</span>
              <span className={style.infoBlockText}>Delivery</span>
              <span className={style.infoBlockText}>returns</span>
              <span className={style.infoBlockText}>payment options</span>
              <span className={style.infoBlockText}>
                contact us on nike.com inquiries
              </span>
            </div>
            <div className={style.infoBlock}>
              <span className={style.infoBlockHeadingText}>About Nike</span>
              <span className={style.infoBlockText}>News</span>
              <span className={style.infoBlockText}>Careers</span>
              <span className={style.infoBlockText}>investors</span>
              <span className={style.infoBlockText}>Sustainability</span>
            </div>
          </div>
          <div className={style.navigationContainer}>
            <div className={style.navigationIconsWrapper}>
              <div className={style.navigationIcon}>
                <FaTwitter className={style.iconsCss} />
              </div>
              <div className={style.navigationIcon}>
                <FaFacebookF className={style.iconsCss} />
              </div>
              <div className={style.navigationIcon}>
                <FaYoutube className={style.iconsCss} />
              </div>
              <div className={style.navigationIcon}>
                <FaInstagram className={style.iconsCss} />
              </div>
            </div>
          </div>
        </div>
        <div className={style.footerBottomContainer}>
          <div className={style.bottomFooterLeftWrapper}>
            <div className={style.locationWrapper}>
              <FaMapMarker className={style.locationIcon} />
              <span className={style.contryName}>India</span>
            </div>
            <span className={style.rightResever}>
              2023 nike. inc. all rights reserved
            </span>
          </div>
          <div className={style.bottomFooterRightWrapper}>
            <ui className={style.footerList}>
              <li>nike privacy policy</li>
              <li>terms of use</li>
              <li>Terms of sale</li>
              <li>Guides</li>
            </ui>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactFooter;
