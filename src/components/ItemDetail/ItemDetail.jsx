import React, { useState } from "react";
import Skeleton from "../Item/Skeleton";
import Card from "../Utilities/Card";
import Button from "../Utilities/Button";
import ItemCount from "./ItemCount";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../Context/CartContext";
import { priceParser } from "../Utilities/priceParser";
import AddToWishList from "./AddToWishList";

const ItemDetail = ({ item, loading, activeFunction = () => {} }) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(true);
  const { onAdd } = useCartContext();

  const Product = () => {
    if (item.title === undefined) {
      return <h1>Parece que este producto no existe</h1>;
    } else {
      return (
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
              <h2 className="text-xl font-bold ">$ {priceParser(item.price)}</h2>
              <h3 className="text-base">{item.description}</h3>
              <AddToWishList item={item} />
              {added ? (
                <ItemCount product={item} stock={item.stock} onAdd={onAdd} setAdded={() => setAdded(false)} />
              ) : (
                <div className="mt-auto">
                  <Button title="Continuar comprando" action={() => navigate(-1)} />
                  <Button
                    title="Terminar mi compra"
                    bgColor="bg-blue-600"
                    hover="hover:bg-sky-800"
                    action={() => navigate("/cart")}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <div className="w-3/4 xl:w-1/2 m-auto mt-3  ">
      <Card>{loading ? <Product /> : <Skeleton />}</Card>
    </div>
  );
};

export default ItemDetail;
