import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../utils/local-storage.utils";
import { PROFILE, TOKEN } from "../constants/local-storage";
import type { TUser } from "../pages/types/user.types";
import { useGetCurrentUser } from "../libs/query/user.query";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { mutateAsync: getCurrentUser } = useGetCurrentUser();
  let token = getLocalStorage(TOKEN);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          removeLocalStorage(TOKEN);
          removeLocalStorage(PROFILE);
          alert("Server bilan aloqa o‘rnatib bo‘lmadi yoki user topilmadi");
          navigate("/login");
          return;
        }
        setLocalStorage(PROFILE, user, true);
        setUser(user as TUser);
      } catch (error) {
        console.error(error);
        removeLocalStorage(TOKEN);
        removeLocalStorage(PROFILE);
        alert("Xatolik yuz berdi. Iltimos keyinroq urinib ko‘ring.");
        navigate("/login");
      }
    };
    if (token) {
      setLocalStorage(TOKEN, token);
      getUser();
    }
  }, [token, getCurrentUser, navigate, setUser]);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);
};
