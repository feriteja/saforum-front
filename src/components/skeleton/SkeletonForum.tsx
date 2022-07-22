import React from "react";

const SkeletonForum = () => {
  return (
    <div className="px-2 py-4 bg-white shadow-md rounded-md space-y-2 ">
      <div className="bg-slate-300 w-2/3 h-3 animate-pulse rounded-md" />
      <div className=" bg-slate-300 h-56 sm:h-60 md:h-64 lg:h-72 rounded-md animate-pulse" />
      <div className="flex">
        <div className="flex justify-evenly w-1/3 h-3 animate-pulse ">
          <div className="bg-slate-300 h-3 w-2/5 rounded-md " />
          <div className="bg-slate-300 h-3 w-2/5 rounded-md " />
        </div>
        <div className="bg-slate-300 w-1/3 h-3 animate-pulse rounded-md" />
      </div>
    </div>
  );
};

export default SkeletonForum;
