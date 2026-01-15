import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import {
  toggleRTL,
  toggleTheme,
  toggleLocale,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
} from "./store/themeConfigSlice";
import "react-toastify/dist/ReactToastify.css";
import { Fragment, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import type { IRootState } from "./store";
import { useUserStore } from "./store/user";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
interface FormData {
  fieldName: string;
}

function App({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const { user, logOut } = useUserStore();
  const [isOpenAddData, setIsOpenAddData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStationModalOpen, setIsStationModalOpen] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem("theme") || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem("menu") || themeConfig.menu));
    dispatch(
      toggleLayout(localStorage.getItem("layout") || themeConfig.layout)
    );
    dispatch(
      toggleRTL(localStorage.getItem("rtlClass") || themeConfig.rtlClass)
    );
    dispatch(
      toggleAnimation(
        localStorage.getItem("animation") || themeConfig.animation
      )
    );
    dispatch(
      toggleNavbar(localStorage.getItem("navbar") || themeConfig.navbar)
    );
    dispatch(
      toggleLocale(localStorage.getItem("i18nextLng") || themeConfig.locale)
    );
    dispatch(
      toggleSemidark(
        localStorage.getItem("semidark") === "true" || themeConfig.semidark
      )
    );
  }, [dispatch, themeConfig]);

  // ✅ isStationModalOpen faqat true bo'lganda modalni ko'rsatish
  // if (isStationModalOpen) {
  //   return ( ... )
  // }
  // Bu blokni commentga oling yoki o'chiring

  const closeStationModal = () => {
    setIsStationModalOpen(false);
    logOut();
  };

  const closeDutyModal = () => {
    setIsOpenAddData(false);
    localStorage.removeItem("selectedStationId");
    logOut();
  };

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    console.log(data);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpenAddData(false);
    }, 1000);
  };

  return (
    <>
      {/* ✅ Asosiy kontent har doim ko'rinishi kerak */}
      <div
        className={`${themeConfig.menu} ${themeConfig.layout} ${
          themeConfig.rtlClass === "rtl" ? "rtl" : "ltr"
        } main-section font-nunito text-sm dark:bg-gray-900 min-h-screen`}
      >
        {children}
      </div>

      {/* ✅ Station Modal (faqat ochilgan bo'lsa) */}
      {isStationModalOpen && (
        <Transition appear show={isStationModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-[1000] overflow-y-auto"
            onClose={closeStationModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-30" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    Station Modal
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Station modal content here
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeStationModal}
                    >
                      Yopish
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}

      {/* ✅ Duty Modal (faqat ochilgan va allowed bo'lsa) */}
      {isAllowed && isOpenAddData && (
        <Transition appear show={isOpenAddData} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-[1001] overflow-y-auto"
            onClose={closeDutyModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-30" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg">
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                      {t("app.duty_acceptance")}
                    </Dialog.Title>
                    <button
                      aria-label="Yopish"
                      type="button"
                      onClick={closeDutyModal}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col items-center mb-4">
                        <h5 className="text-2xl text-center font-bold">
                          Assalomu alaykum!
                        </h5>
                        <div className="text-xl text-blue-600 dark:text-sky-400 p-2">
                          {user?.fullname || "Foydalanuvchi"}
                        </div>
                        <p className="text-center p-2">{t("app.text")}</p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Ma'lumot
                        </label>
                        <input
                          type="text"
                          {...register("fieldName", { required: true })}
                          className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        {errors.fieldName && (
                          <span className="text-red-500 text-sm">
                            Bu maydon to'ldirilishi shart
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <button
                          type="button"
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                          onClick={closeDutyModal}
                          disabled={isLoading}
                        >
                          {t("app.cancel")}
                        </button>
                        {isLoading ? (
                          <div className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg">
                            <svg
                              className="animate-spin h-5 w-5 text-white mr-2"
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
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Yuklanmoqda...
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                          >
                            {t("app.duty_acceptance")}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={themeConfig.rtlClass === "rtl"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
