import React, { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const onAdd = (item, count) => {
    let quantity = count;
    cartList.forEach((element, index) => {
      if (element.item.id === item.id) {
        quantity = quantity + element.quantity;
        setCartList(cartList.splice(index, 1));
      }
    });
    setCartList([...cartList, { item, quantity }]);
  };

  const removeItem = (item) => {
    setCartList(cartList.filter((element) => element.item.id !== item));
  };

  const clear = () => {
    setCartList([]);
  };

  const isInCart = (item) => {
    let isIn = false;
    cartList.forEach((element) => {
      if (element.item.id === item.id) isIn = true;
    });
    return isIn;
  };
  return (
    <CartContext.Provider value={{ cartList, onAdd, removeItem, clear, isInCart }}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
