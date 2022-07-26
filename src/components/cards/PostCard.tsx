import React from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar/avataaars.png";
import { UserState } from "../../context/UserContext";

const PostCard = () => {
  const navigate = useNavigate();
  const { user } = UserState();
  const toProfile = () => {
    navigate(`/user/${user?.username}`);
  };
  const toPostPage = () => {
    navigate("/posting");
  };

  return (
    <div className="flex bg-primary shadow-sm rounded-md px-2 py-4 ">
      <button onClick={toProfile}>
        <img
          src={
            (user?.avatar &&
              `http://127.0.0.1:3003/public/tmp/${user.avatar as string}`) ||
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
