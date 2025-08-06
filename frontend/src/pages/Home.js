import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, i18n } = useTranslation();
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center">
        <span style={{ fontSize: '3rem' }}>🔧</span>
        <h1 className="mt-3 mb-2">{t('welcome')}</h1>
        <p className="lead">{i18n.language === 'ar' ? 'منصة خدماتك لربط العملاء بمزودي الخدمات باحترافية وسهولة.' : 'Khadamatak platform connects customers with service providers professionally and easily.'}</p>
      </div>
    </div>
  );
}
