import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { ForumCard, SkeletonForum } from "../../../components";
import { UserState } from "../../../context/UserContext";
import {
  getUserDetailByUsername,
  getUserForumByUsername,
} from "../../../function/handler/user/userhandler";

const ProfileForum = () => {
  const { user } = UserState();

  const { username } = useParams();

  const { isLoading, error, data } = useQuery(
    ["profile", username],
    () => getUserForumByUsername(username || ""),
    { retry: 2 }
  );

  if (isLoading) {
    return <SkeletonForum />;
  }

  if (error) {
    return <Navigate to={"/notFound"} replace />;
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center">
        <h1>no forum</h1>
      </div>
    );
  }

  return <div>{/* {data.map} */}</div>;
};

export default ProfileForum;
