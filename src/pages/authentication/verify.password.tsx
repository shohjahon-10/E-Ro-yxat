/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { ROUTES } from "../../constants/path.cons";
import { useUserStore } from "../../store/user";
import { useToastify } from "../../hooks";
import { useGetVerifyCode } from "../../libs/query/user.query";
import type { TResponse, TVerifyPassword } from "../types/login.type";
import Loading from "../../components/loading";

const VerifyPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.themeConfig.theme);
  useEffect(() => {
    dispatch(setPageTitle(t("login.forgetPassword")));
  });
  const { setConfirmCode, setEmail: setUserEmail } = useUserStore();
  const { LOGIN, RESET_PASSWORD } = ROUTES;
  const [notFoundUser, setNotFoundUser] = useState(false);
  const [verification, setVerification] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [inputStatus, setInputStatus] = useState(0);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { toastify } = useToastify();
  const [isPending, setIspending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },

    clearErrors,
  } = useForm<{ email: string }>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (verification && timeLeft > 0) {
      setIsTimerActive(true);
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => {
        setIsTimerActive(false);
        clearInterval(timer);
      };
    }
  }, [verification, timeLeft]);

  const { mutateAsync: getVerifyCode } = useGetVerifyCode();

  const submitForm = async (data: { email: string }) => {
    setIspending(true);
    try {
      const res = (await getVerifyCode(data)) as TResponse;
      if (res?.message === "Tasdiqlash kodi emailga yuborildi.") {
        if (timeLeft === 0) {
          setTimeLeft(60);
        }
        toastify({ message: t("login.sentCode"), type: "success" });
        setVerification(true);
        setIsTimerActive(true);
      } else if (res?.message === "User not found") {
        setNotFoundUser(true);
      } else {
        toastify({ message: t("general.serverErr"), type: "error" });
      }
    } catch {
      toastify({ message: t("general.serverErr"), type: "error" });
    } finally {
      setIspending(false);
    }
  };

  const handleClearErr = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("email");
    setNotFoundUser(false);
    setEmail(e.target.value);
  };

  const { mutateAsync: verifyEmailCode } = useGetVerifyCode();

  const checkCode = async (data: TVerifyPassword) => {
    const res = (await verifyEmailCode(data)) as TResponse;
    if (res?.message === "Tasdiqlash kodi to‘g‘ri.") {
      setConfirmCode(data?.confirm_code);
      setUserEmail(data?.email);
      setInputStatus(1);
      toastify({ message: t("login.verified"), type: "success" });
      setTimeout(() => {
        navigate(RESET_PASSWORD);
      }, 600);
    } else if (res?.message === "Tasdiqlash kodi noto‘g‘ri.") {
      setInputStatus(-1);
      toastify({ message: t("login.notVerified"), type: "error" });
    } else {
      toastify({ message: t("general.serverErr"), type: "error" });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      } p-6 sm:p-10 relative`}
    >
      <div
        className={`w-full max-w-4xl ${
          theme === "light" ? "bg-white/40 backdrop-blur-lg" : "bg-gray-800"
        } rounded-lg shadow-lg flex overflow-hidden relative border ${
          theme === "light" ? "border-gray-300" : "border-gray-700"
        } transition-all duration-500`}
      >
        <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center items-start">
          <div className="w-full break-words">
            <h2
              className={`text-3xl font-semibold mb-3 ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              {t("login.confirmEmail")}
            </h2>
            <p
              className={`mb-6 ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {verification
                ? t("login.enterCode")
                : t("login.confirmEmailDescr")}
            </p>

            <form
              onSubmit={handleSubmit(submitForm)}
              className="flex flex-col space-y-5"
            >
              {!verification && (
                <div>
                  <label
                    htmlFor="Email"
                    className={`${
                      theme === "light" ? "text-gray-800" : "text-gray-300"
                    }`}
                  >
                    {t("login.email")}
                  </label>
                  <div className="relative">
                    <input
                      {...register("email", {
                        required: {
                          value: true,
                          message: t("login.enterEmail"),
                        },
                      })}
                      id="Email"
                      type="email"
                      onChange={handleClearErr}
                      placeholder={t("login.email")}
                      className={`w-full p-3  border rounded-lg focus:ring focus:outline-none ${
                        theme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-gray-600 bg-gray-900 text-white"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}

              {verification && (
                <div className="w-full p-3 bg-gray-200 dark:bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg">
                  <div className="flex flex-col space-y-3">
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      {t("login.verificationCode")}
                    </h3>
                    <h4 className="text-[12px] font-normal text-gray-600 dark:text-gray-300">
                      {t("login.enterVerification")}
                    </h4>

                    <div className="w-full flex justify-center">
                      <button
                        type="submit"
                        disabled={isTimerActive || isPending}
                        className={`${
                          isTimerActive || isPending
                            ? "opacity-50"
                            : "hover:underline"
                        } text-md font-semibold w-max text-primary`}
                      >
                        {t("login.resend")}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {notFoundUser && (
                <div className="w-full text-center">
                  <p className="text-danger">{t("login.notFoundUser")}</p>
                </div>
              )}

              {!verification && (
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-semibold transition duration-300 bg-blue-600 text-white select-none"
                >
                  {isPending ? <Loading /> : t("login.sendEmail")}
                </button>
              )}
            </form>
            {verification && (
              <button
                onClick={() => setVerification(false)}
                type="button"
                className="w-full py-3 mt-5 rounded-lg font-semibold transition duration-300 bg-blue-600 text-white select-none"
              >
                {t("login.otherEmail")}
              </button>
            )}
          </div>

          <Link
            className="text-primary text-md font-semibold mt-3 hover:underline"
            to={LOGIN}
          >
            {t("login.exist")}
          </Link>
        </div>

        <div className="hidden sm:block sm:w-1/2 relative">
          <div className="absolute inset-0 bg-black opacity-20 rounded-r-lg"></div>
          <img
            src="/assets/images/reset.webp"
            alt="Modern Dashboard"
            className="h-full w-full object-cover rounded-r-lg"
          />
          <div className="absolute bottom-6 left-6 text-white text-lg font-semibold">
            <p className="text-2xl font-extrabold">
              DTIL - Raqamli texnik tekshiruv jurnali
            </p>
            <p className="text-lg">{t("login.quality")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;
