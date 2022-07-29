import React, { useContext } from "react";
import { GContext } from "./CartContext";
import CartItem from "./CartItem";
import NavLink from "../Navigation/NavLink";
const Cart = () => {
  const { itemsCarrito, removeItem, clear, total } = useContext(GContext);
  const tot = total();
  return (
    <>
      {itemsCarrito.length === 0 ? (
        <>
          No hay items! Agrega algunos
          <NavLink directionPath="/">Volver</NavLink>
        </>
      ) : (
        <>
          {itemsCarrito.map((element) => (
            <CartItem item={element.item} quantity={element.quantity} removeItem={removeItem} />
          ))}
          <button className="bg-red-500 p-2 " onClick={() => clear()}>
            Vaciar carrito
          </button>
          <h1>El total de la compra es de : {tot}</h1>
        </>
      )}
    </>
  );
};

export default Cart;
