import React, { useContext } from "react";
import Icon from "../Utilities/Icon";
import shoppingCartImg from "../../assets/images/shopping-cart.png";
import hoverCartImg from "../../assets/images/shopping-cart-hover.png";
import { Context } from "../Cart/CartContext";
const CartWidget = ({ styles }) => {
  const { carrito } = useContext(Context);
  return (
    <>
      <div className={styles}>
        <h2>{carrito.length}</h2>
        <Icon sourceImage={shoppingCartImg} size="w-8" sourceHover={hoverCartImg} />
      </div>
    </>
  );
};

export default CartWidget;
