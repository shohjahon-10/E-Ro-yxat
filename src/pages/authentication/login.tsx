import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../store/user";
import type { TLogin } from "../types/login.type";
import type { TUserSignInResponse } from "../types/user.types";
import { ROUTES } from "../../constants/path.cons";
import { useToastify } from "../../hooks";
import { useUserLogin } from "../../libs/query/user.query";
import IconUser from "../../components/IconUser";
import IconLockDots from "../../components/IconLockDots";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../components/loading";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector(
    (state: { themeConfig: { theme: string } }) => state.themeConfig.theme
  );
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  useEffect(() => {
    dispatch(setPageTitle(t("login.login")));
  });
  const { setUserData } = useUserStore();
  const { toastify } = useToastify();
  const { mutateAsync: userLogin } = useUserLogin();
  const [isPending, setIspending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLogin>({
    mode: "onBlur",
  });

  const { VERIFY_PASSWORD } = ROUTES;

  const submitForm = async (data: TLogin) => {
    setIspending(true);
    try {
      const res = (await userLogin(data)) as TUserSignInResponse;
      console.log(res);

      if (res?.access_token) {
        setUserData(res);
        toastify({ message: t("login.loginSuccess"), type: "success" });
        reset();
      } else {
        toastify({
          message: res ? t("login.loginError") : t("general.serverErr"),
          type: "error",
        });
      }
    } catch {
      toastify({ message: t("general.serverErr"), type: "error" });
    } finally {
      setIspending(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      } p-6 sm:p-10 relative`}
    >
      <div className="absolute top-6 right-6 flex space-x-4"></div>

      <div
        className={`w-full max-w-4xl ${
          theme === "light" ? "bg-white/40 backdrop-blur-lg" : "bg-gray-800"
        } rounded-lg shadow-lg flex overflow-hidden relative border ${
          theme === "light" ? "border-gray-300" : "border-gray-700"
        } transition-all duration-500`}
      >
        <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center">
          <h2
            className={`text-3xl font-semibold mb-3 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            {t("login.welcome")}
          </h2>
          <p
            className={`mb-6 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {t("login.enterData")}
          </p>

          <form onSubmit={handleSubmit(submitForm)}>
            <div>
              <label
                htmlFor="login"
                className={`${
                  theme === "light" ? "text-gray-800" : "text-gray-300"
                }`}
              >
                {t("login.login")}
              </label>
              <div className="relative">
                <input
                  {...register("login", {
                    required: { value: true, message: t("login.enterPhone") },
                  })}
                  id="login"
                  type={"text"}
                  placeholder={t("login.enterPhone")}
                  className={`w-full p-3 ps-10 border rounded-lg focus:ring focus:outline-none ${
                    theme === "light"
                      ? "border-gray-300 bg-white"
                      : "border-gray-600 bg-gray-900 text-white"
                  }`}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <IconUser fill={true} />
                </span>
              </div>
              {errors.login && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.login.message}
                </p>
              )}
            </div>
            <div className="mt-5">
              <label
                htmlFor="Password"
                className={`${
                  theme === "light" ? "text-gray-800" : "text-gray-300"
                }`}
              >
                {t("login.password")}
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: t("login.enterPassword"),
                    },
                  })}
                  id="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("login.enterPassword")}
                  className={`w-full p-3 ps-10 border rounded-lg focus:ring focus:outline-none ${
                    theme === "light"
                      ? "border-gray-300 bg-white"
                      : "border-gray-600 bg-gray-900 text-white"
                  }`}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <IconLockDots fill={true} />
                </span>
                <div
                  className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer`}
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-full flex justify-start mt-2 mb-5">
              <Link
                to={VERIFY_PASSWORD}
                className="text-sm text-right text-blue-600 hover:underline"
              >
                {t("login.forgetPassword")}
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition duration-300 bg-blue-600 text-white select-none"
            >
              {isPending ? <Loading /> : t("login.enterSystem")}
            </button>
          </form>
          <p className="text-sm text-gray-700 dark:text-white mt-8">
            {t("login.following_numbers")}:&nbsp;
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              +998.88.639.99.01,&nbsp; 55 067,&nbsp;55 291,&nbsp;55 292
            </span>
          </p>
        </div>

        <div className="hidden sm:block sm:w-1/2 relative">
          <div className="absolute inset-0 bg-black opacity-20 rounded-r-lg"></div>
          <video
            src="/assets/images/video.mp4"
            autoPlay
            loop
            muted
            className="h-full w-full object-cover rounded-r-lg"
          ></video>
          <div className="absolute bottom-6 left-6 text-white text-lg font-semibold">
            <p className="text-2xl font-extrabold">{t("login.logo")}</p>
            <p className="text-lg">{t("login.dtil")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
