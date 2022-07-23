import axios from "axios";
import { UserType } from "../../../constant/type/DataType";

interface ProfileResponseType {
  message: string;
  data: UserType;
}

const getUserDetailByUsername = async (username: string) => {
  try {
    const res = await axios.request<ProfileResponseType>({
      baseURL: "http://127.0.0.1:3003/api/user",
      method: "get",
      url: "/detail",
      data: {
        username,
      },
    });

    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export { getUserDetailByUsername };
