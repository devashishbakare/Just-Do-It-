import React, { useState } from "react";
import style from "./featurePage.module.css";
import ContactFooter from "../ContactSection/ContactFooter";
import Carousel from "../CarouselToPage/Carousels";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
const FeaturePage = () => {
  const navigate = useNavigate();
  const featureStyleImages = [
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/8b8054bd-e5e4-4c0d-9c6b-79c57367b041/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/1d682443-c8ba-453b-8f3a-c53d8e76ea41/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/6ae71b3c-8d00-4242-9781-11a2f97c8910/nike-just-do-it.jpg",
  ];

  const sampleProduct = [
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1fdea7e6-25a7-4eca-97d3-1dcb3d6927ce/air-force-1-07-lv8-shoes-9KwrSk.png",
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22beef05-be64-43cd-92a9-6406114a261d/dunk-low-shoes-sggKLb.png",
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/627df3e6-5ed6-47e9-a38a-8d5e139712bb/e-series-1-shoes-j57hxR.png",
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a917b369-a445-4ecc-8bef-a9c6f1b7e90a/tech-hera-shoes-PQQ9Lq.png",
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f73d8888-7d7c-44e7-aa3d-c51414a9b8a2/air-zoom-pegasus-40-older-road-running-shoes-S0gQ5F.png",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleCarousel = (direction, imageArray) => {
    if (direction === "prev") {
      // console.log("index " + currentImageIndex);
      setCurrentImageIndex(
        currentImageIndex === 0 ? imageArray.length - 1 : currentImageIndex - 1
      );
    } else {
      setCurrentImageIndex(
        currentImageIndex === imageArray.length - 1 ? 0 : currentImageIndex + 1
      );
    }
  };

  return (
    <>
      <div className={style.featurePageContainer}>
        <div className={style.featureVedioWrapper}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Sp3Xkbnvz50?mute=1&autoplay=1&loop=2"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
              className={`${style.shopButton} ${style.TopButton}`}
              onClick={() => navigate("/shop")}
            >
              Shop
            </button>
          </div>
        </div>

        <div className={style.nikeFashionCarouselContainer}>
          <Carousel images={featureStyleImages} />
        </div>
        <div className={style.singleImageCarouselContainer}>
          <div className={style.carouselImageWrapper}>
            <img
              src={featureStyleImages[currentImageIndex]}
              alt="shoeImage"
              className={style.imageWrapper}
              onClick={() => navigate("/shop")}
            />
            <div
              className={style.prevButtonContainer}
              onClick={() => handleCarousel("prev", featureStyleImages)}
            >
              <MdOutlineArrowBackIosNew className={style.carouselIcons} />
            </div>
            <div
              className={style.nextButtonContainer}
              onClick={() => handleCarousel("next", featureStyleImages)}
            >
              <MdOutlineArrowForwardIos className={style.carouselIcons} />
            </div>
          </div>
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

        <div className={style.letestTrendWrapper}>
          <span className={style.latestTrendSmallHeading}>
            Air Jordan 1 High OG
          </span>
          <span className={style.latestTrendBigHeading}>
            to take flight you don't need a cape
          </span>
          <button
            className={style.latestTrendShopButton}
            onClick={() => navigate("/shop")}
          >
            Shop
          </button>
        </div>
        <div className={style.productDisplayContainer}>
          <div className={style.productDisplayWrapper}>
            <div className={style.productDisplay}>
              <img
                className={style.latestImage}
                src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_599,c_limit/626b0c7b-229e-42af-8423-6dfe69225f75/image.jpg"
                alt="product_Img"
              />
              <button
                className={style.eseentialsShopButton}
                onClick={() => navigate("/shop")}
              >
                Men
              </button>
            </div>
            <div className={style.productDisplay}>
              <img
                className={style.latestImage}
                src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_599,c_limit/e9983b9c-39e0-4046-ba80-cee310200176/image.jpg"
                alt="product_Img"
              />
              <button
                className={style.eseentialsShopButton}
                onClick={() => navigate("/shop")}
              >
                Women
              </button>
            </div>
            <div className={style.productDisplay}>
              <img
                className={style.latestImage}
                src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_599,c_limit/b82dfc38-539f-424b-8981-0d9a4315917c/image.jpg"
                alt="product_Img"
              />
              <button
                className={style.eseentialsShopButton}
                onClick={() => navigate("/shop")}
              >
                Kid
              </button>
            </div>
          </div>
        </div>

        <div className={style.shoeFeatureCarouselContainer}>
          <Carousel images={sampleProduct} />
        </div>

        <div className={style.singleImageCarouselContainer}>
          <div className={style.carouselImageWrapper}>
            <img
              src={sampleProduct[currentImageIndex]}
              alt="shoeImage"
              className={style.imageWrapper}
              onClick={() => navigate("/shop")}
            />
            <div
              className={style.prevButtonContainer}
              onClick={() => handleCarousel("prev", sampleProduct)}
            >
              <MdOutlineArrowBackIosNew className={style.carouselIcons} />
            </div>
            <div
              className={style.nextButtonContainer}
              onClick={() => handleCarousel("next", sampleProduct)}
            >
              <MdOutlineArrowForwardIos className={style.carouselIcons} />
            </div>
          </div>
        </div>

        <div className={style.contactSectionWrapper}>{<ContactFooter />}</div>
      </div>
    </>
  );
};

export default FeaturePage;
