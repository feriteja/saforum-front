import React, { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../constant/type/DataType";

export interface userStateContextProps {
  user: UserType | null;
}

const UserContext = createContext<Partial<userStateContextProps>>({});

const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    return () => {};
  }, [user]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

const UserState = () => {
  return useContext(UserContext) as userStateContextProps;
};

export { UserProvider, UserState };
