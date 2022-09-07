import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { ForumCard, SkeletonForum } from "..";
import { UserState } from "../../context/UserContext";

import { getAllForum } from "../../function/handler/forum/forum";

const ListForum = () => {
  const [page, setPage] = useState(0);

  const fetchListForum = async (paging = 0) => {
    try {
      const limit = 10;
      const offset = paging * limit;
      const res = await getAllForum({ limit, offset });
      return res;
    } catch (error) {
      throw error;
    }
  };

  const {
    isLoading,
    error,
    data: forumList,
    refetch,
  } = useQuery(["forumList", page], () => fetchListForum(page), {
    keepPreviousData: true,
  });

  return (
    <div className="space-y-3">
      <InfiniteScroll
        dataLength={(forumList?.data?.length as number) || 3}
        next={() => setPage((prev) => prev + 1)}
        hasMore={forumList?.currentPages === forumList?.totalPages}
        loader={[...Array(10).keys()].map((data, idx) => {
          return <SkeletonForum key={idx} />;
        })}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={refetch}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        <div className="space-y-3">
          {forumList?.data?.map((data, idx) => {
            return <ForumCard key={data.fuid} data={data} refetch={refetch} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ListForum;
