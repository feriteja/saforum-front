import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SkeletonForum, ForumCard } from "..";

import { ForumType } from "../../constant/type/DataType";
import { getAllForum } from "../../function/handler/forum/forum";

const ListForum = () => {
  const category = useParams();
  const {
    isLoading,
    error,
    data: forumList,
  } = useQuery(["forumList", category.toString()], () =>
    getAllForum(category.toString())
  );

  return (
    <div className="space-y-3">
      {!forumList || isLoading
        ? [...Array(10).keys()].map((data, idx) => {
            return <SkeletonForum key={idx} />;
          })
        : forumList.map((data, idx) => {
            return <ForumCard key={data.fuid} data={data} />;
          })}
    </div>
  );
};

export default ListForum;
