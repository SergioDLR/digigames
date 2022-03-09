import React, { useState } from "react";
import Card from "../Utilities/Card";
const Item = ({ item, loaded = false }) => {
  const initialValuesP = "hidden opacity-0";
  const initialValuesDiv = "shadow";
  const [animation, setAnimation] = useState(initialValuesP);
  const [animationDiv, setAnimationDiv] = useState(initialValuesDiv);

  const activeHover = () => {
    setAnimation("opacity-100 ");
    setAnimationDiv("shadow-2xl");
  };
  const desactiveHover = () => {
    setAnimation(initialValuesP);
    setAnimationDiv(initialValuesDiv);
  };

  const unloadedContent = () => {
    return (
      <div className="animate-pulse flex flex-col mx-auto w-11/12 h-fit m-5 ">
        <div className="w-full bg-slate-400 h-36 "></div>
        <div className="h-3 my-1 bg-slate-400 rounded col-span-2"></div>
        <div className="h-3 my-1 bg-slate-400  rounded col-span-1"></div>
        <div className="h-3 my-1 bg-slate-400 rounded col-span-1"></div>
      </div>
    );
  };

  const loadedContent = () => {
    return (
      <>
        <img src={item.pictureUrl} className="w-auto  max-w-full m-auto max-h-36" alt="product" />
        <h2 className="text-lg font-bold my-2 line-clamp-2">{item.title}</h2>
        <h3>$ {item.price}</h3>
        <p className={`transition-all ease-in-out line-clamp-2 inline-block text-xs  ${animation}`}>
          {item.description}
        </p>
      </>
    );
  };
  return (
    <div
      className={`transition-all mx-auto ease-in-out ${animationDiv} w-11/12 h-fit m-5 `}
      onMouseEnter={() => activeHover()}
      onMouseLeave={() => desactiveHover()}
    >
      <Card>{loaded ? loadedContent() : unloadedContent()}</Card>
    </div>
  );
};

export default Item;
