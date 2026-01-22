import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { FALLBACK_LANGUAGES, NAMESPACES } from '@/i18n/config'


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: FALLBACK_LANGUAGES,
        ns: [...NAMESPACES],
        debug: import.meta.env.DEV,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator'],
            lookupQuerystring: 'lang',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18next',
            caches: ['localStorage', 'cookie'],
            cookieMinutes: 10080,
            cookieOptions: {
                path: '/',
                sameSite: 'lax',
                secure: import.meta.env.PROD,
            }
        }
    })


export default i18n