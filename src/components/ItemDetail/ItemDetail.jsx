import React from "react";
import Skeleton from "../Item/Skeleton";
import Card from "../Utilities/Card";
import Button from "../Utilities/Button";
const ItemDetail = ({ item, loading }) => {
  return (
    <div className=" w-1/2 m-auto mt-3">
      <Card>
        {loading ? (
          <>
            <div className="flex">
              <div className="ml-auto">
                <img src={item.pictureUrl} alt="" />
              </div>
              <div className="flex flex-col w-1/2 ml-auto">
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
