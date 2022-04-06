import React, { useState, useEffect } from "react";
import Card from "../Utilities/Card";
import { useCartContext } from "../Context/CartContext";
import Button from "../Utilities/Button";
import { priceParser } from "../Utilities/priceParser";
import Modal from "../Utilities/Modal";
import { addDoc, collection, getFirestore, query, where, documentId, writeBatch, getDocs } from "firebase/firestore";
import ContactForm from "./ContactForm";
import Spinner from "components/Utilities/Spinner";
import { useAlert } from "react-alert";
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
      .catch((e) => console.log(e));
  }, []);
  const finalPrice = parseFloat(
    cartList.reduce(
      (previousValue, currentValue) =>
        previousValue + parseFloat(currentValue.item.price) * parseInt(currentValue.quantity),
      0
    )
  );

  const createOrder = () => {
    let order = {};
    const date = new Date();
    order.buyer = { orderName, orderPhone, orderMail };
    order.items = cartList.map((element) => {
      const { id, title, price } = element.item;
      const quantity = element.quantity;
      return { id, title, price, quantity };
    });
    order.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    order.total = finalPrice;

    return order;
  };

  const handleSubmitOrder = (evt) => {
    evt.preventDefault();
    if (orderMail === orderMailConfirm) {
      setFormSubmitLoading("loading");
      setFormTitle("Estamos procesando su orden!");
      setshowFormModalActions(false);

      const dbConnect = getFirestore();
      const queryCollection = collection(dbConnect, "orders");
      const order = createOrder();

      addDoc(queryCollection, order)
        .then(({ id }) => {
          if (id) {
            updateStocks(dbConnect);
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
          setFormTitle("Orden un error 😭");
          setshowFormModalActions(true);
          setFormSubmitLoading("error");
        });
    } else {
      alert.error("Los correos no coinciden"); //remplazar
    }
  };

  const updateStocks = async (dbConnect) => {
    const queryCollection = collection(dbConnect, "products");
    const queryStockUpdate = await query(
      queryCollection,
      where(
        documentId(),
        "in",
        cartList.map((e) => e.item.id)
      )
    );
    const batch = writeBatch(dbConnect);
    await getDocs(queryStockUpdate).then((resp) =>
      resp.docs.forEach((e) =>
        batch.update(e.ref, {
          stock: e.data().stock - cartList.find((element) => element.item.id === e.id).quantity,
        })
      )
    );
    batch.commit();
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
