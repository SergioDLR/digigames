import React, { useState, useEffect } from "react";
import Button from "components/Utilities/Button";
import Card from "components/Utilities/Card";
import Icon from "components/Utilities/Icon";

const ItemCount = ({ product, stock = 10, initial = 1, onAdd, setAdded }) => {
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

  return (
    <Card>
      {stock > 0 ? (
        <>
          {" "}
          <div className="flex flex-row justify-center">
            <Button rounded="rounded-full" action={subCount}>
              <Icon sourceImage={"/images/sub-white.png"} />
            </Button>
            <div className="flex-auto text-center m-auto">
              <span>{countProducts}</span>
            </div>
            <Button rounded="rounded-full " action={addCount}>
              <Icon sourceImage={"/images/add-white.png"} />
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              title="Agregar al carrito"
              action={() => {
                onAdd(product, countProducts);
                setAdded();
              }}
            />
          </div>{" "}
        </>
      ) : (
        <>
          <p className="text-red-600 text-center">No hay stock de este articulo 🙁</p>
        </>
      )}
    </Card>
  );
};

export default ItemCount;
