import React from "react";
import Img404 from "assets/images/error-404.png";
import Icon from "../Utilities/Icon";
const NotFound = () => {
  return (
    <div className="flex flex-col  items-center bg-sky-100 font-Montserrat min-h-screen ">
      <div className="animate-bounce m-20">
        <Icon sourceImage={Img404} size={"w-32"} />
      </div>
      <h1 className="text-6xl">Error 404!</h1>
      <h1 className="text-2xl ">Esta ruta parece que no lleva a ningun lado 😥</h1>
    </div>
  );
};

export default NotFound;
