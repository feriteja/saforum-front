import axios from "axios";
import {
  AuthTokenType,
  CommentType,
  detailForumType,
  ForumType,
} from "../../../constant/type/DataType";

interface ResponseAllForumType {
  message: string;
  data: ForumType[];
}
interface ResponseDetilForumType {
  message: string;
  data: detailForumType;
}

interface AddCommentProps {
  comment: string;
  token: AuthTokenType;
  forumID: string;
}

const getAllForum = async (category?: string) => {
  try {
    const res = await axios.request<ResponseAllForumType>({
      method: "get",
      baseURL: `http://127.0.0.1:3003/api/forum/${category}`,
      url: "/",
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

const getForumDetail = async (forumId?: string) => {
  try {
    const res = await axios.request<ResponseDetilForumType>({
      method: "get",
      baseURL: "http://127.0.0.1:3003/api/forum",
      url: `/s/${forumId}`,
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

const addForum = async ({
  data,
  token,
}: {
  data: FormData;
  token: AuthTokenType;
}) => {
  try {
    const res = await axios({
      method: "post",
      baseURL: "http://127.0.0.1:3003/api/forum",
      url: "/add",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      data: data,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

const addComment = async ({ comment, forumID, token }: AddCommentProps) => {
  try {
    const res = await axios({
      method: "patch",
      baseURL: "http://127.0.0.1:3003/api/forum",
      url: "/comment",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      data: {
        refresh_token: token.refresh_token,
        comment: comment,
        forumID: forumID,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { addForum, getAllForum, getForumDetail, addComment };
