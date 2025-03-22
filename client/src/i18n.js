import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend"; // Lazy loading backend

const API_BASE_URL = "https://multiligual-server.onrender.com";

i18n.use(Backend) // Add backend for lazy loading translations
    .use(LanguageDetector) // Detect browser language
    .use(initReactI18next) // Pass i18n to react-i18next
    .init({
        backend: {
            // Path to the translation files on your server
            loadPath: `${API_BASE_URL}/locales/{{lng}}` // Adjust with your server URL
        },
        fallbackLng: "en", // Default language if no match found
        interpolation: {
            escapeValue: false // React already escapes by default
        }
    });

export default i18n;
