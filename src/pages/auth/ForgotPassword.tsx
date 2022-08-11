import React, { useState } from "react";
import { AiFillGoogleCircle, AiFillTwitterCircle } from "react-icons/ai";
import { BiLockAlt, BiUser } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { InputForm } from "../../components";
import { systemState } from "../../context/SystemContext";
import { UserState } from "../../context/UserContext";

const ForgotPassword = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { showSnackbar, showLoading } = systemState();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = UserState();

  return (
    <div className=" min-h-screen flex flex-col  justify-center  max-w-5xl mx-auto   ">
      <div className=" w-3/4 md:w-full max-w-2xl px-4 pt-4  pb-5  mx-auto rounded-md shadow-xl bg-primary ">
        <h1 className=" text-xl font-bold text-center mb-7">Forgot Password</h1>
        {error && (
          <p className="text-center font-semibold text-red-400">{error}</p>
        )}
        <form className="space-y-4 mt-2">
          
           
        </form>
      </div>
      <div className="  w-full max-w-lg  mt-6  mx-auto space-y-4 ">
        <p className="text-center opacity-90 ">or Sign Up using</p>
        <div className="flex items-center justify-center space-x-10">
          <BsFacebook
            onClick={() => {}}
            className="text-[#3D5892] cursor-pointer"
            size={35}
          />
          <AiFillGoogleCircle
            onClick={() => {}}
            className="text-[#D56455] cursor-pointer"
            size={40}
          />
          <AiFillTwitterCircle
            className="text-[#4CA0ED] cursor-pointer"
            size={40}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
