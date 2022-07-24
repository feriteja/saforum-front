import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { UserType } from "../constant/type/DataType";

export interface userStateContextProps {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const UserContext = createContext<Partial<userStateContextProps>>({});

const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [cookies, setCookies] = useCookies();
  const { decodedToken, isExpired } = useJwt(
    cookies?.authCookie?.access_token || "sads"
  );

  useEffect(() => {
    if (!isExpired) {
      setUser(decodedToken as UserType);
    } else {
      setUser(null);
    }
    return () => {
      setUser(null);
    };
  }, [cookies.authCookie, decodedToken, isExpired]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UserState = () => {
  return useContext(UserContext) as userStateContextProps;
};

export { UserProvider, UserState };
