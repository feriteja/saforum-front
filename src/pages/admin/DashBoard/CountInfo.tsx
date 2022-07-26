import React from "react";
import { MdOutlineForum, MdOutlinePerson } from "react-icons/md";

interface props {
  userCount?: number;
  forumCount?: number;
}

const CountInfo = (props: props) => {
  return (
    <div className="w-full  grid grid-cols-8 gap-4 px-2 ">
      <div className="flex flex-col col-span-8 md:col-span-4 bg-primary h-32 rounded-md px-3 py-2 shadow-md  ">
        <h1 className="font-semibold">User Count</h1>
        <div className="flex flex-1 justify-center items-center  space-x-3">
          <MdOutlinePerson size={30} />
          <h2 className="font-bold text-3xl text-center">
            {props.userCount || 89900}
          </h2>
        </div>
      </div>
      <div className="flex flex-col col-span-8 md:col-span-4  bg-primary h-32 rounded-md px-3 py-2 shadow-md">
        <h1 className="font-semibold">Forum Count</h1>
        <div className="flex flex-1   justify-center items-center  space-x-3    ">
          <MdOutlineForum size={30} className="justify-self-start" />
          <h2 className="font-bold text-3xl text-center">
            {props.forumCount || 2378199}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountInfo;
