import React, { useState, useEffect } from "react";
import Card from "../Utilities/Card";
import { useCartContext } from "../Context/CartContext";
import Button from "../Utilities/Button";
import { priceParser } from "../Utilities/priceParser";
import Modal from "../Utilities/Modal";
import { activeSesion } from "components/Firebase/activeSesion";
import BuyAsUser from "./BuyAsUser";
import BuyAsVisitor from "./BuyAsVisitor";

const CartInfo = () => {
  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState();
  const { cartList, clearCart, finalPrice } = useCartContext();

  useEffect(() => {
    activeSesion()
      .then((resp) => setUser(resp))
      .catch((e) => e);
  }, []);

  return (
    <div>
      <Card>
        <div className="flex flex-col ">
          <h1>Precio final: {priceParser(finalPrice())} $</h1>
          <Button
            bgColor="bg-red-600"
            hover="hover:bg-red-800"
            title={"Vaciar carrito"}
            action={() => setShowModal(true)}
          />
          {user ? (
            <BuyAsUser user={user} finalPrice={finalPrice()} cartList={cartList} clearCart={clearCart} />
          ) : (
            <BuyAsVisitor finalPrice={finalPrice()} cartList={cartList} clearCart={clearCart} />
          )}
        </div>
      </Card>
      <Modal
        title={"¿Estas seguro que deseas vaciar el carrito?"}
        description={"Se eliminaran todos los productos y sus cantidades. Tendras que iniciar tu compra desde 0."}
        showModal={showModal}
        onAcept={() => {
          clearCart();
          setShowModal(false);
        }}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default CartInfo;
