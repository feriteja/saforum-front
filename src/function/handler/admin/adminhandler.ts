import axios from "axios";
import {
  AppLogType,
  AuthTokenType,
  UserType,
} from "../../../constant/type/DataType";

interface AllUserResponseType {
  message: string;
  data: UserType[];
}
interface userForumCount {
  message: string;
  data: { forumCount: number; usersCount: number };
}

interface AppLogProps {
  message: string;
  data: AppLogType[];
}

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

//! SUPER_ADMINONLY
const changeUserRole = async (
  token?: AuthTokenType | null,
  uuid?: string,
  role?: string
) => {
  try {
    const res = await axios({
      method: "patch",
      url: "/user/role",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
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

//! ADMINONLY
const getNumberUserForum = async (token: AuthTokenType | null) => {
  try {
    const res = await axios.request<userForumCount>({
      method: "get",
      url: "/user/userforum",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
      params: {
        refresh_token: token?.refresh_token,
      },
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

//! ADMINONLY
const getAppLog = async (token?: AuthTokenType) => {
  try {
    const res = await axios.request<AppLogProps>({
      method: "get",
      url: "/user/applog",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
      params: {
        refresh_token: token?.refresh_token,
      },
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export { getNumberUserForum, changeUserRole, getAllUser, getAppLog };
