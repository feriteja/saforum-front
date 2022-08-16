import React from "react";
import categoryList from "../../constant/data/category";
import { Navigate, useParams } from "react-router-dom";
import CategoryCard from "../../components/cards/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { getAllForum } from "../../function/handler/forum/forum";
import { ForumCard } from "../../components";

const ForumPage = () => {
  const { category } = useParams();

  const {
    isLoading,
    error,
    data: forumList,
    refetch,
  } = useQuery(["forumList", category], () => getAllForum({ category }));

  if (category) {
    if (forumList?.data?.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold">There is no content yet</h1>
        </div>
      );
    }

    return (
      <div className="py-5">
        <div className="space-y-3 ">
          {forumList?.data?.map((data, idx) => {
            return <ForumCard refetch={refetch} data={data} key={data.fuid} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="py-5">
      <div className="space-y-3 ">
        {categoryList.map((val, idx) => {
          return <CategoryCard key={val} value={val} />;
        })}
      </div>
    </div>
  );
};

export default ForumPage;
