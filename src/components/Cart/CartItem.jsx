import React from "react";
const CartItem = ({ item, quantity, removeItem }) => {
  return (
    <div className="flex">
      {item.title} - {item.price} - {quantity}
      <button className="bg-red-400 rounded-lg p-2" onClick={() => removeItem(item.id)}>
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;
