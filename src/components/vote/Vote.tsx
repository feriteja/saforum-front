import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const Vote = () => {
  return (
    <div className="flex flex-col items-center   py-5 min-w-[45px]  space-y-3 ">
      <BiUpvote size={25} className="cursor-pointer" />
      <BiDownvote size={25} className="cursor-pointer" />
    </div>
  );
};

export default Vote;
