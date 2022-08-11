import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ListForum, PostCard, SideBar } from "../../components";
import { AuthTokenType, UserType } from "../../constant/type/DataType";
import { UserState } from "../../context/UserContext";
import { signRefresh } from "../../function/handler/auth/auth";
import { getUserDetailByUsername } from "../../function/handler/user/userhandler";

const HomePage = () => {
  const { user } = UserState();
  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );

  // useEffect(() => {
  //   if (user?.username) {
  //     signRefresh(token as AuthTokenType).then((newToken) =>
  //       setToken(newToken as AuthTokenType)
  //     );
  //   }

  //   return () => {};
  // }, [user]);

  return (
    <div className="grid md:grid-cols-9 gap-3 p-2 ">
      <div className="min-h-screen col-span-6 space-y-4">
        <PostCard />
        <ListForum />
      </div>
      <div className="bg-secondary    min-h-screen col-span-6 md:col-span-3 ">
        <SideBar />
      </div>
    </div>
  );
};

export default HomePage;
