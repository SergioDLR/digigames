import React from "react";
import Icon from "../Utilities/Icon";
import shoppingCartImg from "assets/images/shopping-cart.png";
import hoverCartImg from "assets/images/shopping-cart-hover.png";
import { useCartContext } from "../Context/CartContext";
const CartWidget = ({ styles }) => {
  const { quantityItems } = useCartContext();
  return (
    <div className={`${quantityItems === 0 && "hidden "}  ${styles}`}>
      <div className={`absolute -translate-x-3 `}>
        <span className="text-xs bg-red-600 px-3 py-2 rounded-full opacity-80">
          <strong className="opacity-100">{quantityItems}</strong>
        </span>
      </div>
      <Icon sourceImage={shoppingCartImg} size="w-8" sourceHover={hoverCartImg} />
    </div>
  );
};

export default CartWidget;
