import { Suspense, useState, type PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../hooks/use-auth.hook";
import { useTokenExpiration } from "../hooks";
import App from "../App";
import { Outlet } from "react-router-dom";
import type { IRootState } from "../store";
import { toggleSidebar } from "../store/themeConfigSlice"; // example path, to‘g‘ri yo‘lni yoz

export const RouteLayouts = ({ children }: PropsWithChildren) => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();
  const [showLoader] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const onScrollHandler = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  // Scroll event qo‘shish
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  }, []);

  useAuth();
  useTokenExpiration();

  return (
    <App>
      {/* BEGIN MAIN CONTAINER */}
      <div className="relative">
        {/* sidebar menu overlay */}
        <div
          className={`${
            (!themeConfig.sidebar && "hidden") || ""
          } fixed inset-0 bg-[black]/60 z-50 lg:hidden`}
          onClick={() => dispatch(toggleSidebar())}
        ></div>

        {/* screen loader */}
        {showLoader && (
          <div className="screen_loader fixed inset-0 bg-[#fafafa] dark:bg-[#060818] z-[60] grid place-content-center animate__animated">
            <svg
              width="64"
              height="64"
              viewBox="0 0 135 135"
              xmlns="http://www.w3.org/2000/svg"
              fill="#4361ee"
            >
              <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 67 67"
                  to="-360 67 67"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        )}

        {/* Scroll top button */}
        <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
          {showTopButton && (
            <button
              type="button"
              className="btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary"
              onClick={goToTop}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7l4-4m0 0l4 4m-4-4v18"
                />
              </svg>
            </button>
          )}
        </div>

        <div
          className={`${themeConfig.navbar} main-container text-black dark:text-white-dark min-h-screen`}
        >
          <div className="main-content flex flex-col min-h-screen">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
                  <svg
                    className="animate-spin h-12 w-12 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                </div>
              }
            >
              <div className={`${themeConfig.animation} p-6 animate__animated`}>
                <Outlet />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </App>
  );
};
