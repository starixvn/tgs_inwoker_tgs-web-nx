import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

//localstorage language
const language = localStorage.getItem("i18nextLng");

i18n
  .use(LanguageDetector)
  .use(HttpBackend)
  .use(initReactI18next)
  .init(
    {
      backend: {
        loadPath: `https://assets.nexentgame.com/translations/{{lng}}.json`,
        addPath: `https://assets.nexentgame.com/translations/{{lng}}`,
      },
      load: "currentOnly",
      whitelist: ["en-US", "zh-CN", "zh-TW", "th-TH", "id-ID", "vi-VN"],
      fallbackLng: [language || import.meta.env.VITE_DEFAULT_LANGUAGE],
      interpolation: {
        escapeValue: false,
        formatSeparator: ".",
      },
      react: {
        wait: true,
      },
      debug: false,
    } as InitOptions<unknown>,
    (error, t) => {
      console.log(error);
    },
  );

export default i18n;
