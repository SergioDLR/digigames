import React, { useContext, useEffect, useState } from "react";
import { Context } from "./CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { carrito, clear, total } = useContext(Context);
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    setPrecioTotal(total());
  }, [carrito]);
  console.log(carrito);
  return (
    <>
      {carrito.length > 0 ? (
        <>
          {carrito.map((element) => (
            <CartItem item={element} />
          ))}
          <h2>{precioTotal}</h2>
          <button className="bg-red-300" onClick={clear}>
            Vaciar
          </button>
        </>
      ) : (
        <h2>No hay nada</h2>
      )}
    </>
  );
};

export default Cart;
