import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "login": "Login",
      "register": "Register",
      // ...add more keys as needed
    }
  },
  ar: {
    translation: {
      "welcome": "مرحبا",
      "login": "تسجيل الدخول",
      "register": "تسجيل",
      // ...add more keys as needed
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language Arabic
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
