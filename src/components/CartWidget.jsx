import React from "react";
import Icon from "./Icon";
import shoppingCartImg from "../assets/images/shopping-cart.png";
import hoverCartImg from "../assets/images/shopping-cart-hover.png";
const CartWidget = ({ styles }) => {
  return (
    <div className={styles}>
      <Icon sourceImage={shoppingCartImg} size="w-8" sourceHover={hoverCartImg} />
    </div>
  );
};

export default CartWidget;
