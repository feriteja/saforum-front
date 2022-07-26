import React from "react";
import { CommentType } from "../../constant/type/DataType";
import avatar from "../../assets/avatar/avataaars (3).png";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";

const CommentCard = (props: CommentType) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full space-x-3 pl-10 pr-4   my-8  ">
      <div className="w-8 h-8 bg-slate-300 rounded-md">
        <img
          src={
            (props.avatar &&
              `${import.meta.env.VITE_APP_BASE_URL}/public/tmp/${
                props.avatar
              }`) ||
            avatar
          }
          className="w-8"
          alt="avatar"
        />
      </div>
      <div className="w-full space-y-2 pr-10  ">
        <div className="flex justify-between">
          <h1
            onClick={() => navigate(`/user/${props.username}`)}
            className="text-lg font-semibold cursor-pointer hover:underline underline-offset-1 "
          >
            {props.alias || props.username}
          </h1>
          <Moment
            fromNow
            date={props.created_at}
            className="font-thin text-sm"
          />
        </div>
        <p className="border-b-2">{props.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
