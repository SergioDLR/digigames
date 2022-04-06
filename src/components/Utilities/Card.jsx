import React from "react";
const Card = ({ children, bgColor = "bg-white" }) => {
  return <div className={`${bgColor} shadow-md p-5 rounded-md `}>{children}</div>;
};

export default Card;
