import React, { useState } from "react";
import Card from "../Utilities/Card";
import { NavLink } from "react-router-dom";
import Skeleton from "./Skeleton";
const Item = ({ item, loaded = false }) => {
  const initialValuesP = "hidden opacity-0";
  const initialValuesDiv = "shadow";
  const [animation, setAnimation] = useState(initialValuesP);
  const [animationDiv, setAnimationDiv] = useState(initialValuesDiv);

  const activeHover = () => {
    if (loaded) {
      setAnimation("opacity-100 ");
      setAnimationDiv("shadow-2xl");
    }
  };
  const desactiveHover = () => {
    if (loaded) {
      setAnimation(initialValuesP);
      setAnimationDiv(initialValuesDiv);
    }
  };

  const loadedContent = () => {
    const path = `/item/${item.id}`;
    return (
      <div className="transition-opacity  animate-load">
        <NavLink to={path}>
          <img src={item.pictureUrl} className="w-auto  max-w-full m-auto max-h-36" alt="product" />
          <h2 className="text-lg font-bold my-2 line-clamp-2">{item.title}</h2>
          <h3>$ {item.price}</h3>

          <p className={`transition-all ease-in-out line-clamp-2 inline-block text-xs  ${animation}`}>
            {item.description}
          </p>
        </NavLink>
      </div>
    );
  };
  return (
    <div
      className={`transition-all mx-auto ease-in-out ${animationDiv} w-11/12 h-fit m-5 `}
      onMouseEnter={() => activeHover()}
      onMouseLeave={() => desactiveHover()}
    >
      <Card>{loaded ? loadedContent() : <Skeleton />}</Card>
    </div>
  );
};

export default Item;
