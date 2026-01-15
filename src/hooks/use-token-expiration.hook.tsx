import { useEffect } from "react";
import { REFRESH_TOKEN, TOKEN } from "../constants/local-storage";
import { useUserStore } from "../store/user";
import { getLocalStorage, setLocalStorage } from "../utils/local-storage.utils";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../libs/actions/user.action";

interface DecodedToken {
  exp: number;
}
interface RefreshAccessTokenResponse {
  access_token: string;
}

export const useTokenExpiration = () => {
  const logOut = useUserStore((state) => state.logOut);
  const token = getLocalStorage(TOKEN);
  const refreshToken = getLocalStorage(REFRESH_TOKEN);

  useEffect(() => {
    const handleTokenExpiration = async () => {
      if (token) {
        try {
          const decodedToken: DecodedToken = jwtDecode(token);
          if (!decodedToken.exp) return;
          const expirationTime = decodedToken.exp * 1000;
          const now = Date.now();

          if (expirationTime <= now) {
            const newAccessToken = (await refreshAccessToken({
              refresh_token: refreshToken,
            })) as RefreshAccessTokenResponse | null;

            if (newAccessToken?.access_token) {
              setLocalStorage(TOKEN, newAccessToken.access_token);
            } else {
              logOut();
            }
          } else {
            const timeout = expirationTime - now;

            const timer = setTimeout(async () => {
              const newAccessToken = (await refreshAccessToken({
                refresh_token: refreshToken,
              })) as RefreshAccessTokenResponse | null;

              if (newAccessToken?.access_token) {
                setLocalStorage(TOKEN, newAccessToken.access_token);
              } else {
                logOut();
              }
            }, timeout);

            return () => clearTimeout(timer);
          }
        } catch (err) {
          console.error(err);
          logOut();
        }
      }
    };

    handleTokenExpiration();
  }, [token, refreshToken, logOut]);
};
