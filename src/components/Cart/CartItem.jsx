import React, { useContext } from "react";
import { Context } from "./CartContext";

const CartItem = ({ item }) => {
  const { removeItem } = useContext(Context);

  const handleBorrar = () => {
    removeItem(item.id);
  };

  return (
    <>
      <h2>
        {item.title} - cantidad: {item.quantity} - precio: {item.price}
      </h2>
      <button className="bg-red-900 rounded-full" onClick={handleBorrar}>
        Borrar
      </button>
    </>
  );
};

export default CartItem;
