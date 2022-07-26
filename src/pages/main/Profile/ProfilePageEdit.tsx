import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import avatar from "../../../assets/avatar/avataaars.png";
import { AuthTokenType, UserType } from "../../../constant/type/DataType";
import { systemState } from "../../../context/SystemContext";
import { updateUser } from "../../../function/handler/user/userhandler";

const ProfilePageEdit = () => {
  const state = useLocation().state as UserType;
  const [avatar, setAvatar] = useState("");
  const [alias, setAlias] = useState(state?.alias || "");
  const [status, setStatus] = useState(state.status || "");
  const { showLoading, showSnackbar } = systemState();
  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );
  const navigate = useNavigate();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      showLoading(true);
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("refresh_token", token?.refresh_token || "");
      formData.append("alias", alias);
      formData.append("username", state.username);
      formData.append("status", status);
      await updateUser(formData, token as AuthTokenType);
      showSnackbar("Profile has been updated");
      showLoading(false);
      navigate(`/user/${state.username}`);
    } catch (error) {
      showSnackbar("Failed to update profile");

      showLoading(false);
      throw error;
    }
  };

  if (!state) {
    return <Navigate to={"/notFound"} replace />;
  }

  return (
    <div className="bg-primary py-8 px-6 ">
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="flex flex-col space-y-3 "
      >
        <input
          type="file"
          name="avatar"
          accept="image/*"
          multiple={false}
          onChange={(img) => setAvatar(img.target.files[0])}
        />
        <input
          type="text"
          name="alias"
          onChange={(txt) => setAlias(txt.target.value)}
          placeholder={alias}
          className="w-full  border  border-primary rounded-md p-2 bg-primary shadow focus:outline focus:outline-1"
        />
        <textarea
          name="status"
          onChange={(txt) => setStatus(txt.target.value)}
          value={status}
          id="status"
          maxLength={250}
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
};

export default ProfilePageEdit;
