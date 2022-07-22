import { BiDownvote, BiUpvote } from "react-icons/bi";
import { detailForumType, ForumType } from "../../constant/type/DataType";

import { BsGear } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../context/UserContext";

const ForumCard = (data: { data: ForumType }) => {
  const { user } = UserState();
  const navigate = useNavigate();
  console.log(data);
  return (
    <div
      onClick={() => navigate(`/forum/s/${data.data.fuid}`)}
      className="px-2 py-4 bg-primary shadow-md rounded-md space-y-2 cursor-pointer hover:outline outline-1 outline-slate-500  "
    >
      <div className="flex justify-between">
        <p className="text-xs text-gray-400">Posted by {data.data.owner} </p>
        {user?.username === data.data.owner && <BsGear />}
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
