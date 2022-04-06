import React, { useState } from "react";
import Button from "components/Utilities/Button";
import { register } from "components/Firebase/register";
import { useAlert } from "react-alert";
import { activeSesion } from "components/Firebase/activeSesion";
const Register = ({ setUser }) => {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [mailConfirm, setMailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");

  const [phone, setPhone] = useState();
  const alert = useAlert();
  const handleLogin = (evt) => {
    evt.preventDefault();
    if (mail === mailConfirm && password === passwordConfirm)
      register(mail, password, name, phone)
        .then((res) => {
          alert.success("Registrado con exito sesion");
          activeSesion().then((server) => setUser(server));
        })
        .catch((error) => alert.error(error));
    else if (mail !== mailConfirm) alert.error("Verifica que el mail de confirmacion sea igual al mail");
    else if (password !== passwordConfirm) alert.error("Verifica que las contraseñas sean iguales");
  };
  return (
    <div className="lg:w-5/12 lg:ml-auto mt-2">
      <h1 className="text-bold">Registrar</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          required
          className="block w-full border-2 rounded-md px-2 py-3 mt-2"
          placeholder={"Nombre y apellido"}
          onChange={(evt) => setName(evt.target.value)}
        />
        <input
          type="password"
          required
          className="block w-full border-2 rounded-md px-2 py-3 mt-2"
          placeholder={"Ingresa una contraseña"}
          autoComplete="password"
          minLength="6"
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <input
          type="password"
          required
          className="block w-full border-2 rounded-md px-2 py-3 mt-2"
          placeholder={"Confirma la contraseña"}
          autoComplete="password"
          minLength="6"
          onChange={(evt) => setpasswordConfirm(evt.target.value)}
        />
        <input
          type="email"
          required
          className="block w-full border-2 rounded-md px-2 py-3 mt-2"
          placeholder={"Direccion de correo"}
          onChange={(evt) => setMail(evt.target.value)}
        />
        <input
          type="email"
          required
          className="block w-full border-2 rounded-md px-2 py-3 mt-2"
          placeholder={"Confirma la direccion de correo"}
          onChange={(evt) => setMailConfirm(evt.target.value)}
        />
        <input
          type="number"
          required
          className="block w-full border-2 rounded-md px-2 py-3 mt-2"
          placeholder={"Ingrese su numero de telefono"}
          onChange={(evt) => setPhone(evt.target.value)}
        />

        <Button type="onSubmit" title="Registrar"></Button>
      </form>
    </div>
  );
};

export default Register;
