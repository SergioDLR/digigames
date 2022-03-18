import React from "react";
import Icon from "./Icon";
import CrossImg from "../../assets/images/cross.png";
const FocusImg = ({ active = false, imgSource, close }) => {
  return (
    <>
      {active && (
        <div className={`absolute top-0 h-screen w-full bg-black-50 `}>
          <div
            className="absolute top-5 right-56 bg-black rounded-full p-5 cursor-pointer"
            onClick={() => close(false)}
          >
            <Icon sourceImage={CrossImg} size="w-10" />
          </div>
          <img src={imgSource} alt="" className="w-100 mx-auto mt-44" />
        </div>
      )}
    </>
  );
};

export default FocusImg;
