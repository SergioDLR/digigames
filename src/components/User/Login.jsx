import React, { useState } from "react";
import Button from "components/Utilities/Button";
import { login } from "components/Firebase/login";
import { useAlert } from "react-alert";
import { activeSesion } from "components/Firebase/activeSesion";
const Login = ({ setUser }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const handleLogin = (evt) => {
    evt.preventDefault();
    login(mail, password)
      .then((res) => {
        alert.success("Iniciando sesion");
        activeSesion().then((server) => setUser(server));
      })
      .catch((error) => alert.error(error));
  };
  return (
    <div className="lg:w-5/12 lg:ml-auto mt-2">
      <h1 className="text-bold">Ingresar</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          required
          className="block w-full border-2 rounded-md px-2 py-3 mt-2"
          placeholder={"Direccion de correo"}
          autoComplete="email"
          onChange={(evt) => setMail(evt.target.value)}
        />
        <input
          type="password"
          required
          className="block w-full border-2 rounded-md px-2 py-3 mt-2"
          placeholder={"Contraseña"}
          autoComplete="password"
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Button type="onSubmit" title="ingresar"></Button>
      </form>
    </div>
  );
};

export default Login;
