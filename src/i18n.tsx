import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const supportedLanguages = ["uz", "kril", "ru", "en"];

const defaultLanguage = "uz";

const storedLanguage = localStorage.getItem("i18nextLng");

if (!storedLanguage || !supportedLanguages.includes(storedLanguage)) {
  localStorage.setItem("i18nextLng", defaultLanguage);
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  })
  .catch((error) => {
    console.error("i18n initialization failed:", error);
  });

export default i18n;
