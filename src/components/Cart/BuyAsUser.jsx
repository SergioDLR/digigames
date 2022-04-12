import React, { useState, useEffect } from "react";
import Modal from "components/Utilities/Modal";
import Button from "components/Utilities/Button";
import { getPhone } from "components/Firebase/activeSesion";
import Spinner from "components/Utilities/Spinner";
import { submitOrder } from "components/Firebase/OrderCreation";
const BuyAsUser = ({ user, finalPrice, cartList, clearCart }) => {
  const submitingMensage = {
    title: "Creando orden",
    show: false,
    showCancel: false,
    description: `Estamos creando su orden, espere por favor`,
  };
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorStock = {
    title: "No queda stock",
    show: true,
    showCancel: false,
    description: `No queda stock suficiente de los items seleccionados, inicie de nuevo la compra`,
    action: () => clearCart(),
  };
  const defError = {
    title: "Ocurrio un error",
    show: true,
    showCancel: false,
    description: `Ocurrio un error por favor intentalo mas tarde`,
    action: () => clearCart(),
  };
  useEffect(() => {}, []);
  const submitHandler = () => {
    setModalMensage(submitingMensage);
    getPhone()
      .then((res) => {
        submitOrder(user.displayName, res, user.email, finalPrice, cartList)
          .then((res) => {
            const finishedMensaje = {
              title: "Compra finalizada",
              show: true,
              showCancel: false,
              description: `Su compra fue realizada correctamente su id es: ${res}`,
              action: () => {
                clearCart();
                setShowModal(false);
              },
            };
            setModalMensage(finishedMensaje);
          })
          .catch((e) => {
            if (e.code === 401) setModalMensage(errorStock);
            else setModalMensage(defError);
          })
          .finally();
      })
      .catch((e) => e)
      .finally(() => setLoading(false));
  };
  const waitingMensage = {
    title: "Terminar compra",
    show: true,
    showCancel: true,
    description: `Estas comprando como ${user?.displayName}`,
    action: () => submitHandler(),
  };
  const [modalMensage, setModalMensage] = useState(waitingMensage);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Button
            action={() => setShowModal(true)}
            bgColor="bg-green-600"
            hover="hover:bg-green-800"
            title={"Terminar compra"}
          />
          <Modal
            title={modalMensage.title}
            showModal={showModal}
            setShowModal={setShowModal}
            showCancel={modalMensage.showCancel}
            description={modalMensage.description}
            showActions={modalMensage.show}
            onAcept={modalMensage.action}
          />
        </>
      )}
    </>
  );
};

export default BuyAsUser;
