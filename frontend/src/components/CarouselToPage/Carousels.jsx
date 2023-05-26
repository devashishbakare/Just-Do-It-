import React, { useState } from "react";
import style from "./carousels.module.css";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
const Carousels = () => {
  const [moveLeft, setMoveLeft] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const images = [
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/8b8054bd-e5e4-4c0d-9c6b-79c57367b041/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/1d682443-c8ba-453b-8f3a-c53d8e76ea41/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/6ae71b3c-8d00-4242-9781-11a2f97c8910/nike-just-do-it.jpg",
  ];

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
    </div>
  );
};

export default Carousels;
