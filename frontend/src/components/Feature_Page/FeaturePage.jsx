import React from "react";
import style from "./featurePage.module.css";
import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaMapMarker,
} from "react-icons/fa";
import Carousel from "../Carousel";
const FeaturePage = () => {
  return (
    <>
      <div className={style.featurePageContainer}>
        <div className={style.featureVedioWrapper}>
          <iframe
            width="100%"
            height="920px"
            src="https://www.youtube.com/embed/PZIqV7wNyyU?autoplay=1&mute=1&loop=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div className={style.nikeFashionCarouselContainer}>
          <Carousel />
        </div>
        <div className={style.shopTextContainer}>
          <div className={style.headingTextWrapper}>
            <span className={style.topSmallHeadingText}>Summer Essentials</span>
            <span className={style.topBigHeadingText}>CHASE THE DAY</span>
            <span className={style.topSmallExplanationText}>
              Move. Explore. Bring your boldest.
            </span>
            <span className={style.topSmallExplanationText}>
              Get after summer’s endless possibilities with ready-for-anything
              fits.
            </span>
            <button className={style.shopButton}>Shop</button>
          </div>
        </div>
        <div className={style.shopCarouselContainer}></div>
        <div className={style.theLetestContainer}>
          <div className={style.latestImageWrapper}>
            <img
              className={style.latestImage}
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1480,c_limit/b1ec70bd-a3a0-4e85-b3f4-f0ef23ca4cd2/nike-just-do-it.png"
              alt="latestShop_featureImage"
            />
          </div>
          <div className={style.theLatestShoeInfoContainer}>
            <span className={style.topSmallHeadingText}>
              Air Jordan 1 High OG
            </span>
            <span className={style.topBigHeadingText}>
              you don't need a cape
            </span>
            <span className={style.topBigHeadingText}>to take flight</span>
            <span className={style.topSmallExplanationText}>
              Get ready to swing into action with the upcoming Air Jordan 1 High
              OG 'Next Chapter' as seen in 'Spider-Man: Across the
              Spider-Verse', exclusively in theaters. Available in full family
              sizing,
            </span>
            <span className={style.topSmallExplanationText}>
              outfit the whole crew and look fly in any universe.
            </span>
            <button className={style.shopButton}>Shop</button>
          </div>
        </div>

        <div className={style.productDisplayContainer}>
          <div className={style.sectionHeading}>
            <span className={style.sectionHeadingText}>The Essentials</span>
          </div>
          <div className={style.productDisplayWrapper}>
            <div className={style.productDisplay}>
              <img
                className={style.latestImage}
                src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_600,c_limit/69ded6b2-4b32-4f76-9dd0-2d5235a04953/nike-just-do-it.png"
                alt="product_Img"
              />
              <button className={style.eseentialsShopButton}>Shop</button>
            </div>
            <div className={style.productDisplay}>
              <img
                className={style.latestImage}
                src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_600,c_limit/1c8b3b45-5c46-418e-8c62-37fc65eca37c/nike-just-do-it.png"
                alt="product_Img"
              />
              <button className={style.eseentialsShopButton}>Shop</button>
            </div>
            <div className={style.productDisplay}>
              <img
                className={style.latestImage}
                src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_600,c_limit/70a7b831-bc34-4273-9790-6775c56667c0/nike-just-do-it.png"
                alt="product_Img"
              />
              <button className={style.eseentialsShopButton}>Shop</button>
            </div>
          </div>
        </div>
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
                <span className={style.infoBlockText}>
                  contact us on all other inquiries
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
                {/* FaTwitter, FaFacebookF, FaYoutube, FaInstagram */}
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
      </div>
    </>
  );
};

export default FeaturePage;
