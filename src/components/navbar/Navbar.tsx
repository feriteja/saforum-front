import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { MdClose, MdMenu } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { systemState } from "../../context/SystemContext";
import { UserState } from "../../context/UserContext";
import { signOutFunc } from "../../function/handler/auth/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies();
  const { showSnackbar, showLoading } = systemState();
  const navigate = useNavigate();

  const { user } = UserState();

  const handleNav = () => {
    console.log(user);
    setIsOpen((prev) => !prev);
  };

  const onLogout = async () => {
    try {
      await signOutFunc(cookies.authCookie);

      removeCookie("authCookie");
      showSnackbar("SignOut success");
      navigate("/");
    } catch (error) {
      showSnackbar("SignOut failed");
    }
  };

  const forceLogout = () => {
    removeCookie("authCookie");
  };

  return (
    <>
      <nav className=" flex items-center justify-between h-16 bg-white border-2  w-full px-2 sm:px-4 md:px-6 ">
        <NavLink to={"/"}>
          <h1 className="font-bold text-2xl z-40">SaForum</h1>
        </NavLink>
        <ul className="hidden sm:flex font-bold items-center text-center sm:text-sm md:text-base ">
          <li className="mx-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-primary"
              }
              to={"/"}
            >
              Homepage
            </NavLink>
          </li>
          <li className="mx-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-primary"
              }
              to={"/category"}
            >
              Category
            </NavLink>
          </li>

          {!user ? (
            <li className="mx-2">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-primary"
                }
                to={"/signIn"}
              >
                Sign In
              </NavLink>
            </li>
          ) : (
            <>
              <li className="mx-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-primary"
                  }
                  to={"/profile"}
                >
                  Profile
                </NavLink>
              </li>
              <li className="mx-2">
                <button onClick={onLogout}>logout</button>
              </li>
            </>
          )}
        </ul>

        {/* <button className="" onClick={forceLogout}>
          forcelogout
        </button> */}
        <button className="sm:hidden" onClick={handleNav}>
          {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </nav>

      {/* Mobile */}

      <div
        onClick={() => setIsOpen(false)}
        className={`${
          isOpen ? " bg-black/30 " : "bg-black/0 -z-20 "
        } absolute h-full w-full`}
      />
      <div
        className={
          isOpen
            ? "fixed   right-0 top-16 bg-secondary w-[75%] h-full px-4 py-4 z-50 opacity-100 ease-in duration-300 "
            : "fixed  right-[-100%] top-16   bg-secondary  w-[75%] h-full opacity-0 ease-in duration-300 "
        }
      >
        <ul className="font-bold flex flex-col justify-evenly h-40">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "text-accent" : "text-primary"
            }
          >
            <li onClick={handleNav}>Homepage</li>
          </NavLink>
          {!user ? (
            <NavLink
              to={"/signin"}
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-primary"
              }
            >
              <li onClick={handleNav}>SignIn</li>
            </NavLink>
          ) : (
            <>
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-primary"
                }
              >
                <li onClick={handleNav}>Profile</li>
              </NavLink>
              <li onClick={handleNav}>
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
