"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

// Define supported languages
export type Language = "en" | "mk" | "sr";

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Translations object
const translations = {
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.clients": "Clients",
    "nav.contact": "Contact",
    "nav.home": "Home",
    "nav.startProject": "Start Project",

    // Hero
    "hero.title": "We craft digital experiences with purpose",
    "hero.subtitle":
      "Minimalist design. Maximum impact. We build websites that convert visitors into customers.",
    "hero.startProject": "Start a project",
    "hero.viewWork": "View our work",

    // Services
    "services.title": "Services",
    "services.subtitle":
      "We specialize in creating digital experiences that are both modern and functional, focusing off what matters most to your business.",
    "services.design.title": "Design",
    "services.design.description":
      "Intuitive interfaces that engage users and drive conversions through thoughtful design and seamless interactions.",
    "services.development.title": "Development",
    "services.development.description":
      "Clean, efficient code that brings designs to life with performance and accessibility at the forefront.",
    "services.mobile.title": "Mobile Apps",
    "services.mobile.description":
      "Native and cross-platform applications that deliver consistent experiences across all devices.",

    // Portfolio
    "portfolio.title": "Selected Work",
    "portfolio.subtitle":
      "Explore our portfolio of projects that showcase our approach to solving complex design and development challenges.",
    "portfolio.project1.title": "Ecommerce Redesign",
    "portfolio.project1.category": "Design",
    "portfolio.project1.description":
      "A complete overhaul of an e-commerce platform focusing on conversion optimization",
    "portfolio.project2.title": "Analytics Dashboard",
    "portfolio.project2.category": "Web Application",
    "portfolio.project2.description":
      "Real-time data visualization dashboard for marketing professionals",
    "portfolio.project3.title": "Fitness App",
    "portfolio.project3.category": "Mobile Development",
    "portfolio.project3.description":
      "Cross-platform mobile application for fitness tracking and nutrition planning",

    // Testimonials
    "testimonials.title": "Client Stories",
    "testimonials.subtitle":
      "Don`@apos`t take our word for it. Here`@apos`s what our clients have to say about working with us.",
    "testimonials.client1.name": "Alex Johnson",
    "testimonials.client1.role": "CEO, TechVision",
    "testimonials.client1.quote":
      "Minima transformed our digital presence completely. Their attention to detail and focus on user experience resulted in a 40% increase in conversions.",
    "testimonials.client2.name": "Sarah Williams",
    "testimonials.client2.role": "Founder, Innovate",
    "testimonials.client2.quote":
      "Working with Minima was refreshingly straightforward. They delivered exactly what we needed, on time and on budget, with exceptional quality.",

    // Contact
    "contact.title": "Ready to start your project?",
    "contact.subtitle":
      "Fill out the form below and we`@apos`ll get back to you within 24 hours to discuss your project in detail.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",

    // Footer
    "footer.description":
      "We create digital experiences that are both modern and functional, focusing on what matters most to your business.",
    "footer.services": "Services",
    "footer.uiux": "Design",
    "footer.webdev": "Web Development",
    "footer.mobileapps": "Mobile Apps",
    "footer.branding": "Branding",
    "footer.company": "Company",
    "footer.about": "About",
    "footer.careers": "Careers",
    "footer.blog": "Blog",
    "footer.contact": "Contact",
    "footer.copyright": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Project Initialization
    "project.title": "Start Your Project",
    "project.subtitle":
      "Tell us about your project and we`@apos`ll get back to you within 24 hours.",
    "project.step1": "Project Details",
    "project.step2": "Project Type",
    "project.step3": "Confirmation",
    "project.name": "Project Name",
    "project.name.placeholder": "e.g. Company Website Redesign",
    "project.description": "Project Description",
    "project.description.placeholder":
      "Tell us about your project goals and requirements...",
    "project.type": "Project Type",
    "project.type.redesign": "Website Redesign",
    "project.type.newsite": "New Website",
    "project.type.ecommerce": "E-commerce",
    "project.type.webapp": "Web Application",
    "project.type.mobileapp": "Mobile App",
    "project.type.branding": "Branding",
    "project.summary": "Project Summary",
    "project.summary.name": "Project Name",
    "project.summary.type": "Project Type",
    "project.summary.description": "Project Description",
    "project.notSpecified": "Not specified",
    "project.terms":
      "By submitting this form, you agree to our terms and conditions. We`@apos`ll review your project details and get back to you within 24 hours.",
    "project.back": "Back",
    "project.continue": "Continue",
    "project.submit": "Submit Project",
  },
  mk: {
    // Навигација
    "nav.services": "Услуги",
    "nav.work": "Работа",
    "nav.clients": "Клиенти",
    "nav.contact": "Контакт",
    "nav.home": "Дома",
    "nav.startProject": "Започни проект",

    // Херој
    "hero.title": "Создаваме дигитални искуства со цел",
    "hero.subtitle":
      "Минималистички дизајн. Максимален ефект. Создаваме веб-страници што ги претвораат посетителите во клиенти.",
    "hero.startProject": "Започни проект",
    "hero.viewWork": "Погледни ја нашата работа",

    // Услуги
    "services.title": "Услуги",
    "services.subtitle":
      "Специјализирани сме во создавање дигитални искуства што се модерни и функционални, фокусирани на најважното за вашиот бизнис.",
    "services.design.title": "Дизајн",
    "services.design.description":
      "Интуитивни интерфејси што ги ангажираат корисниците и ги зголемуваат конверзиите преку внимателен дизајн и беспрекорни интеракции.",
    "services.development.title": "Развој",
    "services.development.description":
      "Чист, ефикасен код што ги оживува дизајните, со акцент на перформансите и пристапноста.",
    "services.mobile.title": "Мобилни Апликации",
    "services.mobile.description":
      "Нативни и крос-платформски апликации што нудат конзистентно искуство на сите уреди.",

    // Портфолио
    "portfolio.title": "Избрани Проекти",
    "portfolio.subtitle":
      "Разгледајте го нашето портфолио со проекти што го прикажуваат нашиот пристап кон решавање на комплексни дизајн и развојни предизвици.",
    "portfolio.project1.title": "Редизајн на е-продавница",
    "portfolio.project1.category": "Дизајн",
    "portfolio.project1.description":
      "Комплетна трансформација на платформа за е-трговија со фокус на оптимизација на конверзиите.",
    "portfolio.project2.title": "Аналитички Дашборд",
    "portfolio.project2.category": "Веб Апликација",
    "portfolio.project2.description":
      "Дашборд за визуелизација на податоци во реално време за маркетинг професионалци.",
    "portfolio.project3.title": "Фитнес Апликација",
    "portfolio.project3.category": "Мобилен Развој",
    "portfolio.project3.description":
      "Крос-платформска мобилна апликација за следење на фитнес активности и планирање на исхрана.",

    // Тестимонијали
    "testimonials.title": "Искуства на Клиенти",
    "testimonials.subtitle":
      "Не ни верувајте само нам. Еве што велат нашите клиенти за соработката со нас.",
    "testimonials.client1.name": "Алекс Џонсон",
    "testimonials.client1.role": "CEO, TechVision",
    "testimonials.client1.quote":
      "Minima целосно ја трансформираше нашата дигитална присутност. Нивното внимание на детали и фокусот на корисничкото искуство резултираа со зголемување на конверзиите за 40%.",
    "testimonials.client2.name": "Сара Вилијамс",
    "testimonials.client2.role": "Основач, Innovate",
    "testimonials.client2.quote":
      "Соработката со Minima беше освежувачки едноставна. Доставија точно тоа што ни требаше, навреме и во рамките на буџетот, со исклучителен квалитет.",

    // Контакт
    "contact.title": "Подготвени сте да започнете проект?",
    "contact.subtitle":
      "Пополнете го формуларот подолу и ќе ви одговориме во рок од 24 часа за да го дискутираме вашиот проект во детали.",
    "contact.name": "Име",
    "contact.email": "Е-пошта",
    "contact.subject": "Тема",
    "contact.message": "Порака",
    "contact.send": "Испрати порака",

    // Подножје
    "footer.description":
      "Создаваме дигитални искуства што се и модерни и функционални, фокусирани на најважното за вашиот бизнис.",
    "footer.services": "Услуги",
    "footer.uiux": "Дизајн",
    "footer.webdev": "Веб Развој",
    "footer.mobileapps": "Мобилни Апликации",
    "footer.branding": "Брендирање",
    "footer.company": "Компанија",
    "footer.about": "За Нас",
    "footer.careers": "Кариера",
    "footer.blog": "Блог",
    "footer.contact": "Контакт",
    "footer.copyright": "Сите права се задржани.",
    "footer.privacy": "Политика за приватност",
    "footer.terms": "Услови за користење",

    // Започнување проект
    "project.title": "Започни го твојот проект",
    "project.subtitle":
      "Кажете ни повеќе за вашиот проект и ќе ви се јавиме во рок од 24 часа.",
    "project.step1": "Детали за проектот",
    "project.step2": "Тип на проект",
    "project.step3": "Потврда",
    "project.name": "Име на проектот",
    "project.name.placeholder": "на пр. Редизајн на веб-страница на компанија",
    "project.description": "Опис на проектот",
    "project.description.placeholder":
      "Кажете ни за целите и барањата на вашиот проект...",
    "project.type": "Тип на проект",
    "project.type.redesign": "Редизајн на веб-страница",
    "project.type.newsite": "Нова веб-страница",
    "project.type.ecommerce": "Е-трговија",
    "project.type.webapp": "Веб Апликација",
    "project.type.mobileapp": "Мобилна Апликација",
    "project.type.branding": "Брендирање",
    "project.summary": "Резиме на проектот",
    "project.summary.name": "Име на проектот",
    "project.summary.type": "Тип на проект",
    "project.summary.description": "Опис на проектот",
    "project.notSpecified": "Не е наведено",
    "project.terms":
      "Со поднесување на овој формулар, се согласувате со нашите услови и правила. Ќе ги прегледаме вашите детали и ќе ви се јавиме во рок од 24 часа.",
    "project.back": "Назад",
    "project.continue": "Продолжи",
    "project.submit": "Поднеси проект",
  },
  sr: {
    // Navigacija
    "nav.services": "Usluge",
    "nav.work": "Rad",
    "nav.clients": "Klijenti",
    "nav.contact": "Kontakt",
    "nav.home": "Početna",
    "nav.startProject": "Započni projekat",

    // Heroj
    "hero.title": "Stvaramo digitalna iskustva sa svrhom",
    "hero.subtitle":
      "Minimalistički dizajn. Maksimalan uticaj. Pravimo veb-sajtove koji pretvaraju posetioce u klijente.",
    "hero.startProject": "Započni projekat",
    "hero.viewWork": "Pogledaj naš rad",

    // Usluge
    "services.title": "Usluge",
    "services.subtitle":
      "Specijalizovani smo za kreiranje digitalnih iskustava koja su i lepa i funkcionalna, fokusirajući se na ono što je najvažnije za vaš posao.",
    "services.design.title": "Dizajn",
    "services.design.description":
      "Intuitivni interfejsi koji angažuju korisnike i povećavaju konverzije kroz pažljiv dizajn i besprekornu interakciju.",
    "services.development.title": "Razvoj",
    "services.development.description":
      "Čist, efikasan kod koji oživljava dizajn, sa naglaskom na performanse i pristupačnost.",
    "services.mobile.title": "Mobilne Aplikacije",
    "services.mobile.description":
      "Native i cross-platform aplikacije koje pružaju dosledno iskustvo na svim uređajima.",

    // Portfolio
    "portfolio.title": "Izabrani Projekti",
    "portfolio.subtitle":
      "Istražite naš portfolio projekata koji prikazuju naš pristup rešavanju složenih dizajnerskih i razvojnih izazova.",
    "portfolio.project1.title": "Redizajn e-trgovine",
    "portfolio.project1.category": "Dizajn",
    "portfolio.project1.description":
      "Potpuna transformacija platforme za e-trgovinu sa fokusom na optimizaciju konverzija.",
    "portfolio.project2.title": "Analitička Kontrolna Tabla",
    "portfolio.project2.category": "Veb Aplikacija",
    "portfolio.project2.description":
      "Kontrolna tabla za vizualizaciju podataka u realnom vremenu za marketinške profesionalce.",
    "portfolio.project3.title": "Fitnes Aplikacija",
    "portfolio.project3.category": "Mobilni Razvoj",
    "portfolio.project3.description":
      "Cross-platform mobilna aplikacija za praćenje fitnes aktivnosti i planiranje ishrane.",

    // Klijentska iskustva
    "testimonials.title": "Priče Klijenata",
    "testimonials.subtitle":
      "Ne verujte samo nama. Evo šta naši klijenti kažu o saradnji s nama.",
    "testimonials.client1.name": "Aleks Džonson",
    "testimonials.client1.role": "CEO, TechVision",
    "testimonials.client1.quote":
      "Minima je potpuno transformisala naše digitalno prisustvo. Njihova pažnja na detalje i fokus na korisničko iskustvo rezultirali su povećanjem konverzija za 40%.",
    "testimonials.client2.name": "Sara Vilijams",
    "testimonials.client2.role": "Osnivač, Innovate",
    "testimonials.client2.quote":
      "Saradnja sa Minima timom bila je osvežavajuće jednostavna. Isporučili su tačno ono što nam je bilo potrebno, na vreme i u okviru budžeta, sa izuzetnim kvalitetom.",

    // Kontakt
    "contact.title": "Spremni ste da započnete projekat?",
    "contact.subtitle":
      "Popunite formular ispod i kontaktiraćemo vas u roku od 24 sata kako bismo detaljno razgovarali o vašem projektu.",
    "contact.name": "Ime",
    "contact.email": "E-mail",
    "contact.subject": "Tema",
    "contact.message": "Poruka",
    "contact.send": "Pošalji poruku",

    // Footer
    "footer.description":
      "Kreiramo digitalna iskustva koja su istovremeno lepa i funkcionalna, fokusirajući se na ono što je najvažnije za vaš biznis.",
    "footer.services": "Usluge",
    "footer.uiux": "Dizajn",
    "footer.webdev": "Veb Razvoj",
    "footer.mobileapps": "Mobilne Aplikacije",
    "footer.branding": "Brendiranje",
    "footer.company": "Kompanija",
    "footer.about": "O nama",
    "footer.careers": "Karijera",
    "footer.blog": "Blog",
    "footer.contact": "Kontakt",
    "footer.copyright": "Sva prava zadržana.",
    "footer.privacy": "Politika privatnosti",
    "footer.terms": "Uslovi korišćenja",

    // Pokretanje projekta
    "project.title": "Započnite svoj projekat",
    "project.subtitle":
      "Recite nam više o svom projektu i javićemo vam se u roku od 24 sata.",
    "project.step1": "Detalji projekta",
    "project.step2": "Vrsta projekta",
    "project.step3": "Potvrda",
    "project.name": "Naziv projekta",
    "project.name.placeholder": "npr. Redizajn sajta kompanije",
    "project.description": "Opis projekta",
    "project.description.placeholder":
      "Recite nam o ciljevima i zahtevima vašeg projekta...",
    "project.type": "Vrsta projekta",
    "project.type.redesign": "Redizajn veb-sajta",
    "project.type.newsite": "Novi veb-sajt",
    "project.type.ecommerce": "E-trgovina",
    "project.type.webapp": "Veb Aplikacija",
    "project.type.mobileapp": "Mobilna Aplikacija",
    "project.type.branding": "Brendiranje",
    "project.summary": "Rezime projekta",
    "project.summary.name": "Naziv projekta",
    "project.summary.type": "Vrsta projekta",
    "project.summary.description": "Opis projekta",
    "project.notSpecified": "Nije navedeno",
    "project.terms":
      "Slanjem ovog formulara, slažete se s našim uslovima i pravilima. Pregledaćemo detalje vašeg projekta i kontaktirati vas u roku od 24 sata.",
    "project.back": "Nazad",
    "project.continue": "Nastavi",
    "project.submit": "Pošalji projekat",
  },
};

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

  // Translation function
  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)[Language]] ||
      key
    );
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
