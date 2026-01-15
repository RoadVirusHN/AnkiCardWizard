import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import koTranslations from './ko.json';

const config = {
  resources: {
    en: { translation: enTranslations },
    ko: { translation: koTranslations },
  },
  // lng: useConfigure.getState().language, // set Language in App.tsx
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
};
console.log(config);
i18n.use(initReactI18next).init(config);

export default i18n;
