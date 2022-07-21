import React from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar/avataaars.png";

const PostCard = () => {
  const navigate = useNavigate();
  const toProfile = () => {
    navigate("/profile");
  };
  const toPostPage = () => {
    navigate("/posting");
  };

  return (
    <div className="flex bg-white shadow-sm rounded-md p-2 ">
      <button onClick={toProfile}>
        <img src={avatar} alt="avatar" className="w-10" />
      </button>
      <div className="flex w-full cursor-pointer" onClick={toPostPage}>
        <div className="flex items-center bg-slate-200 w-full p-2 mx-2 rounded-md">
          <p className="opacity-70">Create Post</p>
        </div>
        <button className="bg-slate-200 px-2 rounded-md font-bold">Post</button>
      </div>
    </div>
  );
};

export default PostCard;
