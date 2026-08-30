import React, {
    createContext,
    useContext,
    useState,
} from "react";

import translations from "../constants/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState("mr");

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                changeLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}

export function useTranslation() {

    const { language } = useLanguage();

    const t = (key) => {
        return (
            translations[language]?.[key] ||
            translations.en?.[key] ||
            key
        );
    };

    return {
        t,
        language,
    };
}