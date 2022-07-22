import React from "react";

interface props {
  category: string;
  owner: string;
  title: string;
  content?: string;
}

const Content = ({ ...props }: props) => {
  return (
    <div className="space-y-2">
      <div className="flex space-x-4 ">
        <h2 className="text-xs font-bold flex">s/{props.category}</h2>
        <p className="text-xs ">. Posted by u/{props.owner}</p>
      </div>
      <h1 className="font-semibold text-xl">{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
};

export default Content;
