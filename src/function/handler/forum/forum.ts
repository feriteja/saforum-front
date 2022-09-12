import axios from "axios";
import {
  AuthTokenType,
  CommentType,
  detailForumType,
  ForumType,
} from "../../../constant/type/DataType";
import { signRefresh } from "../auth/auth";
const urlWithProxy = "/api/vi";

interface ResponseForumType {
  data: ForumType[];
  totalPages: number;
  currentPages: number;
  total: number;
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

const getAllForum = async ({
  category,
  limit,
  offset,
}: {
  category?: string;
  limit?: number;
  offset?: number;
}) => {
  try {
    const res = await axios.request<ResponseForumType>({
      method: "get",
      url: `/forum/`,
      params: {
        category,
        limit,
        offset,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getPopularForum = async () => {
  try {
    const res = await axios.request<ForumType[]>({
      method: "get",
      url: "/forum/popular",
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getForumDetail = async (forumId?: string) => {
  try {
    const res = await axios.request<ResponseDetilForumType>({
      method: "get",
      url: `forum/forumID/${forumId}`,
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

const getSearchForum = async ({ title = "", limit = 5, offset = 0 }) => {
  try {
    const res = await axios.request<ResponseForumType>({
      method: "get",
      url: "/forum/search",
      params: { userInput: title, limit, offset },
    });
    return res.data.data;
  } catch (error) {}
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
      url: "/forum",
      withCredentials: true,
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

const deleteForum = async (forumID: string, token: AuthTokenType) => {
  try {
    const res = await axios({
      method: "delete",
      url: "/forum/delete",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      data: {
        refresh_token: token.refresh_token,
        forumID,
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
};

const updateForum = async (formData: FormData, token: AuthTokenType) => {
  try {
    const res = await axios({
      method: "put",
      url: `/forum/update`,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-type": "multipart/form-data",
      },
      data: formData,
    });

    return true;
  } catch (error) {}
};

const addComment = async ({
  comment,
  forumID,
  token,
}: AddCommentProps): Promise<any> => {
  try {
    const res = await axios({
      method: "patch",
      url: "/forum",
      withCredentials: true,
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
  } catch (error: any) {
    console.log("errorcomment", error);
    if (error?.response?.status === 401) {
      const theToken = JSON.parse(localStorage.getItem("authToken") as any);

      await signRefresh();
      return addComment({
        comment,
        forumID,
        token: theToken,
      });
    }
    throw error;
  }
};

const likeForum = async (
  forumID: string,
  userID: string,
  token: AuthTokenType
) => {
  try {
    const res = await axios({
      method: "post",
      url: "/forum/like",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      data: {
        refresh_token: token.refresh_token,
        forumID,
        userID,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

const noLikeForum = async (
  forumID: string,
  userID: string,
  token: AuthTokenType
) => {
  try {
    const res = await axios({
      method: "post",
      url: "/forum/nolike",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      data: {
        refresh_token: token.refresh_token,
        forumID,
        userID,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export {
  addForum,
  getAllForum,
  getForumDetail,
  addComment,
  updateForum,
  deleteForum,
  likeForum,
  noLikeForum,
  getPopularForum,
  getSearchForum,
};
