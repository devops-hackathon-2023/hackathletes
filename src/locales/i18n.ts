import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { localStorageAvailable } from '@/utils/local-storage-available';
import translationEn from './langs/en.json';
import translationCs from './langs/cs.json';
import { defaultLang } from './configLangs';

let lng = defaultLang.value;

const storageAvailable = localStorageAvailable();

if (storageAvailable) {
  lng = localStorage.getItem('i18nextLng') || defaultLang.value;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: translationEn },
      cs: { translations: translationCs },
    },
    lng,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    react: { useSuspense: false },
    fallbackLng: lng,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
