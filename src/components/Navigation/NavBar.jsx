import React, { useState, useEffect } from "react";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";
const NavBar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const categories = [
    { name: "Ofertas", path: "/discount" },
    { name: "Juegos Digitales", path: "/category/cd-key" },
    { name: "Juegos Físicos", path: "/category/fisic" },
    { name: "Periféricos", path: "/category/peripherals" },
    { name: "Consolas", path: "/category/console" },
  ];
  const onChangeWidth = 1020;
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  const changeNavBar = () => {
    if (width >= onChangeWidth) return <DesktopNavBar categories={categories} />;
    else return <MobileNavBar categories={categories} />;
  };

  return changeNavBar();
};

export default NavBar;
