import axios from "axios";
import {
  AppLogType,
  AuthTokenType,
  UserType,
} from "../../../constant/type/DataType";

interface AllUserResponseType {
  data: UserType[];
  totalPages: number;
  currentPages: number;
  total: number;
}
interface userForumCount {
  message: string;
  data: { forumCount: number; userCount: number };
}

interface AppLogProps {
  currentPages: number;
  totalPages: number;
  data: AppLogType[];
}

//! ADMINONLY
const getAllUser = async ({
  token,
  username,
  offset = 0,
  limit = 20,
}: {
  token: AuthTokenType;
  username?: string;
  offset?: number;
  limit?: number;
}) => {
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
    return res.data;
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
const getAppLog = async ({
  token,
  limit = 20,
  offset = 0,
}: {
  token?: AuthTokenType;
  limit?: number;
  offset?: number;
}) => {
  try {
    const res = await axios.request<AppLogProps>({
      method: "get",
      url: "/user/applog",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
      params: {
        offset,
        limit,

        refresh_token: token?.refresh_token,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export { getNumberUserForum, changeUserRole, getAllUser, getAppLog };
