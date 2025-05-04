import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import tr from "./locales/tr.json";
import en from "./locales/en.json";

i18n
  .use(LanguageDetector) // tarayıcı dilini algıları
  .use(initReactI18next) // react i18next ile entegre et
  .init({
    fallbackLng: "tr",
    resources: {
      tr: {
        translation: tr,
      },
      en: {
        translation: en,
      },
    },
    interpolation: {
      escapeValue: false, // react'ta kullanılacak
    },
  });

export default i18n;
