import React from "react";
import Item from "./Item";

const ItemList = ({ items, loaded = false }) => {
  return (
    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-3/4 justify-center">
      {!loaded ? (
        <>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </>
      ) : (
        items.map((item) => {
          return <Item item={item} loaded={true} key={item.id} />;
        })
      )}
    </div>
  );
};

export default ItemList;
