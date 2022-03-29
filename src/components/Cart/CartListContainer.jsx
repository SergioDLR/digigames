import React from "react";
import { useCartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../Utilities/Button";
import CartDetail from "./CartDetail";
import CartInfo from "./CartInfo";
const CartListContainer = () => {
  const { cartList } = useCartContext();

  const navigate = useNavigate();
  return (
    <div className="bg-sky-100 min-h-screen pt-2">
      {cartList.length > 0 ? (
        <div className="w-8/12 m-auto animate-load">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-3/12 mt-2 md:mr-auto">
              <CartInfo cartList={cartList} />
            </div>
            <div className="flex flex-col md:w-8/12">
              {cartList.map((element) => (
                <div>
                  <CartDetail
                    title={element.item.title}
                    itemId={element.item.id}
                    quantity={element.quantity}
                    image={element.item.pictureUrl}
                    price={element.item.price}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl">Parece que aun no agregaste nada en tu carrito.😢</h2>
          <Button title="Seguir comprando!" action={() => navigate("/")} />
        </div>
      )}
    </div>
  );
};

export default CartListContainer;
