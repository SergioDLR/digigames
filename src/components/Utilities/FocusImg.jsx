import React from "react";
import Icon from "./Icon";
const FocusImg = ({ active = false, imgSource, close }) => {
  return (
    <>
      {active && (
        <div className={`absolute top-0 h-screen w-full bg-black-50 `}>
          <div
            className="absolute top-5 right-56 bg-black rounded-full p-5 cursor-pointer"
            onClick={() => close(false)}
          >
            <Icon sourceImage={"/images/cross.png"} size="w-10" />
          </div>
          <img src={imgSource} alt="" className="w-100 mx-auto mt-44" />
        </div>
      )}
    </>
  );
};

export default FocusImg;
