import { SyntheticEvent, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { AuthTokenType, detailForumType } from "../../constant/type/DataType";
import { UserState } from "../../context/UserContext";
import { likeForum, noLikeForum } from "../../function/handler/forum/forum";

interface props {
  data: detailForumType;
}

const Vote = ({ data }: props) => {
  const { user } = UserState();
  const [isLiked, setIsLiked] = useState(
    data.like_by?.includes(user?.uuid as string)
  );
  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );

  const navigate = useNavigate();

  const onLike = async (e: SyntheticEvent) => {
    e.stopPropagation();
    if (isLiked) return;
    if (!token) return navigate("/signin");

    try {
      setIsLiked(true);
      await likeForum(
        data?.fuid || "",
        user?.uuid || "",
        token as AuthTokenType
      );
    } catch (error) {
      throw error;
    }
  };

  const onNoLike = async (e: SyntheticEvent) => {
    e.stopPropagation();
    if (!isLiked) return;
    if (!token) return navigate("/signin");

    try {
      setIsLiked(false);
      await noLikeForum(
        data?.fuid || "",
        user?.uuid || "",
        token as AuthTokenType
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center   py-5 min-w-[45px]  space-y-3 ">
      <BiUpvote
        onClick={onLike}
        size={25}
        className={`${isLiked ? "text-accent" : ""} cursor-pointer`}
      />
      <BiDownvote onClick={onNoLike} size={25} className="cursor-pointer" />
    </div>
  );
};

export default Vote;
