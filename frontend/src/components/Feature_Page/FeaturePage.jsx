import React from "react";
import style from "./featurePage.module.css";
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
      </div>
    </>
  );
};

export default FeaturePage;
