import axios from "axios";
import { AuthTokenType, UserType } from "../../../constant/type/DataType";
// axios.defaults.baseURL = "http://127.0.0.1:3003";

interface IAuthResponse {
  user: UserType;
  token: AuthTokenType;
}

const signInFunc = async (username: string, password: string) => {
  try {
    const res = await axios.request<IAuthResponse>({
      method: "post",
      url: "/auth/signin",
      data: {
        username,
        password,
      },
    });
    console.log("res", res);
    return res;
  } catch (error: any) {
    throw error.response;
  }
};

const signUpFunc = async (username: string, password: string) => {
  try {
    const res = await axios.request<IAuthResponse>({
      method: "post",
      url: "/auth/signup",
      data: {
        username,
        password,
      },
    });

    return res;
  } catch (error: any) {
    throw error.response;
  }
};

const signOutFunc = async (token: AuthTokenType) => {
  try {
    const res = await axios({
      method: "post",
      url: "/auth/signout",

      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signRefresh = async () => {
  try {
    const res = await axios.request<AuthTokenType>({
      method: "get",
      url: "/auth/refresh",
      withCredentials: true,
    });

    const tokenData = JSON.stringify(res.data);

    localStorage.setItem("authToken", tokenData);

    return res;
  } catch (error) {
    console.log("errorrefresh", error);
    throw error;
  }
};

export { signInFunc, signOutFunc, signUpFunc, signRefresh };
