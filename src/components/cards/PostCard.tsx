import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar/avataaars.png";
import { systemState } from "../../context/SystemContext";
import { UserState } from "../../context/UserContext";
import { getUserDetailByUsername } from "../../function/handler/user/userhandler";

const PostCard = () => {
  const navigate = useNavigate();
  const { user } = UserState();
  const { showSnackbar } = systemState();
  const { isLoading, error, data } = useQuery(
    ["profile", user?.username],
    () => getUserDetailByUsername(user?.username),
    { retry: 1, enabled: !!user?.username }
  );
  const toProfile = () => {
    if (user?.avatar === "undefined" || user?.avatar === undefined)
      return navigate("/signin");
    navigate(`/user/${user?.username}`);
  };
  const toPostPage = () => {
    if (!user) {
      showSnackbar("Please login first");
      return navigate("/signin");
    }

    return navigate("/posting");
  };

  return (
    <div className="flex bg-primary shadow-sm rounded-md px-2 py-4 ">
      <button onClick={toProfile}>
        <img
          src={
            (data?.avatar &&
              `${import.meta.env.VITE_APP_BASE_URL}/public/tmp/${
                data.avatar as string
              }`) ||
            avatar
          }
          alt="avatar"
          className="w-10"
        />
      </button>
      <div className="flex w-full cursor-pointer " onClick={toPostPage}>
        <div className="flex items-center bg-secondary w-full p-2 mx-2 rounded-md  border border-primary ">
          <p className="opacity-70">Create Post</p>
        </div>
        <button className="bg-secondary px-2 rounded-md font-semibold  border border-primary">
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
