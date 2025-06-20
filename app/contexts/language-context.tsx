"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import en from "../translations/en";
import mk from "../translations/mk";
import sr from "../translations/sr";
// Define supported languages
export type Language = "en" | "mk" | "sr";

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: <T = string>(
    key: string,
    params?: Record<string, any> & { returnObjects?: boolean },
  ) => T;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Define translations object
const translations = { en, mk, sr };

// Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "mk", "sr"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function with support for both flat and nested keys
  const t = <T = string,>(
    key: string,
    params?: Record<string, any> & { returnObjects?: boolean },
  ): T => {
    // First try to find the key as a flat key (e.g., "nav.services")
    if (translations[language] && key in translations[language]) {
      const result = (translations[language] as any)[key];

      // If the result is a string and we have params, perform interpolation
      if (typeof result === "string" && params) {
        return Object.entries(params).reduce(
          (str, [param, value]) =>
            str.replace(new RegExp(`\\{${param}\\}`, "g"), String(value)),
          result,
        ) as unknown as T;
      }
      return result as unknown as T;
    }

    // If not found as a flat key, try as a nested key
    const keys = key.split(".");
    let result: any = translations[language];

    // Traverse the nested object structure
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k];
      } else {
        // If the key doesn't exist, use default value if provided or return the key itself
        if (params?.default) {
          return params.default as unknown as T;
        }
        console.warn(`Translation key not found: ${key}`);
        return key as unknown as T;
      }
    }

    // If the result is a string and we have params, perform interpolation
    if (typeof result === "string" && params) {
      const interpolated = Object.entries(params).reduce(
        (str, [param, value]) =>
          str.replace(new RegExp(`\\{${param}\\}`, "g"), String(value)),
        result,
      );
      return interpolated as unknown as T;
    }

    // If we expect an array but got a string, wrap it in an array
    if (params?.returnObjects && typeof result === "string") {
      return [result] as unknown as T;
    }

    return result as unknown as T;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
