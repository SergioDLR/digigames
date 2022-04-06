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

  //Carga el cart guardado en el primer montado
  useEffect(() => {
    let cartLocal = localStorage.getItem("cart");
    if (cartLocal) setCartList(JSON.parse(cartLocal));
  }, []);

  //Modifica el cart guardado en el local Storage
  useEffect(() => updateStoragedCart(cartList), [cartList, setCartList]);
  //Modifica el cart guardado en el local Storage
  const updateStoragedCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <CartContext.Provider value={{ cartList, onAdd, removeItem, clearCart, isInCart, quantityItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
