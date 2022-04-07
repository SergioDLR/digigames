import React, { useState, useEffect } from "react";
import Card from "../Utilities/Card";
import { useCartContext } from "../Context/CartContext";
import Button from "../Utilities/Button";
import { priceParser } from "../Utilities/priceParser";
import Modal from "../Utilities/Modal";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import ContactForm from "./ContactForm";
import Spinner from "components/Utilities/Spinner";
import { useAlert } from "react-alert";
import { createOrder, updateStocks } from "components/Firebase/OrderCreation";
import { activeSesion } from "components/Firebase/activeSesion";

const CartInfo = () => {
  //Modals  vars
  const [showModal, setShowModal] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [formTitle, setFormTitle] = useState("¿Terminar compra?");
  const [showCancelForm, setShowCancelForm] = useState(true);
  const [showFormModalActions, setshowFormModalActions] = useState(true);
  const [formSubmitLoading, setFormSubmitLoading] = useState("waiting");
  //Form vars
  const [orderName, setOrderName] = useState("");
  const [orderMail, setOrderMail] = useState("");
  const [orderMailConfirm, setOrderMailConfirm] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderId, setOrderId] = useState(0);
  //
  const [user, setUser] = useState();
  const { cartList, clearCart } = useCartContext();
  const alert = useAlert();
  useEffect(() => {
    activeSesion()
      .then((resp) => setUser(resp))
      .catch((e) => e);
  }, []);
  const finalPrice = parseFloat(
    cartList.reduce(
      (previousValue, currentValue) =>
        previousValue + parseFloat(currentValue.item.price) * parseInt(currentValue.quantity),
      0
    )
  );

  const handleSubmitOrder = (evt) => {
    evt.preventDefault();
    //casos de salida, los inputs no son correctos
    if (orderName.length < 1) {
      return alert.error("Ingrese un nombre valido");
    }
    if (orderPhone.length < 1) {
      return alert.error("Ingrese un telefono valido");
    }
    if (orderMail.length < 3 || !orderMail.includes("@") || typeof orderMail != "string") {
      return alert.error("Ingrese un email valido");
    }
    if (orderMail !== orderMailConfirm) {
      return alert.error("los mails no son iguales");
    }

    setFormSubmitLoading("loading");
    setFormTitle("Estamos procesando su orden!");
    setshowFormModalActions(false);

    const dbConnect = getFirestore();
    const queryCollection = collection(dbConnect, "orders");
    const order = createOrder(orderName, orderPhone, orderMail, finalPrice, cartList);

    addDoc(queryCollection, order)
      .then(({ id }) => {
        if (id) {
          updateStocks(dbConnect, cartList);
          setShowCancelForm(false);
          setOrderId(id);
          setFormSubmitLoading("ended");
          setshowFormModalActions(true);
          setFormTitle("Orden procesada!");
        }
      })
      .catch((err) => {
        console.log(err);
        setShowCancelForm(true);
        setFormTitle("Ocurrio un error 😭");
        setshowFormModalActions(true);
        setFormSubmitLoading("error");
      });
  };

  const acceptFormButton = () => {
    if (formSubmitLoading === "waiting")
      return (
        <input
          type="submit"
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
          form="create-order-form"
          value="enviar"
        />
      );
    return (
      <p
        onClick={() => {
          clearCart();
          setShowModalForm(false);
        }}
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        form="create-order-form"
      >
        Terminar
      </p>
    );
  };
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
          <Button
            action={() => setShowModalForm(true)}
            bgColor="bg-green-600"
            hover="hover:bg-green-800"
            title={"Terminar compra"}
          />
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
      <Modal
        title={formTitle}
        showModal={showModalForm}
        setShowModal={setShowModalForm}
        showActions={showFormModalActions}
        acceptButton={acceptFormButton()}
        showCancel={showCancelForm}
      >
        {formSubmitLoading === "waiting" && (
          <ContactForm
            sesion={user}
            handleSubmitOrder={handleSubmitOrder}
            setOrderName={setOrderName}
            setOrderMail={setOrderMail}
            setOrderPhone={setOrderPhone}
            setOrderMailConfirm={setOrderMailConfirm}
          />
        )}
        {formSubmitLoading === "loading" && <Spinner />}
        {formSubmitLoading === "ended" && <h2>Felicitaciones!, su compra fue un exito id de compra {orderId}</h2>}
        {formSubmitLoading === "error" && <h2>Lamentablemente ocurrio un error, intente mas tarde</h2>}
      </Modal>
    </div>
  );
};

export default CartInfo;
