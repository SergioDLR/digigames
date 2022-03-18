import React, { useState } from "react";
import NavLink from "./NavLink";
import Icon from "../Utilities/Icon";
import brandImage from "../../assets/images/brand.png";
import hoverImage from "../../assets/images/brand-hover.png";
import CartWidget from "./CartWidget";
import menuIconHover from "../../assets/images/menu-open-hover.png";
import menuIcon from "../../assets/images/menu-open.png";

const MobileNavBar = ({ categories }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full top-0 fixe   p-6 bg-sky-900 font-Montserrat ">
      <div className="flex flex-row  text-white w-4/5 m-auto justify-center">
        <NavLink extraStyle="font-light text-2xl" directionPath="/">
          <Icon sourceImage={brandImage} sourceHover={hoverImage} size="w-10" />
        </NavLink>
        <div
          onClick={() => setShow(!show)}
          className={`mt-1 mx-2 cursor-pointer ${show ? "border-b-2" : "bg-transparent"}`}
        >
          <Icon sourceImage={menuIcon} sourceHover={menuIconHover} size="w-8 h-auto mx-5" />
        </div>
        <NavLink directionPath="/cart">
          <CartWidget />
        </NavLink>
      </div>
      {show && (
        <div className="text-white animate-load">
          {categories.map((i) => (
            <NavLink name={i.name} directionPath={i.path} key={i.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;
