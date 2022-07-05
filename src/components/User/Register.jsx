import React, { useState } from "react";
import Button from "components/Utilities/Button";
import { register } from "components/Firebase/register";
import { useAlert } from "react-alert";
import { activeSesion } from "components/Firebase/activeSesion";
const Register = ({ setUser, setLoading }) => {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [mailConfirm, setMailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [phone, setPhone] = useState();
  const alert = useAlert();
  //estos son nuevos cambios al repo
  const handleLogin = (evt) => {
    evt.preventDefault();
    if (mail.length < 3 || !mail.includes("@")) return alert.error("ingresa un mail valido");
    if (mail !== mailConfirm) return alert.error("Los mails no son iguales");
    if (phone.length < 3) return alert.error("ingresa un numero de telefono valido");
    if (password.length < 6) return alert.error("Ingresa una contraseña valida");
    if (password !== passwordConfirm) return alert.error("Las contraseñas no son iguales");
    if (name.length < 3) return alert.error("ingresa un nombre valido");

    setLoading("loading");
    register(mail, password, name, phone)
      .then((res) => {
        alert.success("Registrado con exito sesion");
        activeSesion().then((server) => setUser(server));
      })
      .catch((error) => alert.error(error))
      .finally(() => setLoading("loaded"));
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
