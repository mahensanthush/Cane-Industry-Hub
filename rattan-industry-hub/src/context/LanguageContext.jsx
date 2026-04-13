
import React, { createContext, useState, useContext } from 'react';


export const translations = {
  si: {
    home: 'මුල් පිටුව',
    about: 'අප ගැන',
    shop: 'වෙළඳසැල',
    suppliers: 'සැපයුම්කරුවන්',
    admin: 'පාලක',
    cart: 'කරත්තය',
    
  },
  en: {
    home: 'Home',
    about: 'About',
    shop: 'Shop',
    suppliers: 'Suppliers',
    admin: 'Admin',
    cart: 'Cart',
    
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  
  const [lang, setLang] = useState('si');

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === 'si' ? 'en' : 'si'));
  };

  
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {
  return useContext(LanguageContext);
}