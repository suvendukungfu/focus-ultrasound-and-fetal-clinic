import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, translations, TranslationValue } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: <T = string>(key: string) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang') as Language;
      if (saved === 'en' || saved === 'hi') return saved;
      // Auto-detect browser language
      const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || '';
      return browserLang.startsWith('hi') ? 'hi' : 'en';
    }
    return 'en';
  });

  // Sync state with localStorage whenever it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  // Memoize translation function to avoid unnecessary re-renders of consuming components
  const t = useCallback(<T = string>(key: string): T => {
    const langDict = translations[language];
    
    // 1. Try direct lookup (handles flat keys with dots like 'nav.home')
    if (langDict && key in langDict) {
      return langDict[key] as unknown as T;
    }

    // 2. Try nested traversal (handles objects and arrays)
    const keys = key.split('.');
    let current: TranslationValue | undefined = langDict as unknown as TranslationValue;
    
    let found = true;
    for (const k of keys) {
      if (current && typeof current === 'object' && !Array.isArray(current) && k in current) {
        current = (current as Record<string, TranslationValue>)[k];
      } else {
        found = false;
        break;
      }
    }
    
    if (found) {
      return current as unknown as T;
    }

    // 3. Fallback
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[LanguageContext] Missing translation for key: "${key}" in language: "${language}"`);
    }
    
    // Return key as string to avoid breaking UI. 
    // Components expecting arrays should handle potential string return or we should return [] if we can detect it.
    // Since we can't detect T at runtime, we return the key.
    return key as unknown as T;
  }, [language]);

  // Force body direction for languages that might need RTL (though Hindi is LTR)
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
