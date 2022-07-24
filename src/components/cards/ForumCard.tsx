import { BiDownvote, BiUpvote } from "react-icons/bi";
import { detailForumType, ForumType } from "../../constant/type/DataType";

import { BsGear } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../context/UserContext";
import Moment from "react-moment";

const ForumCard = (data: { data: ForumType }) => {
  const { user } = UserState();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/forum/s/${data.data.fuid}`)}
      className="px-2 py-4 bg-primary shadow-md rounded-md space-y-2 cursor-pointer hover:outline outline-1 outline-slate-500  "
    >
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-xs text-gray-400">Posted by {data.data.owner}. </p>

          <Moment
            date={data.data.created_at}
            fromNow
            className="font-thin text-xs text-gray-400"
          />
        </div>
        <div className="flex items-center space-x-3">
          <h2 className="font-semibold text-sm capitalize">
            s/{data.data.category.toLowerCase()}
          </h2>
          {user?.username === data.data.owner && <BsGear />}
        </div>
      </div>

      <h1 className="font-semibold text-lg">{data.data.title}</h1>

      <div className=" line-clamp-6">
        <p>{data.data.content}</p>
      </div>
      <div className="flex items-center">
        <div className="flex justify-evenly   w-1/12 ">
          <BiUpvote size={18} />
          <BiDownvote size={18} />
        </div>
        <p>{data.data.comment || 0} comment</p>
      </div>
    </div>
  );
};

export default ForumCard;
