import { useQuery } from "@tanstack/react-query";
import React, { SyntheticEvent, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getForumDetail } from "../../../function/handler/forum/forum";

import { UserState } from "../../../context/UserContext";
import { Vote } from "../../../components";
import Comment from "./Comment";
import Content from "./Content";

const ForumSubPage = () => {
  const { forumID } = useParams();
  const { isLoading, error, data } = useQuery(["forumDetail", forumID], () =>
    getForumDetail(forumID)
  );
  const { user } = UserState();

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {};
  }, [forumID]);

  return (
    <>
      {!data || error ? (
        <div>loading </div>
      ) : (
        <div className="relative  px-3 py-6 top-5 bg-primary  shadow-lg rounded  ">
          <div className="flex border-b-2">
            <Vote />
            <div className="pb-3">
              <Content
                category={data?.category}
                owner={data?.owner}
                title={data?.title}
                content={data?.content}
              />
              <div className="h-3 bg-slate-300 rounded-full mt-5"></div>
              <Comment alias={user?.alias || user?.username} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForumSubPage;
