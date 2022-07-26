import { useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthTokenType } from "../../constant/type/DataType";
import { systemState } from "../../context/SystemContext";
import { UserState } from "../../context/UserContext";
import { signOutFunc } from "../../function/handler/auth/auth";
import { useLocalStorage } from "usehooks-ts";
import { ThemeState } from "../../context/ThemeContext";
import { BiSun } from "react-icons/bi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );
  const { showSnackbar, showLoading } = systemState();
  const navigate = useNavigate();

  const { user, setUser } = UserState();
  const { setTheme } = ThemeState();

  const handleNav = () => {
    setIsOpen((prev) => !prev);
  };

  const onLogout = async () => {
    try {
      await signOutFunc(token as AuthTokenType);
      setToken(null);

      showSnackbar("SignOut success");
      navigate("/");
    } catch (error) {
      showSnackbar("SignOut failed");
    }
  };

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  const forceLogout = () => {
    setToken(null);
  };

  return (
    <>
      <nav className=" flex items-center justify-between h-16 bg-primary shadow-xl  z-10 w-full px-2 sm:px-4 md:px-6 ">
        <div className="flex items-center ">
          <NavLink to={"/"}>
            <h1 className="font-bold text-2xl z-40">SaForum</h1>
          </NavLink>
        </div>
        <ul className="hidden sm:flex justify-center font-bold items-center text-center sm:text-sm md:text-base ">
          {/* <li className="mx-2">
            <button onClick={() => console.log(user, token)}>Show State user</button>
          </li> */}
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
              to={"/forum"}
            >
              Forum
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
                  to={`/user/${user.username}`}
                >
                  Profile
                </NavLink>
              </li>
              <li className="mx-2">
                <button onClick={() => setIsDark((prev) => !prev)}>
                  <div
                    className={`flex ${
                      isDark ? "justify-end " : "justify-start "
                    } bg-accent w-12 p-1 rounded-full duration-1000 text-black`}
                  >
                    <BiSun />
                  </div>
                </button>
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
        <button className="sm:hidden " onClick={handleNav}>
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
            <>
              <NavLink
                to={`/forum/`}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-primary"
                }
              >
                <li onClick={handleNav}>Forum</li>
              </NavLink>
              <li className="mx-2">
                <button onClick={() => setIsDark((prev) => !prev)}>
                  <div
                    className={`flex ${
                      isDark ? "justify-end " : "justify-start "
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
                <li onClick={handleNav}>SignIn</li>
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
                <li onClick={handleNav}>Forum</li>
              </NavLink>
              <NavLink
                to={`/user/${user.username}`}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-primary"
                }
              >
                <li onClick={handleNav}>Profile</li>
              </NavLink>
              <li className="mx-2">
                <button onClick={() => setIsDark((prev) => !prev)}>
                  <div
                    className={`flex ${
                      isDark ? "justify-end " : "justify-start "
                    } bg-accent w-12 p-1 rounded-full duration-1000 text-black`}
                  >
                    <BiSun />
                  </div>
                </button>
              </li>
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
