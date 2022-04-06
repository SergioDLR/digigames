import React from "react";
import Icon from "../Utilities/Icon";
import trashImg from "../../assets/images/trash-white.png";
import Card from "../Utilities/Card";
import Button from "../Utilities/Button";
import { useCartContext } from "../Context/CartContext";
import { priceParser } from "../Utilities/priceParser";

const CartDetail = ({ itemId, title, quantity, price, image, canDelete = true }) => {
  const { removeItem } = useCartContext();
  return (
    <div className="mt-2 w-full ">
      <Card>
        <div className="flex flex-row  ">
          <div className="w-24 h-24 ">{image && <img className="w-3/4 m-auto  " src={image} alt={image} />}</div>
          <div className="mx-5">
            <h2 className="text-xl font-bold sm:line-clamp-1 line-clamp-2 ">{title}</h2>
            <h3>Precio: {priceParser(price)} $</h3>
            <h3>Cantidad: {quantity}</h3>
            {canDelete && (
              <Button action={() => removeItem(itemId)}>
                <Icon sourceImage={trashImg} />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartDetail;
