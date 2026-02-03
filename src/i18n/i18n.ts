import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/common.json";
import ru from "./locales/ru/common.json";
import lt from "./locales/lt/common.json";

const STORAGE_KEY = "app_lang";
const savedLng = localStorage.getItem(STORAGE_KEY);
const defaultLng = "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      ru: { common: ru },
      lt: { common: lt }
    },
    lng: savedLng || defaultLng,
    fallbackLng: defaultLng,
    defaultNS: "common",
    interpolation: { escapeValue: false }
  });

export { STORAGE_KEY };
export default i18n;
