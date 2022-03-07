import React from "react";
const defAction = () => console.warn("Please attach an action for Button component");
const Button = ({
  title = "",
  action = defAction,
  bgColor = "bg-blue-400",
  fontColor = "text-white",
  hover = "hover:bg-blue-900",
  rounded = "rounded",
  children,
}) => {
  return (
    <button
      className={`${bgColor} ${fontColor} ${rounded} ${hover} transition ease-in-out border-gray-300 p-3 px-4 m-1 min-w-fit`}
      onClick={() => action()}
    >
      {children}
      {title}
    </button>
  );
};

export default Button;
