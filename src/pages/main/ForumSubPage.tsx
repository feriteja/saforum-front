import { useQuery } from "@tanstack/react-query";
import React, { SyntheticEvent, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getForumDetail } from "../../function/handler/forum/forum";

import { UserState } from "../../context/UserContext";
import { Vote } from "../../components";

const ForumSubPage = () => {
  const { forumID } = useParams();
  const { isLoading, error, data } = useQuery(["forumDetail", forumID], () =>
    getForumDetail(forumID)
  );
  const { user } = UserState();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {};
  }, [forumID]);

  return (
    <div className="relative  px-3 py-6 top-5 bg-primary  shadow-lg rounded  ">
      <div className="flex border-b-2">
        <Vote />
        <div className="pb-3">
          <div className="space-y-2">
            <div className="flex space-x-4 ">
              <h2 className="text-xs font-bold flex">s/{data?.category}</h2>
              <p className="text-xs ">. Posted by u/{data?.owner}</p>
            </div>
            <h1 className="font-semibold text-xl">{data?.title}</h1>
            <p>{data?.content}</p>
          </div>
          <div className="h-3 bg-slate-300 rounded-full mt-5"></div>
          <div className="pt-4 mt-2 ">
            <form onSubmit={onSubmit} className="flex flex-col space-y-2 ">
              <label htmlFor="commentArea" className="text-sm">
                Comment as{" "}
                <strong className="text-blue-500">
                  {user?.alias || user?.username}
                </strong>
              </label>
              <textarea
                className="resize-none bg-primary outline-none border-2 w-full rounded-md px-3 py-1"
                name="commentArea"
                placeholder="What are your thought"
                id="commentArea"
                required
                rows={6}
              ></textarea>
              <input
                type="submit"
                className="cursor-pointer self-end mr-3 text-black  rounded-full bg-accent  px-3 py-1 font-bold"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumSubPage;
