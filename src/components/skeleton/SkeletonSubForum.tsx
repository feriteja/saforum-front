import React from "react";
import SkeletonCommentCard from "./SkeletonCommentCard";

const SkeletonSubForum = () => {
  return (
    <div className="space-y-7">
      <div className="relative px-3 py-6 top-5  bg-primary shadow rounded   ">
        <div className="flex  animate-pulse">
          <div className="h-3 w-24 bg-slate-300 ml-4 rounded-md " />
          <div className="h-3 w-32 bg-slate-300 ml-4 rounded-md " />
        </div>
        <div className="flex animate-pulse mt-2 ">
          <div className="flex flex-col space-y-3 w-16 items-center ">
            <div className="h-10 w-8 rounded-xl bg-slate-300" />
            <div className="h-10 w-8 rounded-xl bg-slate-300" />
          </div>
          <div className="w-full animate-pulse  mt-2 space-y-2">
            <div className="h-8 w-3/5 rounded-md bg-slate-300 " />
            <div className="h-3 w-full rounded-md bg-slate-300 " />
            <div className="h-3 w-full rounded-md bg-slate-300 " />
            <div className="h-3 w-full rounded-md bg-slate-300 " />
            <div className="h-3 w-full rounded-md bg-slate-300 " />
            <div className="h-3 w-full rounded-md bg-slate-300 " />
            <div className="h-3 w-full rounded-md bg-slate-300 " />
          </div>
        </div>
        <div className="ml-12 mt-10 h-3 min-w-fit  bg-slate-300 animate-pulse rounded-full " />
      </div>

      <div className="bg-primary shadow rounded-md py-4 space-y-3 ">
        <div className=" ml-10 h-3 w-1/4 bg-slate-300 rounded-md animate-pulse " />
        <div className="flex flex-col  h-44 rounded-md bg-slate-300 ml-10 px-4  pb-3 animate-pulse" />
        <div className="h-px mx-6 w-full bg-slate-300" />
        <div>
          {[...Array(10).keys()].map((val, idx) => {
            return <SkeletonCommentCard key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SkeletonSubForum;
