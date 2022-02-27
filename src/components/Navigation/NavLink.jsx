import React from "react";

const NavLink = ({ name, directionPath, extraStyle, children }) => {
  return (
    <div className={`pl-2 pr-2 leading-8  hover:text-sky-200 hover:underline hover:underline-offset-8 ${extraStyle}`}>
      <a href={directionPath}>
        {children}
        {name}
      </a>
    </div>
  );
};

export default NavLink;
