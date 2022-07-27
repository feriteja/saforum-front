import { BiDownvote, BiUpvote } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import {
  AuthTokenType,
  detailForumType,
  ForumType,
} from "../../constant/type/DataType";

import { BsGear, BsThreeDots } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";
import { UserState } from "../../context/UserContext";
import Moment from "react-moment";
import { MouseEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { systemState } from "../../context/SystemContext";
import { useLocalStorage } from "usehooks-ts";
import {
  deleteForum,
  likeForum,
  noLikeForum,
} from "../../function/handler/forum/forum";

const ForumCard = ({ data, refetch }: { data: ForumType; refetch?: any }) => {
  const { user } = UserState();
  const [isLiked, setIsLiked] = useState(
    data.like_by?.includes(user?.uuid as string)
  );
  const { showLoading, showSnackbar } = systemState();
  const [isOption, setIsOption] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const optionRef = useRef<HTMLDivElement>(null);
  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );

  const navigate = useNavigate();
  const authority =
    user?.username === data.owner ||
    user?.role === "admin" ||
    user?.role === "superadmin";

  const goToEdit = () => {
    return navigate("/forum/edit", { state: data });
  };
  const onDeleteForum = async () => {
    try {
      showLoading(true);
      await deleteForum(data.fuid || "", token as AuthTokenType);
      showSnackbar("Forum has been deleted");
      refetch();

      showLoading(false);
    } catch (error) {
      showLoading(false);
      showSnackbar("Forum failed to be deleted");

      throw error;
    }
  };

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

  useEffect(() => {
    setIsLiked(data.like_by?.includes(user?.uuid as string));

    return () => {};
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setIsOption(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionRef]);

  return (
    <div
      onClick={() => navigate(`/forum/f/${data.fuid}`)}
      className=" relative px-2 py-4 bg-primary shadow-md rounded-md space-y-2 cursor-pointer hover:outline outline-1 outline-slate-500  "
    >
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-xs text-gray-400">Posted by {data.owner}. </p>

          <Moment
            date={data.created_at}
            fromNow
            className="font-thin text-xs text-gray-400"
          />
        </div>
        <div className="flex items-center space-x-3">
          <h2 className="font-semibold text-sm capitalize">
            s/{data.category.toLowerCase()}
          </h2>
          {authority && (
            <div
              ref={optionRef}
              onClick={(e: SyntheticEvent) => {
                e.stopPropagation();
                setIsOption((prev) => !prev);
              }}
              className="relative p-2 group"
            >
              <BsThreeDots
                size={20}
                className="text-gray-400 group-hover:text-primary"
              />
              {isOption && (
                <div
                  className={`flex flex-col text-center items-center absolute  bg-primary  shadow-xl outline outline-1 py-1 rounded z-20 right-0 `}
                >
                  <button
                    onClick={(e: SyntheticEvent) => {
                      e.stopPropagation();
                      setShowModal(true);
                      setIsOption(false);
                    }}
                    className="hover:bg-accent w-full mx-2"
                    type="button"
                    data-modal-toggle="deleteModal"
                  >
                    <h2>delete</h2>
                  </button>
                  <button
                    disabled={user?.username !== data.owner}
                    onClick={goToEdit}
                    className="hover:bg-accent w-full mx-2 disabled:bg-gray-300 disabled:cursor-not-allowed "
                  >
                    <h2>edit</h2>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <h1 className="font-semibold text-xl">{data.title}</h1>
      {data.banner && (
        <img
          src={`${import.meta.env.VITE_APP_BASE_URL}/public/tmp/${data.banner}`}
          alt="banner"
          className="w-11/12 h-72  mx-auto rounded"
        />
      )}

      <div className={`${data.banner ? "line-clamp-2" : "line-clamp-6"}`}>
        <p>{data.content}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex justify-evenly space-x-2    ">
          <BiUpvote
            onClick={onLike}
            size={18}
            className={`${isLiked ? "text-accent" : ""} cursor-pointer`}
          />
          <BiDownvote className="cursor-pointer" onClick={onNoLike} size={18} />
        </div>
        <p>{data.comment || 0} comment</p>
      </div>

      <div
        id="deleteModal"
        onClick={(e: SyntheticEvent) => {
          e.stopPropagation();
          setShowModal(false);
        }}
        className={` flex flex-col ${
          !showModal
            ? "hidden"
            : "absolute flex top-0 bottom-0 left-0 right-0 z-10 "
        }   bg-gray-600/80 duration-200 text-white  `}
      >
        <div className="flex items-center justify-between   border-b border-b-gray-200   h-16  px-3">
          <h1 className="text-xl font-semibold">Delete {data.title}</h1>
          <div className="p-2 hover:bg">
            <IoMdClose size={28} />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-white/80">
            You are about to delete <strong>{data.title}</strong> by
            <strong> {data.owner}</strong>
          </h2>
        </div>
        <div className="flex p-4 space-x-5 font-semibold ">
          <button
            onClick={onDeleteForum}
            className="px-3 py-2 bg-button rounded-md"
          >
            Delete
          </button>
          <button
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              setShowModal(false);
            }}
            className="px-3 py-2 outline outline-1 rounded-md hover:bg-gray-400 "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
