import type { TUserSignIn } from "../../pages/types/user.types";
import { API } from "../api/api";
import { ENDPOINTS } from "../api/endpoints";

export const userLogin = async (data: TUserSignIn) => {
  try {
    const response = await API.post(ENDPOINTS.signIn, data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const refreshAccessToken = async (refreshToken: {
  refresh_token: string;
}) => {
  try {
    const data = await API.post(ENDPOINTS.refreshToken, refreshToken);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getCurrentUser = async () => {
  try {
    const data = await API.get(ENDPOINTS.userMe);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getVerifyCode = async (data: { email: string }) => {
  try {
    const res = await API.post(ENDPOINTS.forgotPassword, data);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
