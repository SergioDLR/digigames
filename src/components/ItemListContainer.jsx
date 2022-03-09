import React from "react";

const ItemListContainer = ({ children }) => {
  return (
    <>
      <div className="flex flex-col  items-center bg-sky-100 font-Montserrat min-h-screen h-full">{children}</div>
    </>
  );
};

export default ItemListContainer;
