import React, { SyntheticEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { AuthTokenType, ForumType } from "../../constant/type/DataType";
import { systemState } from "../../context/SystemContext";
import { updateForum } from "../../function/handler/forum/forum";

function EditForumSub() {
  const state = useLocation().state as ForumType;
  const [title, setTitle] = useState(state.title);
  const [content, setContent] = useState(state.content);
  const [banner, setBanner] = useState("");
  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );

  const navigate = useNavigate();

  const { showLoading, showSnackbar } = systemState();

  if (!state) {
    return <Navigate to={"/notFound"} />;
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      showLoading(true);
      const formData = new FormData();
      formData.append("banner", banner);
      formData.append("refresh_token", token?.refresh_token || "");
      formData.append("title", title || "");
      formData.append("content", content || "");
      formData.append("forumID", state.fuid as string);

      await updateForum(formData, token as AuthTokenType);
      showSnackbar("forum has been updated");
      showLoading(false);
      navigate(`/forum/s/${state.fuid}`);
    } catch (error) {
      showSnackbar("Failed to update forum");

      showLoading(false);
      throw error;
    }
  };

  return (
    <div className="py-8 px-6 ">
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="flex flex-col space-y-3 mt-6 bg-primary px-6 py-6 rounded "
      >
        <input
          type="file"
          name="banner"
          accept="image/*"
          multiple={false}
          onChange={(img) => setBanner(img.target.files[0])}
        />
        <input
          type="text"
          name="title"
          value={title}
          onChange={(txt) => setTitle(txt.target.value)}
          placeholder={state.title}
          className="w-full  border  border-primary rounded-md p-2 bg-primary shadow focus:outline focus:outline-1"
        />
        <textarea
          name="content"
          onChange={(txt) => setContent(txt.target.value)}
          value={content}
          id="content"
          rows={7}
          placeholder="status(optional)"
          className="resize-none w-full rounded-md shadow border focus:outline focus:outline-1 border-primary bg-primary p-2"
        />
        <input
          type="submit"
          value="Update"
          className="cursor-pointer self-end mr-3 text-black  rounded-full bg-accent  px-3 py-1 font-bold"
        />
      </form>
    </div>
  );
}

export default EditForumSub;
