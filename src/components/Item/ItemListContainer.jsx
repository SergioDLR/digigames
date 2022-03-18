import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import productsJSON from "../products.json";
const ItemListContainer = ({ discount = false }) => {
  const [itemsJSON, setItemsJSON] = useState([]);
  const [emptyCategory, setEmptyCategory] = useState(false);
  const { catId } = useParams();
  const [loading, setLoading] = useState(false);

  const catIdSearch = catId;

  useEffect(() => {
    let timeOutID;
    let loadData = new Promise((resolve) => {
      if (catIdSearch) {
        timeOutID = setTimeout(() => resolve(productsJSON.filter((item) => item.category === catIdSearch)), 2000);
      } else timeOutID = setTimeout(() => resolve(productsJSON), 2000);
    });

    loadData.then((items) => {
      if (items.length > 0) {
        if (discount) setItemsJSON(items.filter((i) => i.discount === true));
        else setItemsJSON(items);
      } else setEmptyCategory(true);
      setLoading(true);
    });
    return () => {
      setLoading(false);
      setEmptyCategory(false);
      clearTimeout(timeOutID);
    };
  }, [catIdSearch, discount]);

  return (
    <>
      <div className="flex flex-col  items-center bg-sky-100 font-Montserrat min-h-screen h-full">
        {emptyCategory ? (
          <div className="mt-5">
            <h1 className="text-2xl">Lo sentimos, no tenemos articulos para esta categoria</h1>
            <h1 className="text-2xl text-center">😔</h1>
          </div>
        ) : (
          <ItemList items={itemsJSON} loaded={loading} />
        )}
      </div>
    </>
  );
};

export default ItemListContainer;
