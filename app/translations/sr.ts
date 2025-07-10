import { Translation } from "../types/translation";

const sr: Translation = {
  // Navigation
  nav: {
    home: "Početna",
    services: "Usluge",
    portfolio: "Portfolio",
    contact: "Kontakt",
    bookConsultation: "Zakažite konsultacije",
    startProject: "Započnite projekat",
  },

  // Hero Section
  hero: {
    title: "Stvaramo digitalna iskustva sa svrhom",
    subtitle:
      "Minimalistički dizajn. Maksimalan uticaj. Pravimo veb-sajtove koji pretvaraju posetioce u klijente.",
    // title: "Stvaramo digitalna rešenja koja podstiču rast",
    // subtitle:
    //   "Transformišemo ideje u izuzetna digitalna rešenja koja podstiču rast i donose rezultate.",
    startProject: "Započnite svoj projekat",
    viewWork: "Pogledajte naše projekte",
  },

  // Services Section
  services: {
    pageTitle: "Naše usluge",
    pageDescription:
      "Sveobuhvatna digitalna rešenja prilagođena vašim potrebama",
    development: {
      title: "Web razvoj",
      description:
        "Prilagođene web stranice i web aplikacije izgrađene modernim tehnologijama",
    },
    design: {
      title: "UI/UX dizajn",
      description:
        "Lepi, intuitivni interfejsi koji poboljšavaju korisničko iskustvo",
    },
    mobile: {
      title: "Mobilni razvoj",
      description:
        "Nativne i cross-platform mobilne aplikacije za iOS i Android",
    },
    ai: {
      title: "AI rešenja",
      description:
        "Inteligentna automatizacija i analiza podataka sa najsavremenijom veštačkom inteligencijom",
    },
    poc: {
      title: "Dokaz koncepta",
      description:
        "Brzo prototipiranje za validaciju vaših ideja pre potpunog razvoja",
    },
    "ngo-support": {
      title: "Podrška za nevladine organizacije",
      description: "Popusti na digitalne usluge za neprofitne organizacije",
    },
  },

  // Contact Section
  contact: {
    title: "Spremni da započnete svoj projekat?",
    hub: {
      title: "Kontaktirajte nas",
      subtitle:
        "Imate projekat na umu? Voleli bismo da razgovaramo kako možemo pomoći.",
      letsWorkTogether: "HAJDE DA SARAĐUJEMO",
      cta: {
        buttonText: "Započnite vaš projekat",
      },
      methods: {
        email: {
          title: "Pošaljite e-mail",
          subtitle: "Direktna komunikacija",
          description: "Pišite nam o potrebama i očekivanjima vašeg projekta.",
          action: "Pošaljite e-mail",
          badge: "Odgovor za 24h",
          stats: "Prosečno vreme odgovora: 4 sata",
        },
        call: {
          title: "Zakažite poziv",
          subtitle: "Lična konsultacija",
          description:
            "Zakažite poziv sa našim timom da biste detaljno razgovarali o vašem projektu.",
          action: "Zakažite poziv",
          badge: "Besplatna konsultacija",
          stats: "30 min početni razgovor",
        },
        project: {
          title: "Započnite projekat",
          subtitle: "Formalni zahtev",
          description:
            "Popunite naš formular za projekat da biste dobili detaljan predlog.",
          action: "Započnite sada",
          badge: "Detaljan opis",
          stats: "Ponuda za 2-3 dana",
        },
      },
      info: {
        location: {
          label: "Lokacija kancelarije",
          value: "Skoplje, Makedonija",
          description: "Centralno evropsko vreme (CET)",
        },
        ceoPhone: {
          label: "Direktna linija CEO-a",
          value: "+389 70 123 456",
          description: "Aleksandar, izvršni direktor i suosnivač",
        },
        // ctoPhone: {
        //   label: "Direktna linija CTO-a",
        //   value: "+389 70 456 789",
        //   description: "Stefan, tehnički direktor i suosnivač",
        // },
        hours: {
          label: "Radno vreme",
          value: "Pon-Pet: 9-18h",
          description: "Vikend: Po dogovoru",
        },
        languages: {
          label: "Jezici",
          value: "Engleski, makedonski, srpski",
          // description: "Nemački i holandski takođe dostupni",
        },
      },
      social: {
        title: "Pratite nas",
        linkedin: {
          name: "LinkedIn",
        },
        twitter: {
          name: "Twitter",
        },
        instagram: {
          name: "Instagram",
        },
        facebook: {
          name: "Facebook",
        },
      },
      form: {
        title: "Pošaljite poruku",
        subtitle: "Odgovorićemo vam što je pre moguće.",
      },
      status: {
        connected: "Aktivna veza",
        offline: "Trenutno oflajn",
      },
      contactInfo: {
        title: "Kontakt informacije",
      },
      ctaSection: {
        title: "Spremni da počnete?",
        description:
          "Započnite svoje projektno objašnjenje i dobijte prilagođenu ponudu.",
      },
    },
  },

  // Project Initialization
  project: {
    thankYou: {
      title: "Hvala Vam na poruci!",
      subtitle: "Vaš zahtev je uspešno poslat.",
      whatHappensNext: "Šta sledi dalje?",
      nextSteps: [
        "Pregledaćemo vašu poruku i javićemo vam se u najkraćem mogućem roku.",
        "Naš tim će analizirati vaš zahtev i kontaktirati vas kako bismo razgovarali o sledećim koracima.",
        "U međuvremenu, možete pogledati naše usluge ili nas kontaktirati direktno putem telefona.",
      ],
      actions: {
        returnHome: "Vratite se na početnu stranicu",
        exploreServices: "Istražite naše usluge",
      },
    },
    initialize: {
      title: "Započnite svoj projekat",
      subtitle:
        "Recite nam više o svom projektu i vratićemo vam se sa prilagođenom ponudom",

      // Steps
      steps: {
        step1: "Osnovni podaci",
        step2: "Detalji projekta",
        step3: "Rokovi i budžet",
        step4: "Kontakt podaci",
        step5: "Pregled i slanje",
      },

      // Form Fields
      fields: {
        name: "Naziv projekta",
        description: "Opis projekta",
        type: "Vrsta projekta",
        urgency: "Hitnost projekta",
        industry: "Delatnost/Vrsta poslovanja",
        targetAudience: "Ciljna grupa",
        existingWebsite: "Postojeći veb sajt (ako postoji)",
        goals: "Ciljevi projekta",
        features: "Željene funkcionalnosti",
        timeline: "Rokovi realizacije",
        budget: "Budžet",
        hasContent: "Pripremljenost sadržaja",
        designPreferences: "Preporučeni stil dizajna",
        contactName: "Vaše ime i prezime",
        contactEmail: "Email adresa",
        contactPhone: "Broj telefona",
        company: "Kompanija/Organizacija",
        preferredContact: "Preferirani način kontakta",
        additionalInfo: "Dodatne informacije",
        projectFiles: "Reference i materijali",
      },

      // Placeholders
      placeholders: {
        name: "Unesite naziv projekta",
        description: "Opisite ciljeve i zahteve vašeg projekta...",
        type: "Izaberite tip projekta",
        urgency: "Izaberite vremenski okvir",
        industry: "Izaberite delatnost",
        targetAudience:
          "Opisite ciljnu grupu (npr. mladi profesionalci, vlasnici malih preduzeća, studenti...)",
        existingWebsite: "https://vassajt.com",
        designPreferences:
          "Opisite željeni stil dizajna, boje, primere sajtova koji vam se sviđaju itd.",
        contactName: "Unesite vaše ime i prezime",
        contactEmail: "vas.email@example.com",
        contactPhone: "+381 60 123 4567",
        company: "Naziv vaše kompanije",
        preferredContact: "Kako biste želeli da vas kontaktiramo? (opciono)",
        additionalInfo:
          "Dodatne informacije, posebni zahtevi ili pitanja koja imate?",
        timeline: "Kada treba da bude završen projekat?",
        budget: "Koliki je vaš okvirni budžet?",
        hasContent: "Da li imate pripremljen sadržaj?",
      },

      // Buttons & Actions
      buttons: {
        next: "Sledeći korak",
        previous: "Prethodni korak",
        submit: "Pošaljite upit",
        chooseFiles: "Izaberite fajlove",
        startFresh: "Započnite od nule",
        back: "Nazad",
        continue: "Nastavi",
      },

      // Progress Messages
      progress: {
        step: "Korak {current} od {total}",
        percentage: "{percentage}% Završeno",
      },

      // Labels
      labels: {
        characters: "karaktera",
      },

      // Field descriptions
      descriptions: {
        urgency:
          "Izaberite vremenski okvir koji najbolje odgovara potrebama vašeg projekta",
        industry: "Izaberite industriju u kojoj posluje vaša kompanija",
        goals: "Izaberite sve ciljeve koji se odnose na vaš projekat",
        features: "Izaberite sve funkcije koje biste želeli u svom projektu",
        targetAudience: "Opišite ko će koristiti vaš sajt ili aplikaciju",
        existingWebsite: "Ako imate postojeći sajt, navedite URL adresu",
      },

      // Project Types
      types: {
        websiteRedesign: "Redizajn veb sajta",
        newWebsite: "Novi veb sajt",
        ecommerce: "Online prodavnica",
        webApp: "Web aplikacija",
        mobileApp: "Mobilna aplikacija",
        seo: "SEO optimizacija",
        marketing: "Digitalni marketing",
      },

      // Urgency Levels
      urgencyLevels: {
        notUrgent: "Nije hitno (3+ meseci)",
        standard: "Standardno (1-3 meseca)",
        urgent: "Hitno (2-4 nedelje)",
        asap: "Vrlo hitno (1-2 nedelje)",
      },

      // Timelines
      timelines: {
        urgent: "Hitno (što pre)",
        oneToTwoMonths: "1-2 meseca",
        twoToFourMonths: "2-4 meseca",
        fourToSixMonths: "4-6 meseci",
        sixMonthsPlus: "6+ meseci",
        flexible: "Fleksibilan rok",
      },

      // Budgets
      budgets: {
        under5k: "Ispod 5.000$",
        fiveTo15k: "5.000$ - 10.000$",
        fifteenTo30k: "10.000$ - 20.000$",
        thirtyTo50k: "25.000$ +",
        // fiftyTo100k: "50.000$ - 100.000$",
        // over100k: "Preko 100.000$",
        discuss: "Po dogovoru",
      },

      // Content Readiness
      contentReadiness: {
        ready: "Da, svi sadržaji su spremni",
        partial: "Delimično spremno, treba nam pomoć",
        none: "Ne, potrebna nam je pomoć u pripremi sadržaja",
      },

      // Contact Methods
      contactMethods: {
        email: "Email",
        phone: "Telefon",
        whatsapp: "WhatsApp",
        viber: "Viber",
        zoom: "Zoom",
        other: "Drugo (navedite u dodatnim informacijama)",
      },

      // Form Validation
      validation: {
        required: "Ovo polje je obavezno",
        invalidEmail: "Unesite ispravnu email adresu",
        invalidUrl: "Unesite ispravan URL",
        minLength: "Mora sadržati najmanje {min} znakova",
        maxLength: "Mora sadržati najviše {max} znakova",
      },

      // Success Message
      success: {
        title: "Uspešno poslato!",
        message:
          "Hvala vam što ste nas kontaktirali. Javićemo vam se u najkraćem mogućem roku.",
        returnHome: "Povratak na početnu stranicu",
      },

      // Error Message
      error: {
        title: "Došlo je do greške",
        message:
          "Nažalost, došlo je do greške prilikom slanja vašeg upita. Molimo pokušajte ponovo kasnije.",
        tryAgain: "Pokušajte ponovo",
      },

      // File Upload
      fileUpload: {
        title: "Reference i materijali",
        description:
          "Prenesite reference, logoe, skice ili bilo koje druge materijale koji će nam pomoći da bolje razumemo vaše potrebe",
        supportedFormats:
          "Maks. 10MB po fajlu. Podržani formati: JPG, PNG, GIF, PDF, DOC, TXT",
      },

      // Confirmation Dialog
      confirm: {
        title: "Da li ste sigurni?",
        message:
          "Imate nesačuvane promene. Da li ste sigurni da želite da napustite stranicu?",
        yes: "Da, napusti",
        no: "Ne, ostani",
      },

      // Accessibility
      a11y: {
        closeButton: "Zatvori",
        menuButton: "Meni",
        nextStep: "Sledeći korak",
        previousStep: "Prethodni korak",
      },
    },
  },

  // About Page
  about: {
    title: "O nama",
    subtitle: "Saznajte više o našoj kompaniji, misiji i timu koji stoji iza našeg uspeha.",
    ourMission: {
      title: "Naša misija",
      content: "Posvećeni smo pružanju izuzetnih digitalnih rešenja koja pomažu kompanijama da uspeju u digitalnom svetu. Naša misija je da kombinujemo kreativnost sa najsavremenijim tehnologijama kako bismo stvorili značajna iskustva koja donose rezultate."
    },
    ourTeam: {
      title: "Naš tim",
      content: "Naš tim čine strastveni profesionalci koji su stručnjaci u svojim oblastima, a koji sarađuju kako bi ostvarili vašu viziju."
    },
    getInTouch: {
      title: "Spremni ste da započnete svoj projekat?",
      button: "Kontaktirajte nas"
    }
  },

  // Contact Extra
  contactExtra: {
    hub: {
      methods: {
        email: {
          title: "Pošaljite email",
          subtitle: "Direktno u naš inboks",
          description:
            "Najbolje za detaljne upite i deljenje dokumenata. Obično odgovaramo u roku od jednog radnog dana.",
          action: "Pošalji email",
          badge: "Preporučeno",
          stats: "Prosečan odgovor: 24h",
        },
        call: {
          title: "Zakažite poziv",
          subtitle: "Rezervišite konsultacije",
          description:
            "Savršeno za diskusiju o detaljima projekta, postavljanje pitanja i upoznavanje našeg tima. Rezervišite vreme koje vam odgovara.",
          action: "Zakaži poziv",
          badge: "Najpopularnije",
          stats: "Dostupni termini od 30 minuta",
        },
        project: {
          title: "Započnite projekat",
          subtitle: "Koristite naš detaljan formular",
          description:
            "Naš planer projekata vam pomaže da definišete svoje potrebe, osiguravajući da imamo sve detalje za pružanje tačne ponude i vremenskog okvira.",
          action: "Započni projekat",
          badge: "Najbolje za ponude",
          stats: "Dobijte detaljnu ponudu",
        },
      },
      info: {
        location: {
          label: "Lokacija",
          value: "Skoplje, Makedonija",
        },
        availability: {
          label: "Dostupnost",
          value: "Pon-Pet, 9-17h CET",
        },
        social: {
          label: "Pratite nas",
        },
      },
    },
  },
};

export default sr;
