import React from "react";
const Icon = ({ sourceImage, size = "w-5", sourceHover = sourceImage }) => {
  return (
    <img
      src={sourceImage}
      alt="brand"
      className={`max-w-full ${size} inline `}
      onMouseOver={(e) => (e.currentTarget.src = sourceHover)}
      onMouseOut={(e) => (e.currentTarget.src = sourceImage)}
    />
  );
};

export default Icon;
