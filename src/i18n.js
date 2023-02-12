import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n.use(Backend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        backend: { loadPath: 'assets/i18n/{{ns}}/{{lng}}.json' },
        fallbackLng: 'en',
        debug: false,
        ns: ['common', 'login', 'registration', 'admin'],
        detection: {
            order: ['queryString', 'cookie'],
            cache: ['cookie'],
        },
        interpolation: {
            escapeValue: false,
            formatSeparator: ',',
        },
        react: { wait: true },
    });

export default i18n;
