import axios from "axios";
// axios.defaults.baseURL = "http://127.0.0.1:3003";

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

const signOutFunc = async (accessToken: string) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:3003/api/auth/signOut",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export { signInFunc, signOutFunc, signUpFunc };
