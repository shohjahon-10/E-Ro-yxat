import { create } from "zustand";

import { PROFILE, REFRESH_TOKEN, TOKEN } from "../../constants/local-storage";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../../utils/local-storage.utils";
import { createSelectors } from "../../utils/store.utils";
import type {
  TUser,
  TUserSignInResponse,
  TUserStore,
} from "../../pages/types/user.types";

const useUser = create<TUserStore>((set) => ({
  user: getLocalStorage(PROFILE, true),

  confirm_code: "",

  email: "",

  setConfirmCode: (str: string) => set(() => ({ confirm_code: str })),

  setEmail: (str: string) => set(() => ({ email: str })),

  setUserData: (data: TUserSignInResponse) =>
    set(() => {
      setLocalStorage(TOKEN, data.access_token);
      setLocalStorage(REFRESH_TOKEN, data.refresh_token);
      return {
        user: {
          ...data.user,
          role: data.role,
        } as TUser,
      };
    }),

  setUser: (user: TUser) => set(() => ({ user })),

  logOut: () =>
    set(() => {
      removeLocalStorage(TOKEN);
      removeLocalStorage(REFRESH_TOKEN);
      removeLocalStorage(PROFILE);
      localStorage.removeItem("selectedStationId");
      return {
        user: null,
      };
    }),
}));

export const useUserStore = createSelectors(useUser);
