import React from "react";
import { ChatType, UserType } from "../../constant/type/DataType";
import { UserState } from "../../context/UserContext";

const BubbleChat = (props: ChatType) => {
  const { user } = UserState();

  return (
    <div
      className={`${
        user?.username === props.username
          ? "self-end bg-accent "
          : "self-start bg-primary"
      }  w-fit px-2 my-3 rounded-md `}
    >
      <h1 className="text-xs font-semibold">
        {props.username === user?.username ? "You" : props.username}
      </h1>
      <p className="text-lg">{props.message}</p>
    </div>
  );
};

export default BubbleChat;
