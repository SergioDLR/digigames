import React from "react";
const Skeleton = () => {
  return (
    <div className="animate-pulse flex flex-col mx-auto w-11/12 h-fit m-5 ">
      <div className="w-full bg-slate-400 h-36 "></div>
      <div className="h-3 my-1 bg-slate-400 rounded col-span-2"></div>
      <div className="h-3 my-1 bg-slate-400  rounded col-span-1"></div>
      <div className="h-3 my-1 bg-slate-400 rounded col-span-1"></div>
    </div>
  );
};

export default Skeleton;
