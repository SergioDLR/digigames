import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
const ItemListContainer = ({ discount = false }) => {
  const [itemsJSON, setItemsJSON] = useState([]);
  const [emptyCategory, setEmptyCategory] = useState(false);
  const { catId } = useParams();
  const [loading, setLoading] = useState(false);

  const catIdSearch = catId;

  useEffect(() => {
    const dbFirebase = getFirestore();
    let mounted = true;
    const queryCollection = collection(dbFirebase, "products");

    const whereCreator = () => {
      if (catIdSearch) return where("category", "==", catIdSearch);
      if (discount) return where("discount", "==", true);
      return where("category", "!=", "nothing"); //no es optimo
    };
    const queryFilter = query(queryCollection, whereCreator());

    getDocs(queryFilter)
      .then((items) => {
        if (!items.empty && mounted) {
          setItemsJSON(items.docs.map((producto) => ({ id: producto.id, ...producto.data() })));
        } else setEmptyCategory(true);
        setLoading(true);
      })
      .catch((err) => console.log(err));
    return () => {
      setLoading(false);
      setEmptyCategory(false);
      mounted = false;
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
