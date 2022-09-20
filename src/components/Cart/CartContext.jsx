import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const CartContext = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  useEffect(() => {
    //Traer desde el local storage el carrito
  }, []);

  const addItem = (item, quantity) => {
    const anterior = isInCart(item.id);
    if (anterior) {
      const arreglo = carrito.filter((e) => e.id !== item.id);
      item.quantity = quantity + anterior.quantity;
      arreglo.push(item);
      setCarrito(arreglo);
    } else {
      item.quantity = quantity;
      setCarrito([...carrito, item]);
    }
    //Guardas el carrito en el local storage
  };

  const isInCart = (itemId) => {
    return carrito.find((e) => e.id === itemId);
  };

  const clear = () => {
    setCarrito([]);
  };

  const removeItem = (itemId) => {
    setCarrito(carrito.filter((e) => e.id !== itemId));
  };

  const total = () => {
    let tot = 0;
    carrito.forEach((item) => {
      tot = tot + item.price * item.quantity;
    });
    return tot;
  };

  return <Context.Provider value={{ addItem, carrito, clear, removeItem, total }}>{children}</Context.Provider>;
};

export default CartContext;
