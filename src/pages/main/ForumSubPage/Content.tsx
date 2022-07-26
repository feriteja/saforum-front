import React from "react";
import { BsGear, BsThreeDots } from "react-icons/bs";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { detailForumType } from "../../../constant/type/DataType";
import { UserState } from "../../../context/UserContext";

const Content = ({ ...props }: detailForumType) => {
  const { user } = UserState();
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 ">
          <h2 className="text-xs font-bold flex">s/{props.category}</h2>
          <p className="text-xs ">. Posted by u/{props.username}</p>
          <Moment
            format="D MMM YYYY"
            date={props.created_at}
            withTitle
            className="text-xs "
          />
        </div>
        {user?.username === props.username && (
          <button
            onClick={() => navigate("/forum/edit", { state: props })}
            className=" p-2 group"
          >
            <BsThreeDots
              size={20}
              className="text-gray-400 group-hover:text-primary"
            />
          </button>
        )}
      </div>
      <h1 className="font-semibold text-xl">{props.title}</h1>
      {props.banner && (
        <img
          src={`${import.meta.env.VITE_APP_BASE_URL}/public/tmp/${
            props.banner
          }`}
          alt="banner"
          className="w-10/12 h-48 md:h-72 lg:h-96 mx-auto rounded"
        />
      )}
      <p>{props.content}</p>
    </div>
  );
};

export default Content;
