import React from "react";
import { systemState } from "../../../context/SystemContext";

const Snackbar = () => {
  const { message, snackbar } = systemState();
  return (
    <div
      className={`fixed ${
        snackbar ? "bottom-14" : "-bottom-10"
      }  bg-slate-400 px-3  rounded-full left-1/2 -translate-x-1/2 text-white font-bold z-10 duration-300`}
    >
      <div>{message}</div>
    </div>
  );
};

export default Snackbar;
