import axios from "axios";
import {
  AuthTokenType,
  CommentType,
  detailForumType,
  ForumType,
} from "../../../constant/type/DataType";
const urlWithProxy = "/api/vi";

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
      // baseURL: `/forum/${category || ""}`,
      url: `/forum/${category}`,
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
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

export { addForum, getAllForum, getForumDetail, addComment, updateForum };
