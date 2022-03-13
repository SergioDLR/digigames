import React, { useEffect, useState } from "react";
import productsJSON from "../products.json";
import ItemDetail from "./ItemDetail";
const ItemDetailContainer = () => {
  const [product, setProduct] = useState();
  const searchId = 3;
  useEffect(() => {
    setTimeout(() => {
      setProduct(productsJSON.filter((pItem) => pItem.id === searchId).shift());
    }, 2000);
  }, []);

  return (
    <>
      <ItemDetail item={product} />
    </>
  );
};

export default ItemDetailContainer;
