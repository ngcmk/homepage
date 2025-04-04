"use client";

import { useState } from "react";
import { useLanguage, type Language } from "../contexts/language-context";
import { Check, ChevronDown, Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "mk", name: "Macedonian" },
    { code: "sr", name: "Serbian" },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-neutral-600 hover:text-neutral-900 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={16} />
        <span className="text-sm uppercase tracking-wide font-medium">
          {language.toUpperCase()}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as Language)}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-neutral-100"
            >
              <span>{lang.name}</span>
              {language === lang.code && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
