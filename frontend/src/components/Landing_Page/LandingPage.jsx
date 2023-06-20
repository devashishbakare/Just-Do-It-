import React from "react";
import style from "./landingPage.module.css";
import Navbar from "../Navbar/Navbar";
import FeaturePage from "../Feature_Page/FeaturePage";
const LandingPage = () => {
  localStorage.setItem("isLoggedIn", "false");
  return (
    <>
      <div className={style.landingPageContainer}>
        <div className={style.navbarContainer}>
          <Navbar />
        </div>
        <div className={style.featurePageContainer}>
          <FeaturePage />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
