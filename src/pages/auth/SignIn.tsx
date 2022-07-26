import { SyntheticEvent, useState } from "react";
import { AiFillGoogleCircle, AiFillTwitterCircle } from "react-icons/ai";

import { BiLockAlt, BiUser } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { InputForm } from "../../components";
import { AuthTokenType } from "../../constant/type/DataType";
import { systemState } from "../../context/SystemContext";
import { signInFunc } from "../../function/handler/auth/auth";
import { useLocalStorage } from "usehooks-ts";
import { UserState } from "../../context/UserContext";

const signIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { showSnackbar, showLoading } = systemState();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = UserState();

  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      return setError("Password not valid");
    }

    try {
      showLoading(true);
      const res = await signInFunc(userName, password);

      setToken(res.data.token);

      showLoading(false);

      navigate("/", { replace: true });
    } catch (error: any) {
      setError(error.data.message);
      showSnackbar("login failed");
      showLoading(false);
    }
  };

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className=" min-h-screen flex flex-col  justify-center  max-w-5xl mx-auto   ">
      <div className=" w-3/4 md:w-full max-w-2xl px-4 pt-4  pb-5  mx-auto rounded-md shadow-xl ">
        <h1 className=" text-xl font-bold text-center mb-7">Sign In</h1>
        {error && (
          <p className="text-center font-semibold text-red-400">{error}</p>
        )}
        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <InputForm
            onChange={(text) => setUserName(text)}
            label="Username or Email Address"
            Icon={BiUser}
            placeHolder="user@mail.com"
          />
          <InputForm
            onChange={(text) => setPassword(text)}
            label="Password"
            Icon={BiLockAlt}
            isPassword
            placeHolder="***********"
          />

          <div className="h-3" />
          <input
            className="bg-button text-btnText w-full rounded-lg py-2 mt-8 font-bold cursor-pointer "
            type="submit"
            value={"Sign In"}
          />
        </form>
        <p
          onClick={() => navigate("/forgot")}
          className="my-2 mb-4 text-center"
        >
          forgot passoword ?
        </p>
        <p className="text-sm mt-2 text-right">
          New to <b>SaForum?, </b>
          <Link className="text-blue-400" to={"/signUp"}>
            <b> SIGN UP</b>
          </Link>{" "}
        </p>
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

export default signIn;
