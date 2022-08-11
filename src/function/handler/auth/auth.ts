import axios from "axios";
import { AuthTokenType } from "../../../constant/type/DataType";
// axios.defaults.baseURL = "http://127.0.0.1:3003";

interface SignType {
  message: string;
  token: AuthTokenType;
}

const signInFunc = async (username: string, password: string) => {
  try {
    const res = await axios({
      method: "post",
      url: "/auth/signIn",
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

const signUpFunc = async (username: string, password: string) => {
  try {
    const res = await axios({
      method: "post",
      url: "/auth/signUp",
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
      url: "/auth/signOut",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      data: {
        refresh_token: token.refresh_token,
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

const signRefresh = async (token: AuthTokenType) => {
  try {
    const res = await axios.request<SignType>({
      method: "get",
      url: "/auth/refresh",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      params: {
        refresh_token: token.refresh_token,
      },
    });
    return res.data.token;
  } catch (error) {}
};

export { signInFunc, signOutFunc, signUpFunc, signRefresh };
