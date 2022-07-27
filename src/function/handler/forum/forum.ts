import axios from "axios";
import {
  AuthTokenType,
  CommentType,
  detailForumType,
  ForumType,
} from "../../../constant/type/DataType";
const urlWithProxy = "/api/vi";

interface ResponseForumType {
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
    const res = await axios.request<ResponseForumType>({
      method: "get",
      url: `/forum/`,
      params: {
        category,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPopularForum = async () => {
  try {
    const res = axios.request<ResponseForumType>({
      method: "get",
      url: "/forum/popular",
    });
    return (await res).data.data;
  } catch (error) {
    throw error;
  }
};

const getForumDetail = async (forumId?: string) => {
  try {
    const res = await axios.request<ResponseDetilForumType>({
      method: "get",
      url: `forum/s/${forumId}`,
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

const getSearchForum = async (title: string) => {
  try {
    const res = await axios.request<ResponseForumType>({
      method: "get",
      url: "/forum/search",
      params: { userInput: title },
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
      url: "/forum/add",
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
    console.log("first");
    return true;
  } catch (error) {}
};

const addComment = async ({ comment, forumID, token }: AddCommentProps) => {
  try {
    const res = await axios({
      method: "patch",
      url: "/forum/comment",
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
