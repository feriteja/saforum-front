import React from "react";

const SkeletonCommentCard = () => {
  return (
    <div className="flex w-full space-x-3 pl-10 pr-4 animate-pulse  my-8  ">
      <div className="w-8 h-8 bg-slate-300 rounded-md" />
      <div className="w-full space-y-2 ">
        <div className="w-2/4 h-4 bg-slate-300 rounded" />
        <div className="w-full h-3 bg-slate-300  rounded" />
        <div className="w-full h-3 bg-slate-300  rounded" />
        <div className="w-full h-3 bg-slate-300  rounded" />
      </div>
    </div>
  );
};

export default SkeletonCommentCard;
