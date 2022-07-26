import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ListForum, PostCard, SideBar } from "../../components";
import { AuthTokenType, UserType } from "../../constant/type/DataType";
import { UserState } from "../../context/UserContext";
import { getUserDetailByUsername } from "../../function/handler/user/userhandler";

const HomePage = () => {
  return (
    <div className="grid md:grid-cols-9 gap-3 p-2 ">
      <div className="min-h-screen col-span-6 space-y-4">
        <PostCard />
        <ListForum />
      </div>
      <div className="bg-secondary min-h-screen col-span-3 ">
        <SideBar />
      </div>
    </div>
  );
};

export default HomePage;
