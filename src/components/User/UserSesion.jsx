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
      .catch((e) => setUser(undefined));
  }, []);

  return (
    <div className="bg-sky-100 font-Montserrat min-h-screen h-full ">
      <div className="animate-load flex flex-col items-center">
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
            <Button action={() => navigate("/wishlist")} title="Tu lista de deseados"></Button>
            <Button
              bgColor="bg-red-600"
              hover="hover:bg-red-900"
              action={() => closeSesion(setUser)}
              title="Cerrar sesion"
            ></Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSesion;
