import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };
  return (
    <div className="d-flex align-items-center gap-2">
      <span>{t('language')}:</span>
      <button className={`btn btn-sm ${i18n.language === 'ar' ? 'btn-dark' : 'btn-light'}`} onClick={() => changeLanguage('ar')}>{t('arabic')}</button>
      <button className={`btn btn-sm ${i18n.language === 'en' ? 'btn-dark' : 'btn-light'}`} onClick={() => changeLanguage('en')}>{t('english')}</button>
    </div>
  );
}
