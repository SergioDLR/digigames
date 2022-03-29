import React, { useState } from "react";
import Card from "../Utilities/Card";
import { useCartContext } from "../Context/CartContext";
import Button from "../Utilities/Button";
import { priceParser } from "../Utilities/priceParser";
import Modal from "../Utilities/Modal";
const CartInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const { cartList, clearCart } = useCartContext();
  const finalPrice = Math.floor(
    parseFloat(
      cartList.reduce(
        (previousValue, currentValue) =>
          previousValue + parseFloat(currentValue.item.price) * parseInt(currentValue.quantity),
        0
      )
    )
  );
  return (
    <div>
      <Card>
        <div className="flex flex-col ">
          <h1>Precio final: {priceParser(finalPrice)} $</h1>
          <Button
            bgColor="bg-red-600"
            hover="hover:bg-red-800"
            title={"Vaciar carrito"}
            action={() => setShowModal(true)}
          />
          <Button bgColor="bg-green-600" hover="hover:bg-green-800" title={"Terminar compra"} />
        </div>
      </Card>
      <Modal
        title={"¿Estas seguro que deseas vaciar el carrito?"}
        description={"Se eliminaran todos los productos y sus cantidades. Tendras que iniciar tu compra desde 0."}
        showModal={showModal}
        onAcept={clearCart}
        setShowModal={setShowModal}
      >
        dsadas
      </Modal>
    </div>
  );
};

export default CartInfo;
