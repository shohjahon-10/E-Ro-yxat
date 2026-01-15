/* eslint-disable @typescript-eslint/no-explicit-any */

import { ENDPOINTS } from "./endpoints";
import { BASE_URL } from "../../constants/url.cons";
import { REFRESH_TOKEN, TOKEN } from "../../constants/local-storage";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../utils/local-storage.utils";
import { useUserStore } from "../../store/user";

type QueuedRequest = (token: string) => void;

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 65_000,
});

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getLocalStorage(TOKEN);
  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
const queue: QueuedRequest[] = [];

API.interceptors.response.use(
  (res: any) => res.data,
  async (error: AxiosError<any>) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const logOut = useUserStore.getState().logOut;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push((token: string) => {
            if (!token) return reject(error);
            original.headers!.authorization = `Bearer ${token}`;
            resolve(API(original));
          });
        });
      }

      isRefreshing = true;
      const plainAxios = axios.create({ baseURL: BASE_URL, timeout: 20_000 });

      try {
        const refreshToken = getLocalStorage(REFRESH_TOKEN);
        if (!refreshToken) throw new Error("No refresh-token");

        const { data } = await plainAxios.post(ENDPOINTS.refreshToken, {
          refresh_token: refreshToken,
        });

        const newAccess = data.access_token;
        setLocalStorage(TOKEN, newAccess);

        API.defaults.headers.common.authorization = `Bearer ${newAccess}`;

        queue.forEach((cb) => cb(newAccess));
        queue.length = 0;

        original.headers!.authorization = `Bearer ${newAccess}`;
        return API(original);
      } catch (e) {
        queue.forEach((cb) => cb(""));
        queue.length = 0;
        logOut();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error?.response?.data ?? error);
  }
);

export { API };
