import React from "react";
import { ForumType } from "../../constant/type/DataType";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";

const ForumCard = (data: { data: ForumType }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/forum/s/${data.data.fuid}`)}
      className="px-2 py-4 bg-white shadow-md rounded-md space-y-2 cursor-pointer hover:outline outline-1 outline-slate-500  "
    >
      <p className="text-xs text-gray-500">Posted by {data.data.owner} </p>

      <h1 className="font-semibold text-lg">{data.data.title}</h1>

      <div className=" rounded-md ">
        <p>{data.data.content}</p>
      </div>
      <div className="flex items-center">
        <div className="flex justify-evenly   w-1/12 ">
          <BiUpvote size={18} />
          <BiDownvote size={18} />
        </div>
        <p>comment</p>
      </div>
    </div>
  );
};

export default ForumCard;
