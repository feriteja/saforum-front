import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ForumCard, SkeletonForum } from "..";

import { getAllForum } from "../../function/handler/forum/forum";

const ListForum = () => {
  const { category } = useParams();
  const {
    isLoading,
    error,
    data: forumList,
    refetch,
  } = useQuery(["forumList", category], () => getAllForum(category));

  return (
    <div className="space-y-3">
      {!forumList || isLoading
        ? [...Array(10).keys()].map((data, idx) => {
            return <SkeletonForum key={idx} />;
          })
        : forumList.map((data, idx) => {
            return <ForumCard key={data.fuid} data={data} refetch={refetch} />;
          })}
    </div>
  );
};

export default ListForum;
