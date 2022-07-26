import React, { useState } from "react";
import { BsGear } from "react-icons/bs";
import { UserState } from "../../../context/UserContext";
import avatar from "../../../assets/avatar/avataaars.png";
import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getUserDetailByUsername } from "../../../function/handler/user/userhandler";
import ProfileForum from "./ProfileForum";
import ProfileActivity from "./ProfileActivity";

const Profile = () => {
  const { user } = UserState();
  const { username } = useParams();
  const [showForum, setShowForum] = useState(true);

  const { isLoading, error, data } = useQuery(
    ["profile", username],
    () => getUserDetailByUsername(username),
    { retry: 1 }
  );

  const { pathname } = useLocation();

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
    <div className=" min-h-screen py-6 ">
      <div className=" bg-primary  px-4 py-3 rounded ">
        <div className="space-y-3 ">
          <div className="flex items-center justify-between">
            <div className="flex flex-1">
              <img
                src={
                  (data.avatar &&
                    `${import.meta.env.VITE_APP_BASE_URL}/public/tmp/${
                      data.avatar as string
                    }`) ||
                  avatar
                }
                alt="avatar"
                className="w-24 md:w-28 lg:w-32 mx-2"
              />
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

            {isOwner && (
              <button
                onClick={() => navigate("/user/edit", { state: data })}
                className="self-start mt-3 border-2 border-primary bg-primary  px-3 py-1 rounded-full shadow "
              >
                Edit
              </button>
            )}
          </div>
          <p className="mt-6">{data.status}</p>
        </div>
        <div className="flex border-b my-4  ">
          <div
            onClick={() => setShowForum(true)}
            className="flex-1  py-2 rounded group hover:bg-secondary cursor-pointer  "
          >
            <h1
              className={` px w-fit px-3 mx-auto ${
                showForum && "border-b-2"
              }  group-hover:border-b-4 border-accent  `}
            >
              Forum
            </h1>
          </div>
          <div
            onClick={() => setShowForum(false)}
            className="flex-1  py-2 rounded group hover:bg-secondary cursor-pointer "
          >
            <h1
              className={` px w-fit px-3 mx-auto ${
                !showForum && "border-b-2"
              } group-hover:border-b-4 border-accent `}
            >
              Activity
            </h1>
          </div>
        </div>
        {showForum ? <ProfileForum /> : <ProfileActivity />}
      </div>
    </div>
  );
};

export default Profile;
