import { useQuery } from "@tanstack/react-query";
import React, { SyntheticEvent, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getForumDetail } from "../../../function/handler/forum/forum";

import { UserState } from "../../../context/UserContext";
import { SkeletonSubForum, Vote } from "../../../components";
import Comment from "./Comment";
import Content from "./Content";

const ForumSubPage = () => {
  const { forumID } = useParams();
  const { isLoading, error, data } = useQuery(
    ["forumDetail", forumID],
    () => getForumDetail(forumID),
    { refetchOnWindowFocus: false }
  );
  const { user } = UserState();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {};
  }, [forumID]);

  if (isLoading) {
    return <SkeletonSubForum />;
  }
  if (!data) {
    return navigate("/notFound");
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="space-y-7">
      <div className="relative  px-3 py-6 top-5 bg-primary  shadow rounded  ">
        <div className="flex border-b-2  ">
          <Vote />
          <div className="pb-3 w-full">
            <Content
              category={data?.category}
              owner={data?.owner}
              title={data?.title}
              content={data?.content}
            />
            <div className="h-3 bg-slate-300 rounded-full mt-5"></div>
          </div>
        </div>
      </div>
      <Comment alias={user?.alias || user?.username} forumID={forumID} />
    </div>
  );
};

export default ForumSubPage;
