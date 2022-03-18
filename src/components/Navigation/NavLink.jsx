import React from "react";
import { NavLink } from "react-router-dom";
const NavLinkK = ({ name, directionPath, extraStyle, children }) => {
  return (
    <div className={`pl-2 pr-2 leading-8   ${extraStyle}`}>
      <NavLink
        to={directionPath}
        className={({ isActive }) =>
          isActive
            ? "text-sky-200 underline underline-offset-8"
            : "hover:text-sky-200 hover:underline hover:underline-offset-8"
        }
      >
        {children}
        {name}
      </NavLink>
    </div>
  );
};

export default NavLinkK;
