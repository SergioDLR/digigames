import React, { useState, useEffect } from "react";
import Button from "./Utilities/Button";
import Card from "./Utilities/Card";
import Icon from "./Utilities/Icon";
import addImg from "../assets/images/add-white.png";
import subImg from "../assets/images/sub-white.png";

const ItemCount = ({ productName = "placeholder", stock = 10, initial = 1, onAdd = () => {} }) => {
  const [countProducts, setCount] = useState(initial);

  useEffect(() => {
    if (initial > stock) {
      console.warn(`Initial value can't be bigger than stock`);
      setCount(1);
    }
  }, [initial, stock]);

  const sumar = () => {
    if (countProducts < stock) {
      setCount(countProducts + 1);
      onAdd();
    }
  };

  const restar = () => {
    if (countProducts > 1) setCount(countProducts - 1);
  };

  return (
    <Card>
      <h2 className="text-center font-bold text-lg mb-3">{productName}</h2>
      <div className="flex flex-row justify-center">
        <Button rounded="rounded-full" action={restar}>
          <Icon sourceImage={subImg} />
        </Button>
        <div className="flex-auto text-center m-auto">
          <span>{countProducts}</span>
        </div>
        <Button rounded="rounded-full " action={sumar}>
          <Icon sourceImage={addImg} />
        </Button>
      </div>
      <div className="flex justify-center">
        <Button title="Agregar al carrito" />
      </div>
    </Card>
  );
};

export default ItemCount;
