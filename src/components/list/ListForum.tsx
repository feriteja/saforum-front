import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SkeletonForum, ForumCard } from "..";

import { ForumType } from "../../constant/type/DataType";
import { getAllForum } from "../../function/handler/forum/forum";

const ListForum = () => {
  const [forumList, setForumList] = useState<ForumType[]>([]);
  const categry = useParams();

  useEffect(() => {
    getAllForum(categry.toString()).then((res) => setForumList(res?.data.data));
    return () => {
      setForumList([]);
    };
  }, []);

  return (
    <div className="space-y-3">
      {forumList.length === 0
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
