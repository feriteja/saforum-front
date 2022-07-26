import React from "react";
import { BiSun } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { UserState } from "../../context/UserContext";

interface props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  handleNav: () => void;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
  onLogout: () => Promise<void>;
}

const MobileNav = (props: props) => {
  const { user, setUser } = UserState();

  return (
    <>
      <div
        onClick={() => props.setIsOpen(false)}
        className={`${
          props.isOpen ? " bg-black/30 " : "bg-black/0 -z-20 "
        } absolute h-full w-full`}
      />
      <div
        className={
          props.isOpen
            ? "fixed   right-0 top-16 bg-secondary w-[75%] h-full px-4 py-4 z-50 opacity-100 ease-in duration-300 "
            : "fixed  right-[-100%] top-16   bg-secondary  w-[75%] h-full opacity-0  ease-in duration-300 "
        }
      >
        <ul className="font-bold flex flex-col justify-evenly h-40 space-y-3">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "text-accent" : "text-primary"
            }
          >
            <li onClick={props.handleNav}>Homepage</li>
          </NavLink>
          {!user ? (
            <>
              <NavLink
                to={`/forum/`}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-primary"
                }
              >
                <li onClick={props.handleNav}>Forum</li>
              </NavLink>
              <li className="mx-2">
                <button onClick={() => props.setIsDark((prev) => !prev)}>
                  <div
                    className={`flex ${
                      props.isDark ? "justify-end " : "justify-start "
                    } bg-accent w-12 p-1 rounded-full duration-1000 text-black`}
                  >
                    <BiSun />
                  </div>
                </button>
              </li>
              <NavLink
                to={"/signin"}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-primary"
                }
              >
                <li onClick={props.handleNav}>SignIn</li>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={`/forum/`}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-primary"
                }
              >
                <li onClick={props.handleNav}>Forum</li>
              </NavLink>
              <NavLink
                to={`/user/${user.username}`}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-primary"
                }
              >
                <li onClick={props.handleNav}>Profile</li>
              </NavLink>
              <li className="mx-2">
                <button onClick={() => props.setIsDark((prev) => !prev)}>
                  <div
                    className={`flex ${
                      props.isDark ? "justify-end " : "justify-start "
                    } bg-accent w-12 p-1 rounded-full duration-1000 text-black`}
                  >
                    <BiSun />
                  </div>
                </button>
              </li>
              <li onClick={props.handleNav}>
                <button onClick={props.onLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default MobileNav;
