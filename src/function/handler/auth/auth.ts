import axios from "axios";
// axios.defaults.baseURL = "http://127.0.0.1:3003";

interface TokenType {
  access_token: string;
  refresh_token: string;
}

const signInFunc = async (username: string, password: string) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:3003/api/auth/signIn",
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
      url: "http://127.0.0.1:3003/api/auth/signUp",
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

const signOutFunc = async (token: TokenType) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:3003/api/auth/signOut",
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

export { signInFunc, signOutFunc, signUpFunc };
