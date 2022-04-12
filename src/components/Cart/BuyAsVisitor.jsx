import React, { useState } from "react";
import ContactForm from "./ContactForm";
import Button from "components/Utilities/Button";
import Modal from "components/Utilities/Modal";
import { useAlert } from "react-alert";
import { submitOrder } from "components/Firebase/OrderCreation";
const BuyAsVisitor = ({ finalPrice, cartList, clearCart }) => {
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [mail, setMail] = useState("");
  const [mailConfirm, setMailConfirm] = useState("");
  const alert = useAlert();
  const submitingMensage = {
    title: "Creando orden",
    form: false,
    show: false,
    showCancel: false,
    description: "Estamos creando su orden, por favor espere.",
  };
  const defError = {
    title: "Ocurrio un error",
    show: true,
    showCancel: false,
    description: `Ocurrio un error por favor intentalo mas tarde`,
    action: () => clearCart(),
  };
  const errorStock = {
    title: "No queda stock",
    form: false,
    show: true,
    showCancel: false,
    description: `No queda stock suficiente de los items seleccionados, inicie de nuevo la compra`,
    action: () => clearCart(),
  };
  const handleSubmitOrder = (evt) => {
    evt.preventDefault();
    if (name.length < 3) return alert.error("Ingrese un nombre valido");
    if (phone.length < 4) return alert.error("Ingrese un numero de telefono valido");
    if (mail.length < 4 || !mail.includes("@")) return alert.error("Ingrese un email valido");
    if (mail !== mailConfirm) return alert.error("El emails no son iguales");
    setModalMensage(submitingMensage);
    submitOrder(name, phone, mail, finalPrice, cartList)
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
      });
  };
  const waitingMensage = {
    title: "Terminar compra",
    form: true,
    show: true,
    showCancel: true,
    description: `Necesitamos algunos datos para finalizar la compra.`,
    actionButton: () => (
      <input
        type="submit"
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        form="create-order-form"
        value="enviar"
      />
    ),
  };
  //Fix cancelation
  const [modalMensage, setModalMensage] = useState(waitingMensage);
  return (
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
        description={modalMensage.description}
        showActions={modalMensage.show}
        onAcept={modalMensage.action}
        acceptButton={modalMensage.actionButton}
        showCancel={modalMensage.showCancel}
      >
        {modalMensage.form && (
          <ContactForm
            setOrderName={setName}
            setOrderPhone={setPhone}
            setOrderMail={setMail}
            setOrderMailConfirm={setMailConfirm}
            handleSubmitOrder={handleSubmitOrder}
          />
        )}
      </Modal>
    </>
  );
};

export default BuyAsVisitor;
