import React from "react";

const ContactForm = ({ setOrderName, setOrderMail, setOrderMailConfirm, setOrderPhone, handleSubmitOrder }) => {
  return (
    <form onSubmit={handleSubmitOrder} id="create-order-form">
      <>
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
    </form>
  );
};

export default ContactForm;
