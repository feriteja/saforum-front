import React, { SyntheticEvent } from "react";

interface props {
  alias?: string;
}

const Comment = ({ ...props }: props) => {
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className="pt-4 mt-2 ">
      <form onSubmit={onSubmit} className="flex flex-col space-y-2 ">
        <label htmlFor="commentArea" className="text-sm">
          Comment as <strong className="text-blue-500">{props.alias}</strong>
        </label>
        <textarea
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
    </div>
  );
};

export default Comment;
