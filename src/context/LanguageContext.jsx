import { createContext, useState } from "react";
export const LanguageContext = createContext();
export function LanguageProvider({ children }) {
  const [en, setEn] = useState(true);
  const toggleLanguage = () => {
    setEn(!en);
  };
  return (
    <LanguageContext.Provider value={{ en, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
