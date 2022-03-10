import React, { useEffect, useState } from "react";
import ItemList from "./Item/ItemList";
import productsJSON from "./products.json";
const ItemListContainer = () => {
  const [itemsJSON, setItemsJSON] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let loadData = new Promise((resolve) => {
      setTimeout(() => resolve(productsJSON), 2000);
    });

    loadData.then((items) => {
      setItemsJSON(items);
      setLoading(true);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col  items-center bg-sky-100 font-Montserrat min-h-screen h-full">
        <ItemList items={itemsJSON} loaded={loading} />
      </div>
    </>
  );
};

export default ItemListContainer;
