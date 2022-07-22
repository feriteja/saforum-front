import axios from "axios";
import { AuthTokenType, ForumType } from "../../../constant/type/DataType";
axios.defaults.baseURL = "http://127.0.0.1:3003/api/forum";

const getAllForum = async (category?: string) => {
  try {
    const res = await axios({
      method: "get",
      url: "/",
      data: {
        category,
      },
    });
    return res;
  } catch (error) {}
};

const addForum = async ({
  data,
  token,
}: {
  data: ForumType;
  token: AuthTokenType;
}) => {
  try {
    const res = await axios({
      method: "post",
      url: "/add",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      data: {
        refresh_token: token.refresh_token,
        title: data.title,
        content: data.content,
        category: data.category,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export { addForum, getAllForum };
