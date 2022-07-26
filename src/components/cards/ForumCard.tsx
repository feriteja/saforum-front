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
      onClick={() => navigate(`/forum/f/${data.data.fuid}`)}
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
          <div className=" p-2 group">
            {user?.username === data.data.owner && (
              <BsGear
                size={20}
                className="text-gray-400 group-hover:text-primary"
              />
            )}
          </div>
        </div>
      </div>

      <h1 className="font-semibold text-lg">{data.data.title}</h1>
      {data.data.banner && (
        <img
          src={`${import.meta.env.VITE_APP_BASE_URL}/public/tmp/${
            data.data.banner
          }`}
          alt="banner"
          className="w-11/12 h-72  mx-auto rounded"
        />
      )}

      <div className=" line-clamp-6">
        <p>{data.data.content}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex justify-evenly space-x-2    ">
          <BiUpvote size={18} />
          <BiDownvote size={18} />
        </div>
        <p>{data.data.comment || 0} comment</p>
      </div>
    </div>
  );
};

export default ForumCard;
