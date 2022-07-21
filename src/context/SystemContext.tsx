import React, { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../constant/type/DataType";

export interface SystemStateContextProps {
  message: string;
  snackbar: boolean;
  isLoading: boolean;
  showSnackbar: (message: string) => void;
  showLoading: (state: boolean) => void;
}

const UserContext = createContext<Partial<SystemStateContextProps>>({});

const SystemProvider: React.FC<any> = ({ children }) => {
  const [isLoading, setisLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackbar = (message: string) => {
    setSnackbar(true);
    setMessage(message);
    setTimeout(() => {
      setSnackbar(false);
    }, 3000);
  };

  const showLoading = (state: boolean) => {
    setisLoading(state);
  };

  return (
    <UserContext.Provider
      value={{ showSnackbar, showLoading, message, isLoading, snackbar }}
    >
      {children}
    </UserContext.Provider>
  );
};

const systemState = () => {
  return useContext(UserContext) as SystemStateContextProps;
};

export { SystemProvider, systemState };
