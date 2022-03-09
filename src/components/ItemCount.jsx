import React, { useState, useEffect } from "react";
import Button from "./Utilities/Button";
import Card from "./Utilities/Card";
import Icon from "./Utilities/Icon";
import addImg from "../assets/images/add-white.png";
import subImg from "../assets/images/sub-white.png";

const ItemCount = ({ productName = "placeholder", stock = 10, initial = 1 }) => {
  const [countProducts, setCountProducts] = useState(initial);

  useEffect(() => {
    if (initial > stock && stock > 0) {
      console.warn(`Initial value can't be bigger than stock`);
      setCountProducts(1);
    }
    if (stock === 0) setCountProducts(0);
  }, [initial, stock]);

  const addCount = () => {
    if (countProducts < stock) setCountProducts(countProducts + 1);
  };

  const subCount = () => {
    if (countProducts > 1) setCountProducts(countProducts - 1);
  };

  const onAdd = () => {
    if (countProducts > 0) console.log("Agregar:", countProducts);
  };

  return (
    <Card>
      <h2 className="text-center font-bold text-lg mb-3">{productName}</h2>
      <div className="flex flex-row justify-center">
        <Button rounded="rounded-full" action={subCount}>
          <Icon sourceImage={subImg} />
        </Button>
        <div className="flex-auto text-center m-auto">
          <span>{countProducts}</span>
        </div>
        <Button rounded="rounded-full " action={addCount}>
          <Icon sourceImage={addImg} />
        </Button>
      </div>
      <div className="flex justify-center">
        <Button title="Agregar al carrito" action={onAdd} />
      </div>
    </Card>
  );
};

export default ItemCount;