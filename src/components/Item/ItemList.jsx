import React, { useState, useEffect } from "react";
import Item from "./Item";

const ItemList = ({ items }) => {
  const [itemsJSON, setItemsJSON] = useState(false);

  useEffect(() => {
    let loadData = new Promise((resolve, reject) => {
      setTimeout(() => resolve(items), 2000);
    });
    loadData.then((items) => setItemsJSON(items));
  }, [items]);

  return (
    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-3/4 justify-center">
      {!itemsJSON ? (
        <>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </>
      ) : (
        itemsJSON.map((item) => {
          return <Item item={item} loaded={true} key={item.id} />;
        })
      )}
    </div>
  );
};

export default ItemList;
