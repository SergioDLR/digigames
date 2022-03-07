import React from "react";
const ItemListContainer = ({ greeting, children }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-sky-100 font-Montserrat">
        <h1 className="p-10">{greeting}</h1>
        {children}
      </div>
    </>
  );
};

export default ItemListContainer;
