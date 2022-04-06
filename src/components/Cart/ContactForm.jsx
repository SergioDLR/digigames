import React, { useEffect } from "react";
const ContactForm = ({ handleSubmitOrder, setOrderName, setOrderMail, setOrderPhone, setOrderMailConfirm, sesion }) => {
  useEffect(() => {
    if (sesion !== undefined) {
      setOrderName(sesion.displayName);
      setOrderMail(sesion.email);
      setOrderMailConfirm(sesion.email);
      setOrderPhone(sesion.phoneNumber);
    }
  }, []);
  return (
    <form onSubmit={handleSubmitOrder} id="create-order-form">
      {sesion === undefined ? (
        <>
          <h2>Necesitamos algunos datos para finalizar la compra</h2>

          <div className="flex flex-col ">
            <label>
              <input
                type="text"
                className="block w-full border-2 rounded-md px-2 py-3"
                placeholder={"Nombre y apellido"}
                required
                onChange={(e) => setOrderName(e.target.value)}
              />
            </label>
            <label>
              <input
                type="email"
                className="block w-full border-2 rounded-md px-2 py-3 mt-2"
                placeholder={"Correo"}
                required
                onChange={(e) => setOrderMail(e.target.value)}
              />
            </label>
            <label>
              <input
                type="email"
                className="block w-full border-2 rounded-md px-2 py-3 my-2"
                placeholder={"Confirma el correo"}
                required
                onChange={(e) => setOrderMailConfirm(e.target.value)}
              />
            </label>
            <label>
              <input
                type="number"
                className="block w-full border-2 rounded-md px-2 py-3  "
                placeholder={"Telefono"}
                required
                onChange={(e) => setOrderPhone(e.target.value)}
              />
            </label>
          </div>
        </>
      ) : (
        <h2>Estas comprando como : {sesion.displayName}</h2>
      )}
    </form>
  );
};

export default ContactForm;
