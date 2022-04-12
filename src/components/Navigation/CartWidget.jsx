import React from "react";
import Icon from "../Utilities/Icon";

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
      <Icon sourceImage={"/images/shopping-cart.png"} size="w-8" sourceHover={"/images/shopping-cart-hover.png"} />
    </div>
  );
};

export default CartWidget;
