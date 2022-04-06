import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { activeSesion } from "components/Firebase/activeSesion";
import Button from "components/Utilities/Button";
import { closeSesion } from "components/Firebase/cerrarSesion";
import "firebase/auth";
import { useNavigate } from "react-router-dom";
const UserSesion = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    activeSesion()
      .then((resp) => setUser(resp))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col items-center  bg-sky-100 font-Montserrat min-h-screen h-full">
      {user === undefined ? (
        <>
          <h1 className="font-bold text-xl text-center">Ingresa a nuestra tienda</h1>
          <div className="flex flex-col lg:flex-row w-10/12 mt-2">
            <Login setUser={setUser}></Login>
            <Register setUser={setUser}></Register>
          </div>
        </>
      ) : (
        <>
          <h1>Bienvenido {user.displayName}</h1>
          <Button action={() => navigate("/wishlist")} title="Tu wishlist"></Button>
          <Button action={() => closeSesion(setUser)} title="cerrar sesion"></Button>
        </>
      )}
    </div>
  );
};

export default UserSesion;
