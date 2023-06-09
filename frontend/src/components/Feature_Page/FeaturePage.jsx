import React from "react";
import style from "./featurePage.module.css";
import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaMapMarker,
} from "react-icons/fa";
import ContactFooter from "../ContactSection/ContactFooter";
import Carousel from "../CarouselToPage/Carousels";
import { useNavigate } from "react-router-dom";
const FeaturePage = () => {
  const navigate = useNavigate();
  const featureStyleImages = [
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/8b8054bd-e5e4-4c0d-9c6b-79c57367b041/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/1d682443-c8ba-453b-8f3a-c53d8e76ea41/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/6ae71b3c-8d00-4242-9781-11a2f97c8910/nike-just-do-it.jpg",
  ];

  const sampleProduct = [
    "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/5f64e8c2-4948-497a-91a4-5359c553c4c9/nikecourt-vapor-lite-2-hard-court-tennis-shoes-8dGHWK.png",
    "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/5affda87-cb2e-4824-9bbd-4be4e4fc4341/nikecourt-air-zoom-lite-3-tennis-shoes-6f6J0W.png",
    "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/caf34e6c-114a-4fc8-8110-b999171afcb9/nikecourt-vapor-lite-2-hard-court-tennis-shoes-8RL88H.png",
    "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/444b96b6-b9d0-4a71-acff-67672c251d18/nikecourt-air-zoom-vapor-pro-2-hard-court-tennis-shoes-M9c7Rs.png",
    "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/d9376418-568c-4ed8-900d-240a071f975e/nikecourt-air-zoom-vapor-pro-2-hard-court-tennis-shoes-8cpW40.png",
    "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/85956c6e-c91a-4887-832e-7193fc384ffe/nikecourt-air-zoom-pro-hard-court-tennis-shoes-6XpsqH.png",
  ];

  return (
    <>
      <div className={style.featurePageContainer}>
        <div className={style.featureVedioWrapper}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/PZIqV7wNyyU?autoplay=1&mute=1&loop=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div className={style.shopTextContainer}>
          <div className={style.headingTextWrapper}>
            <span className={style.topSmallHeadingText}>Sport Essentials</span>
            <span className={style.topBigHeadingText}>CHASE THE DAY</span>
            <span className={style.topSmallExplanationText}>
              Move. Explore. Bring your boldest.
            </span>
            <span className={style.topSmallExplanationText}>
              Get in sports and brings endless possibilities with
              ready-for-anything fits.
            </span>
            <button
              className={style.shopButton}
              onClick={() => navigate("/shop")}
            >
              Shop
            </button>
          </div>
        </div>

        <div className={style.nikeFashionCarouselContainer}>
          <Carousel images={featureStyleImages} />
        </div>

        {/* <div className={style.shopCarouselContainer}></div> */}
        <div className={style.theLetestContainer}>
          <div className={style.latestImageWrapper}>
            <img
              className={style.latestImage}
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1480,c_limit/b1ec70bd-a3a0-4e85-b3f4-f0ef23ca4cd2/nike-just-do-it.png"
              alt="latestShop_featureImage"
            />
          </div>
        </div>
        <div className={style.theLatestShoeInfoContainer}>
          <span className={style.topSmallHeadingText}>
            Air Jordan 1 High OG
          </span>
          {/* <span className={style.topBigHeadingText}></span> */}
          <span className={style.topBigHeadingText}>
            to take flight you don't need a cape
          </span>
          <span className={style.topSmallExplanationText}>
            Get ready to swing into action with the upcoming Air Jordan 1 High
            OG 'Next Chapter' as seen in 'Spider-Man: Across the Spider-Verse',
            exclusively in theaters. Available in full family sizing,
          </span>
          <span className={style.topSmallExplanationText}>
            outfit the whole crew and look fly in any universe.
          </span>
          <button className={style.shopButton}>Shop</button>
        </div>
        <div className={style.productDisplayContainer}>
          <div className={style.sectionHeading}>
            <span className={style.sectionHeadingText}>The Essentials</span>
          </div>
          <div className={style.productDisplayWrapper}>
            <div className={style.productDisplay}>
              <img
                className={style.latestImage}
                src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_599,c_limit/626b0c7b-229e-42af-8423-6dfe69225f75/image.jpg"
                alt="product_Img"
              />
              <button className={style.eseentialsShopButton}>Shop</button>
            </div>
            <div className={style.productDisplay}>
              <img
                className={style.latestImage}
                src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_599,c_limit/e9983b9c-39e0-4046-ba80-cee310200176/image.jpg"
                alt="product_Img"
              />
              <button className={style.eseentialsShopButton}>Shop</button>
            </div>
            <div className={style.productDisplay}>
              <img
                className={style.latestImage}
                src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_599,c_limit/b82dfc38-539f-424b-8981-0d9a4315917c/image.jpg"
                alt="product_Img"
              />
              <button className={style.eseentialsShopButton}>Shop</button>
            </div>
          </div>
        </div>
        <div className={style.newFeatureShoesContainer}>
          <button className={style.newFeatureButton}>Shop New Featured</button>
        </div>
        <div className={style.shoeFeatureCarouselContainer}>
          <Carousel images={sampleProduct} />
        </div>
        <div className={style.contactSectionWrapper}>{<ContactFooter />}</div>
      </div>
    </>
  );
};

export default FeaturePage;
