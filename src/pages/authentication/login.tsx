import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../store/user";
import type { TLogin } from "../types/login.type";
import type { TUserSignInResponse } from "../types/user.types";
import { useToastify } from "../../hooks";
import { useUserLogin } from "../../libs/query/user.query";
import IconUser from "../../components/IconUser";
import IconLockDots from "../../components/IconLockDots";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../components/loading";
import "./login.style.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector(
    (state: { themeConfig: { theme: string } }) => state.themeConfig.theme
  );

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    dispatch(setPageTitle(t("login.login")));
  }, [dispatch, t]);

  const { setUserData } = useUserStore();
  const { toastify } = useToastify();
  const { mutateAsync: userLogin } = useUserLogin();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLogin>({
    mode: "onBlur",
  });

  const submitForm = async (data: TLogin) => {
    setIsPending(true);
    try {
      const res = (await userLogin(data)) as TUserSignInResponse;
      console.log(res);

      if (res && res.access_token) {
        setUserData(res);
        toastify({
          message: "Siz muvaffaqiyatli tizimga kirdingiz",
          type: "success",
        });
        navigate("/", { replace: true });
        reset();
      } else {
        toastify({
          message:
            "Tizimga kirishda xatolik yuz berdi. Iltimos, ma'lumotlarni tekshiring va qayta urinib ko'ring.",
          type: "error",
        });
      }
    } catch {
      toastify({
        message: t("general.serverErr"),
        type: "error",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className={`login-card ${theme}`}>
        <div className="login-form-section">
          <div className="login-header">
            <h1 className="login-title">E-Ro'yxatga olish</h1>
            <p className={`login-subtitle ${theme}`}>
              Iltimos, tizimga kirish uchun ma'lumotlarni kiriting
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit(submitForm)}>
            {/* LOGIN */}
            <div className="login-form-group">
              <label className={`login-label ${theme}`}>Login</label>
              <div className="login-input-container">
                <input
                  {...register("login", { required: "Login xato" })}
                  type="text"
                  placeholder="Login kiriting"
                  className={`login-input ${theme}`}
                />
                <span className="login-input-icon">
                  <IconUser fill />
                </span>
              </div>
              {errors.login && (
                <p className="login-error">{errors.login.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="login-form-group">
              <label className={`login-label ${theme}`}>Parol</label>
              <div className="login-input-container">
                <input
                  {...register("password", { required: "Parol xato" })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Parol kiriting"
                  className={`login-input ${theme}`}
                />
                <span className="login-input-icon">
                  <IconLockDots fill />
                </span>

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p className="login-error">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="login-submit-button"
              disabled={isPending}
            >
              {isPending ? <Loading /> : "Kirish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
