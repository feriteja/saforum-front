import axios from "axios";
import { UserType } from "../../../constant/type/DataType";

interface ProfileResponseType {
  message: string;
  user: UserType;
}

const getUserDetailByUsername = async (username?: string) => {
  try {
    console.log("username", username);
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

export { getUserDetailByUsername };
