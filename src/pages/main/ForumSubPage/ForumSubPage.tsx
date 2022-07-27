import { useQuery } from "@tanstack/react-query";
import React, { SyntheticEvent, useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getForumDetail } from "../../../function/handler/forum/forum";
import { BsChatLeft } from "react-icons/bs";

import { UserState } from "../../../context/UserContext";
import { SkeletonSubForum, Vote } from "../../../components";
import Comment from "./Comment";
import Content from "./Content";

const ForumSubPage = () => {
  const { forumID } = useParams();
  const { isLoading, error, data } = useQuery(
    ["forumDetail", forumID],
    () => getForumDetail(forumID),
    { refetchOnWindowFocus: false, retry: 1, refetchOnReconnect: true }
  );
  const { user } = UserState();

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {};
  }, [forumID]);

  if (isLoading) {
    return <SkeletonSubForum />;
  }
  if (!data || error) {
    return <Navigate to="/notFound" replace />;
  }

  return (
    <div className="space-y-7">
      <div className="relative px-3 py-6 top-5 bg-primary shadow rounded">
        <div className="flex border-b-2  ">
          <Vote data={data} />
          <div className="pb-3 w-full ">
            <Content {...data} />
            <div className="flex items-center space-x-2 font-semibold text-sm text-secondary mt-5">
              <BsChatLeft />
              <p>{data.comment?.length || 0} comment</p>
            </div>
          </div>
        </div>
      </div>
      <Comment
        alias={user?.alias || user?.username}
        forumID={forumID}
        comment={data.comment}
      />
    </div>
  );
};

export default ForumSubPage;
