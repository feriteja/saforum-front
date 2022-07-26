import axios from "axios";
import {
  AuthTokenType,
  ForumType,
  UserType,
} from "../../../constant/type/DataType";

interface ProfileResponseType {
  message: string;
  user: UserType;
}
interface ProfileForumResponseType {
  message: string;
  data: ForumType[];
}

interface AllUserResponseType {
  message: string;
  data: UserType[];
}

const getUserDetailByUsername = async (username?: string) => {
  try {
    const res = await axios.request<ProfileResponseType>({
      method: "get",
      url: `/user/detail/${username}`,
    });

    return res.data.user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (formData: FormData, token: AuthTokenType) => {
  try {
    const res = await axios({
      method: "put",
      url: `/user`,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-type": "multipart/form-data",
      },
      data: formData,
    });
    return true;
  } catch (error) {
    throw error;
  }
};

const getUserForumByUsername = async (username: string) => {
  try {
    const res = await axios.request<ProfileForumResponseType>({
      method: "get",
      url: `/user/${username}`,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//! ADMINONLY
const getAllUser = async (token: AuthTokenType, username?: string) => {
  try {
    const res = await axios.request<AllUserResponseType>({
      method: "get",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
      url: `/user/`,
      params: {
        refresh_token: token?.refresh_token,
        username,
      },
    });
    return res.data.data;
  } catch (error) {}
};

const changeUserRole = async (
  token?: AuthTokenType | null,
  uuid?: string,
  role?: string
) => {
  try {
    const res = await axios({
      method: "patch",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
      url: "/user/role",
      data: {
        refresh_token: token?.refresh_token,
        uuid,
        role,
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export {
  getUserDetailByUsername,
  updateUser,
  getUserForumByUsername,
  getAllUser,
  changeUserRole,
};
