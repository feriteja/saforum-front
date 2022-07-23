import React from "react";
import { BsGear } from "react-icons/bs";
import { UserState } from "../../../context/UserContext";
import avatar from "../../../assets/avatar/avataaars.png";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getUserDetailByUsername } from "../../../function/handler/user/userhandler";

const Profile = () => {
  const { user } = UserState();
  const { username } = useParams();

  const { isLoading, error, data } = useQuery(
    ["profile", username],
    () => getUserDetailByUsername(username),
    { retry: 1 }
  );

  const isOwner = data?.uuid === user?.uuid;

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div>
        <h1> loading</h1>
      </div>
    );
  }

  if (error || !data) {
    return <Navigate to="/notFound" replace />;
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

          {isOwner && (
            <button
              onClick={() => navigate("/user/edit")}
              className="self-start mt-3 border-2 border-primary bg-primary  px-3 py-1 rounded-full shadow "
            >
              Edit profile
            </button>
          )}
        </div>
        <div className="ml-4">
          <h1 className="font-semibold text-xl">
            {data?.alias || data?.username}
          </h1>
          <h2 className="text-gray-400 font-bold">@{data?.username}</h2>
          {isOwner && (
            <h2 className="text-gray-400">{data?.uuid?.slice(0, 8)}</h2>
          )}
        </div>
      </div>
      <div className="flex border-b  ">
        <div className="flex-1  py-2 rounded group hover:bg-secondary  ">
          <h1 className=" px w-fit px-3 mx-auto group-hover:border-b-2 border-accent  ">
            My Forum
          </h1>
        </div>
        <div className="flex-1  py-2 rounded group hover:bg-secondary ">
          <h1 className=" px w-fit px-3 mx-auto group-hover:border-b-2 border-accent  ">
            My Activity
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
