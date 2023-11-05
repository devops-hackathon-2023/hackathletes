import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { localStorageAvailable } from '@/utils/local-storage-available';
import { allLangs, defaultLang } from './configLangs';

export const useLocales = () => {
  const { i18n, t } = useTranslation();

  const storageAvailable = localStorageAvailable();

  const savedLang = storageAvailable ? localStorage.getItem('i18nextLng') : '';

  const currentLang = allLangs.find((lang) => lang.value === savedLang) || defaultLang;

  const onChangeLang = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  return { currentLang, t, onChangeLang };
};
