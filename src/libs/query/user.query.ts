import { useMutation } from "@tanstack/react-query";
import {
  getCurrentUser,
  getVerifyCode,
  userLogin,
} from "../actions/user.action";

import type { TUserSignIn } from "../../pages/types/user.types";

export const useUserLogin = () => {
  return useMutation({
    mutationFn: (data: TUserSignIn) => userLogin(data),
  });
};

export const useGetCurrentUser = () => {
  return useMutation({
    mutationFn: () => getCurrentUser(),
  });
};

export const useGetVerifyCode = () => {
  return useMutation({
    mutationFn: (data: { email: string }) => getVerifyCode(data),
  });
};
