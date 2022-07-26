import React from "react";
import { systemState } from "../../../context/SystemContext";

const Loading = () => {
  const { isLoading } = systemState();
  return (
    <div
      className={`absolute top-0 left-0 right-0 ${
        isLoading ? "flex" : "hidden"
      } justify-center items-center  min-h-screen w-screen bg-slate-300/50 z-20`}
    >
      <div className="flex items-center justify-center ">
        <div className="w-40 h-40 border-t-4 border-b-4 border-orange-400 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
