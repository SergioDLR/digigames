import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [quantityItems, setQuantity] = useState(0);
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

  const removeItem = (itemId) => {
    setCartList(cartList.filter((element) => element.item.id !== itemId));
  };

  const clearCart = () => {
    setCartList([]);
  };

  const isInCart = (item) => {
    let isIn = false;
    cartList.forEach((element) => {
      if (element.item.id === item.id) isIn = true;
    });
    return isIn;
  };

  useEffect(() => {
    const cartQuantity = () => {
      let cant = 0;
      cartList.forEach((element) => (cant = cant + element.quantity));
      setQuantity(cant);
      return cant;
    };

    cartQuantity();
  }, [cartList]);

  useEffect(() => {
    let cartLocal = localStorage.getItem("cart");
    if (cartLocal) setCartList(JSON.parse(cartLocal));
  }, []);

  useEffect(() => updateStoragedCart(cartList), [cartList, setCartList]);

  const updateStoragedCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const finalPrice = () =>
    parseFloat(
      cartList.reduce(
        (previousValue, currentValue) =>
          previousValue + parseFloat(currentValue.item.price) * parseInt(currentValue.quantity),
        0
      )
    );

  return (
    <CartContext.Provider value={{ cartList, onAdd, removeItem, clearCart, isInCart, quantityItems, finalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
