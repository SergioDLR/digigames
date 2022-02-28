import React from "react";
const ItemListContainer = ({ greeting }) => {
  return (
    <div className="flex justify-center bg-sky-600 text-white font-Montserrat">
      <h1 className="p-10">{greeting}</h1>
    </div>
  );
};

export default ItemListContainer;
