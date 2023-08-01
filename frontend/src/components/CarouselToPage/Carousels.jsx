import React, { useState } from "react";
import style from "./carousels.module.css";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
const Carousels = ({ images }) => {
  const [moveLeft, setMoveLeft] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const navigate = useNavigate();
  const handleNextClick = () => {
    setMoveLeft(true);
    setTimeout(() => {
      setMoveLeft(false);
      setCurrIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 500); // Adjust the timeout value as per your transition duration
  };

  const handlePrevClick = () => {
    setMoveLeft(true);
    setTimeout(() => {
      setMoveLeft(false);
      setCurrIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }, 500); // Adjust the timeout value as per your transition duration
  };

  const getDisplayIndexes = () => {
    const prevIndex = (currIndex - 1 + images.length) % images.length;
    const nextIndex = (currIndex + 1) % images.length;
    const nextNextIndex = (currIndex + 2) % images.length;
    return [prevIndex, currIndex, nextIndex, nextNextIndex];
  };

  const displayedImages = getDisplayIndexes().map((index) => images[index]);

  return (
    <div className={style.container}>
      <div className={style.carouselWrapper}>
        {displayedImages.map((image, index) => (
          <div key={index} className={style.carouselBox}>
            <img
              className={style.curouselImage}
              src={image}
              alt="carousel_images"
              onClick={() => navigate("/shop")}
            />
          </div>
        ))}
      </div>

      <div className={style.prevButtonContainer} onClick={handlePrevClick}>
        <MdOutlineArrowBackIosNew className={style.carouselIcons} />
      </div>

      <div className={style.nextButtonContainer} onClick={handleNextClick}>
        <MdOutlineArrowForwardIos className={style.carouselIcons} />
      </div>
      {moveLeft && <></>}
    </div>
  );
};

export default Carousels;
