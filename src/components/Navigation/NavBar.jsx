import React from "react";
import NavLink from "./NavLink";
import Icon from "../Utilities/Icon";
import brandImage from "../../assets/images/brand.png";
import hoverImage from "../../assets/images/brand-hover.png";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <div className="w-full top-0 fixe   p-6 bg-sky-900 font-Montserrat">
      <div className="lg:flex lg:flex-row  text-white w-4/5 m-auto ">
        <NavLink name="DigiGames" extraStyle="font-light text-2xl" directionPath="#">
          <Icon sourceImage={brandImage} sourceHover={hoverImage} size="w-10" />
        </NavLink>
        <NavLink name="Ofertas" extraStyle="ml-auto" directionPath="#" />
        <NavLink name="Juegos Digitales" directionPath="#" />
        <NavLink name="Juegos Físicos" directionPath="#" />
        <NavLink name="Periféricos" directionPath="#" />
        <NavLink name="Consolas" directionPath="#" />
        <NavLink directionPath="#">
          <CartWidget />
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
