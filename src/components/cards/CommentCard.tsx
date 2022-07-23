import React from "react";
import { CommentType } from "../../constant/type/DataType";
import avatar from "../../assets/avatar/avataaars (3).png";

const CommentCard = (props: CommentType) => {
  return (
    <div className="flex w-full space-x-3 pl-10 pr-4   my-8  ">
      <div className="w-8 h-8 bg-slate-300 rounded-md">
        <img src={props.avatar || avatar} className="w-8" alt="avatar" />
      </div>
      <div className="w-full space-y-2 pr-10  ">
        <h1 className="text-lg font-semibold">
          {props.alias || props.username}
        </h1>
        <p className="border-b-2">{props.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
