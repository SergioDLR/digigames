import React, { useEffect, useState } from "react";
import productsJSON from "../products.json";
import ItemDetail from "./ItemDetail";
const ItemDetailContainer = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const searchId = 3;
  useEffect(() => {
    let loadData = new Promise((resolve) => {
      setTimeout(() => resolve(productsJSON.filter((pItem) => pItem.id === searchId).shift()), 2000);
    });
    loadData.then((data) => {
      setProduct(data);
      setLoading(true);
    });
  }, []);

  return (
    <>
      <ItemDetail item={product} loading={loading} />
    </>
  );
};

export default ItemDetailContainer;
