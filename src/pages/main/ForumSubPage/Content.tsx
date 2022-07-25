import React from "react";
import Moment from "react-moment";
import { detailForumType } from "../../../constant/type/DataType";

const Content = ({ ...props }: detailForumType) => {
  return (
    <div className="space-y-2">
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
      <h1 className="font-semibold text-xl">{props.title}</h1>
      {props.banner && (
        <img
          src={`http://127.0.0.1:3003/public/tmp/${props.banner}`}
          alt="banner"
          className="w-10/12 h-96 mx-auto rounded"
        />
      )}
      <p>{props.content}</p>
    </div>
  );
};

export default Content;
