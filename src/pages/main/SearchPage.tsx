import { useQuery } from "@tanstack/react-query";
import React, {
  SyntheticEvent,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { BiSearch } from "react-icons/bi";
import { ForumCard } from "../../components";
import { ForumType } from "../../constant/type/DataType";
import { getSearchForum } from "../../function/handler/forum/forum";

const SearchPage = () => {
  const [titleForum, setTitleForum] = useState("");
  const titleName = useDeferredValue(titleForum);
  const {
    isLoading,
    error,
    data: forumList,
    refetch,
  } = useQuery(["forumList", titleName], () => getSearchForum(titleName));

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className="py-6 space-y-4">
      <form onSubmit={onSubmit}>
        <div className=" flex items-center space-x-3 bg-primary px-3 rounded-full shadow-md overflow-hidden mx-2">
          <BiSearch size={25} />
          <input
            type="text"
            onChange={(e) => setTitleForum(e.target.value)}
            placeholder="Title"
            className="w-full outline-none py-4 bg-primary"
          />
        </div>
      </form>
      {forumList?.map((val, idx) => {
        return (
          <div key={val.fuid} className="">
            <ForumCard data={val} refetch={refetch} />
          </div>
        );
      })}
    </div>
  );
};

export default SearchPage;
