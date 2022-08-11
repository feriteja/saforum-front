import React, { SyntheticEvent, useRef, useState } from "react";
import { BsChat, BsGear, BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import {
  AuthTokenType,
  detailForumType,
} from "../../../constant/type/DataType";
import { systemState } from "../../../context/SystemContext";
import { UserState } from "../../../context/UserContext";
import { deleteForum } from "../../../function/handler/forum/forum";

const Content = ({ ...props }: detailForumType) => {
  const { user } = UserState();
  const navigate = useNavigate();
  const [isOption, setIsOption] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const optionRef = useRef<HTMLButtonElement>(null);
  const { showLoading, showSnackbar } = systemState();
  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );

  const authority =
    user?.username === props.owner?.username ||
    user?.role === "admin" ||
    user?.role === "superadmin";

  const toChat = () => {
    navigate("/chat", { state: { room: props.fuid, target: props.title } });
  };

  const goToEdit = () => {
    return navigate("/forum/edit", { state: props });
  };

  const onDeleteForum = async () => {
    try {
      showLoading(true);
      await deleteForum(props.fuid || "", token as AuthTokenType);
      showSnackbar("Forum has been deleted");
      showLoading(false);
      navigate("/");
    } catch (error) {
      showLoading(false);
      showSnackbar("Forum failed to be deleted");

      throw error;
    }
  };

  const onCategoryClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    navigate(`/forum/s/${props.category.toUpperCase()}`);
  };

  const onUserNameClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    navigate(`/user/${props.owner?.username}`);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 ">
          <h2
            onClick={onCategoryClick}
            className="text-xs font-bold flex hover:underline cursor-pointer"
          >
            s/{props.category}
          </h2>
          <h1
            onClick={onUserNameClick}
            className="text-xs hover:underline cursor-pointer "
          >
            . Posted by u/{props.owner?.username}
          </h1>
          <Moment
            format="D MMM YYYY"
            date={props.created_at}
            withTitle
            className="text-xs "
          />
        </div>
        <div className="flex items-center space-x-3">
          <div onClick={toChat} className="flex shadow-sm cursor-pointer">
            <BsChat size={20} />
            <p>LiveChat</p>
          </div>

          {authority && (
            <button
              ref={optionRef}
              onClick={(e: SyntheticEvent) => {
                e.stopPropagation();
                setIsOption((prev) => !prev);
              }}
              className=" p-2 group"
            >
              <BsThreeDots
                size={20}
                className="text-gray-400 group-hover:text-primary"
              />
              {isOption && (
                <div
                  className={`flex flex-col text-center items-center absolute  bg-primary  shadow-xl outline outline-1 py-1 rounded  right-0 `}
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
                    disabled={user?.username !== props.owner?.username}
                    onClick={goToEdit}
                    className="hover:bg-accent w-full mx-2 disabled:bg-gray-300 disabled:cursor-not-allowed "
                  >
                    <h2>edit</h2>
                  </button>
                </div>
              )}
            </button>
          )}
        </div>
      </div>
      <h1 className="font-semibold text-xl">{props.title}</h1>
      {props.banner !== "undefined" && props.banner && (
        <img
          src={`${import.meta.env.VITE_APP_BASE_URL}/public/tmp/${
            props.banner
          }`}
          alt="banner"
          className="w-10/12 h-48 md:h-72 lg:h-96 mx-auto rounded"
        />
      )}
      <p>{props.content}</p>
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
          <h1 className="text-xl font-semibold">Delete {props.title}</h1>
          <div className="p-2 hover:bg">
            <IoMdClose size={28} />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-white/80">
            You are about to delete <strong>{props.title}</strong> by
            <strong> {props.owner?.username}</strong>
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

export default Content;
