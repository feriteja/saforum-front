import React from "react";

interface props {
  number?: number;
}

const SkeletonSideCard = ({ number = 2 }: props) => {
  return (
    <div className="flex-1 px-2 py-3  w-full bg-primary rounded-md space-y-3 ">
      <div className="bg-slate-300 h-5 w-1/2 rounded-md animate-pulse " />
      {[...Array(number).keys()].map((val, idx) => {
        return (
          <div
            key={idx}
            className="bg-slate-300 h-4 w-full rounded-md animate-pulse "
          />
        );
      })}
    </div>
  );
};

export default SkeletonSideCard;
