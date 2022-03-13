import React, { useEffect, useState } from "react";
import productsJSON from "../products.json";
import ItemDetail from "./ItemDetail";
const ItemDetailContainer = () => {
  const [product, setProduct] = useState();
  const searchId = 3;
  useEffect(() => {
    let loadData = new Promise((resolve) => {
      setTimeout(() => resolve(productsJSON), 2000);
    });
    loadData.then((data) => setProduct(data.filter((pItem) => pItem.id === searchId).shift()));
  }, []);

  return (
    <>
      <ItemDetail item={product} />
    </>
  );
};

export default ItemDetailContainer;
