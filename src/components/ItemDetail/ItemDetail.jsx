import React from "react";
import Skeleton from "../Item/Skeleton";
import Card from "../Utilities/Card";
import Button from "../Utilities/Button";
const ItemDetail = ({ item, loading, activeFunction }) => {
  return (
    <div className="w-3/4 xl:w-1/2 m-auto mt-3  ">
      <Card>
        {loading ? (
          <>
            <div className="lg:flex sm:flex-col lg:flex-row animate-load ">
              <div className="lg:ml-auto">
                <img
                  className="w-auto m-auto cursor-pointer "
                  src={item.pictureUrl}
                  alt=""
                  onClick={() => activeFunction(item.pictureUrl)}
                />
              </div>
              <div className="sm:flex sm:flex-col  lg:w-1/2 lg:ml-auto">
                <h1 className="text-2xl font-bold mt-2">{item.title}</h1>
                <h2 className="text-xl font-bold ">$ {item.price}</h2>
                <h3 className="text-base my-auto">{item.description}</h3>
                <Button title="Comprar" />
              </div>
            </div>
          </>
        ) : (
          <Skeleton />
        )}
      </Card>
    </div>
  );
};

export default ItemDetail;
