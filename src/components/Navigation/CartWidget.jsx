import React, { useContext } from "react";
import Icon from "../Utilities/Icon";
import shoppingCartImg from "../../assets/images/shopping-cart.png";
import hoverCartImg from "../../assets/images/shopping-cart-hover.png";
import { GContext } from "../Cart/CartContext";
const CartWidget = ({ styles }) => {
  const { itemsCarrito } = useContext(GContext);
  return (
    <>
      {itemsCarrito.length === 0 ? (
        <></>
      ) : (
        <div className={styles}>
          <Icon sourceImage={shoppingCartImg} size="w-8" sourceHover={hoverCartImg} />
        </div>
      )}
    </>
  );
};

export default CartWidget;
