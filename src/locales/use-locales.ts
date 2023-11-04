import { useTranslation } from 'react-i18next';
import { allLangs, defaultLang } from './config-langs';
import { useCallback } from 'react';
import { localStorageAvailable } from '@/utils/local-storage-available';

export function useLocales() {
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
}
