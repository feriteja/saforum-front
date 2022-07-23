import React, { SyntheticEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CommentCard } from "../../../components";
import { CommentType } from "../../../constant/type/DataType";
import { systemState } from "../../../context/SystemContext";
import { addComment } from "../../../function/handler/forum/forum";

interface props {
  alias?: string;
  forumID?: string;
  comment?: CommentType[];
}

const Comment = ({ ...props }: props) => {
  const [commentText, setCommentText] = useState("");
  const [cookies] = useCookies();
  const date = new Date();
  const { showSnackbar, showLoading } = systemState();
  const navigate = useNavigate();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      comment: commentText,
      created_at: date,
    };

    try {
      showLoading(true);
      await addComment({
        comment: data,
        token: cookies.authCookie,
        forumID: props.forumID || "",
      });
      showLoading(false);
      showSnackbar("comment success");

      navigate(0);
    } catch (error) {
      showLoading(false);
      showSnackbar("comment failed");
      throw error;
    }
  };

  return (
    <div className="py-4  bg-primary">
      <form
        onSubmit={onSubmit}
        className="flex flex-col space-y-2 ml-10 px-4 border-b-2 mr-3 pb-3"
      >
        <label htmlFor="commentArea" className="text-sm">
          Comment as <strong className="text-blue-500">{props.alias}</strong>
        </label>
        <textarea
          onChange={(text) => setCommentText(text.target.value)}
          value={commentText}
          className="resize-none bg-primary outline-none border-2 w-full rounded-md px-3 py-1"
          name="commentArea"
          placeholder="What are your thought"
          id="commentArea"
          required
          rows={6}
        ></textarea>
        <input
          type="submit"
          className="cursor-pointer self-end mr-3 text-black  rounded-full bg-accent  px-3 py-1 font-bold"
        />
      </form>
      {props.comment?.map((val, idx) => {
        return <CommentCard key={val.id} {...val} />;
      })}
    </div>
  );
};

export default Comment;
