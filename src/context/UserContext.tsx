import React, { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { AuthTokenType, UserType } from "../constant/type/DataType";
import useLocalStorage from "../function/hook/userLocalStorage";

export interface userStateContextProps {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const UserContext = createContext<Partial<userStateContextProps>>({});

const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );

  const { decodedToken, isExpired } = useJwt(token?.access_token || "sads");

  useEffect(() => {
    if (!isExpired) {
      setUser(decodedToken as UserType);
    } else {
      setUser(null);
    }
  }, [token, decodedToken, isExpired]);

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
