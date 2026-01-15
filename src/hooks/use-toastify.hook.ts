/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { TToastify } from "../pages/types/toastify.types";

export const useToastify = () => {
  const theme = useSelector((state: any) => state.themeConfig.theme);
  const toastify = ({ message, type }: TToastify) => {
    toast(message, {
      position: "top-right",
      type: type,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: theme,
    });
  };
  return { toastify };
};
