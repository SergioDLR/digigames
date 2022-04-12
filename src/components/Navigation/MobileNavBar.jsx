import React, { useState } from "react";
import NavLink from "./NavLink";
import Icon from "../Utilities/Icon";
import CartWidget from "./CartWidget";

const MobileNavBar = ({ categories }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full top-0 fixe   p-6 bg-sky-900 font-Montserrat ">
      <div className="flex flex-row  text-white w-4/5 m-auto justify-center">
        <NavLink extraStyle="font-light text-2xl" directionPath="/">
          <Icon sourceImage={"/images/brand.png"} sourceHover={"/images/brand-hover.png"} size="w-10" />
        </NavLink>
        <div
          onClick={() => setShow(!show)}
          className={`mt-1 mx-2 cursor-pointer ${show ? "border-b-2" : "bg-transparent"}`}
        >
          <Icon
            sourceImage={"/images/menu-open.png"}
            sourceHover={"/images/menu-open-hover.png"}
            size="w-8 h-auto mx-5"
          />
        </div>

        <NavLink directionPath="/cart">
          <CartWidget />
        </NavLink>
      </div>
      {show && (
        <div className="text-white animate-load">
          <NavLink name="Mi sesion" directionPath="/sesion" />
          <NavLink directionPath="/ordertrack" name="Mis órdenes" />
          {categories.map((i) => (
            <NavLink name={i.name} directionPath={i.path} key={i.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;
