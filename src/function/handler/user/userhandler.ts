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

interface UpdateUserProps {
  alias?: string;
  status?: string;
  avatar?: FormData;
}

const getUserDetailByUsername = async (username?: string) => {
  try {
    const res = await axios.request<ProfileResponseType>({
      method: "get",
      baseURL: "http://127.0.0.1:3003/api/user",
      url: `/detail/${username}`,
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
      baseURL: "http://127.0.0.1:3003/api/user",
      url: `/`,
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
    const res = await axios.request<ForumType[]>({
      method: "get",
      baseURL: "http://127.0.0.1:3003/api/user",
      url: `/${username}`,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getUserDetailByUsername, updateUser, getUserForumByUsername };
