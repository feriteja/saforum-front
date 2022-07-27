import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router-dom";
import { getPopularForum } from "../../function/handler/forum/forum";
import SkeletonSideCard from "../skeleton/SkeletonSideCard";

const ForumPopularCard = () => {
  const { isLoading, error, data } = useQuery(["forumPopular"], () =>
    getPopularForum()
  );

  console.log(data);

  if (isLoading) {
    return <SkeletonSideCard number={5} />;
  }

  return (
    <div className="flex-1 px-2 py-3  w-full bg-primary rounded-md space-y-3 ">
      <h1 className="font-bold text-lg">Popular Forum</h1>
      {data?.map((val, idx) => {
        return (
          <div
            key={val.fuid}
            className=" w-full border-b-2 shadow-sm  bg-primary px-1 py-2 "
          >
            <div className="flex justify-between">
              <h1 className="text-xs font-semibold text-gray-400">
                s/{val.category}
              </h1>
              <h1 className="text-xs font-semibold text-gray-400">
                {val.owner}
              </h1>
            </div>
            <h2 className="line-clamp-1 hover:line-clamp-2">{val.title}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default ForumPopularCard;
