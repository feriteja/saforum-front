import React from "react";
import { BsGear } from "react-icons/bs";
import { UserState } from "../../context/UserContext";
import avatar from "../../assets/avatar/avataaars.png";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserDetailByUsername } from "../../function/handler/user/userhandler";

const Profile = () => {
  const { user } = UserState();
  const { username } = useParams();

  const { isLoading, error, data } = useQuery(["profile", username], () =>
    getUserDetailByUsername(username || "")
  );

  if (isLoading) {
    return (
      <div>
        <h1> loading</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 bg-primary">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <img
            src={data?.avatar || avatar}
            alt="avatar"
            className="w-24 md:w-28 lg:w-32 mx-2"
          />
          <button className="self-start mt-3 border-2 border-primary bg-primary  px-3 py-1 rounded-full ">
            Edit profile
          </button>
        </div>
        <div>
          <h1 className="font-semibold">{data?.alias || data?.username}</h1>
          <h2 className="text-gray-400">{data?.uuid?.slice(0, 8) || ""}</h2>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
