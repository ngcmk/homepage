import ThankYou from "../thank-you/page";
import { Translation } from "../types/translation";

const en: Translation = {
  nav: {
    services: "Services",
    work: "Work",
    clients: "Clients",
    contact: "Contact",
    home: "Home",
    startProject: "Start Project",
    about: "About Us",
    blog: "Blog",
  },

  hero: {
    title: "We craft digital experiences with purpose",
    subtitle:
      "Minimalist design. Maximum impact. We build websites that convert visitors into customers.",
    startProject: "Start Your Project",
    viewWork: "View Our Work",
  },

  services: {
    pageTitle: "Our Services",
    pageDescription: "Comprehensive digital solutions tailored to your needs",
    development: {
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies",
    },
    design: {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that enhance user experience",
    },
    mobile: {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
    },
    ai: {
      title: "AI Solutions",
      description: "Intelligent automation and data analysis using cutting-edge AI",
    },
    poc: {
      title: "Proof of Concept",
      description: "Rapid prototyping to validate your ideas before full development",
    },
    "ngo-support": {
      title: "NGO Support",
      description: "Discounted digital services for non-profit organizations",
    },
    categories: {
      all: "All Services",
      technical: "Technical",
      creative: "Creative",
      innovation: "Innovation",
      "social-impact": "Social Impact",
    },
    features: {
      development: [
        "Custom web applications",
        "E-commerce platforms",
        "API development",
        "Performance optimization",
      ],
      design: [
        "UI/UX design",
        "Brand identity",
        "Responsive layouts",
        "User research",
      ],
      mobile: [
        "iOS & Android apps",
        "Cross-platform development",
        "App store optimization",
        "Push notifications",
      ],
      ai: [
        "AI model integration",
        "Chatbot development",
        "Data analysis",
        "Machine learning",
      ],
      poc: [
        "Rapid prototyping",
        "MVP development",
        "Market validation",
        "Technical feasibility",
      ],
      ngo: [
        "Discounted rates",
        "Full-service support",
        "Long-term partnerships",
        "Impact measurement",
      ],
    },
    actions: {
      quickStart: "Quick Start",
      allServices: "All Services",
      custom: "Custom Solution",
      startCustomProject: "Start Custom Project",
      scheduleConsultation: "Schedule Consultation",
    },
    custom: {
      title: "Need a Custom Solution?",
      description: "Can't find exactly what you're looking for? Let's discuss your unique requirements and create a tailored solution for your business.",
    },
    noResults: {
      title: "No services found",
      description: "Try adjusting your search terms or filters",
      clearButton: "Clear Filters",
    },
    pricing: {
      title: "Service Pricing",
      duration: "Duration",
      startingPrice: "Starting Price",
      note: "Note",
      notedenari: "Consistent pricing in denari, dinars and dollars",
      notedinar: "Consistent pricing in denari, dinars and dollars",
      notedollar: "Consistent pricing in denari, dinars and dollars",
      currency: {
        denari: "denari",
        dinar: "dinars",
        dollar: "dollars",
      },
      services: {
        webdev: {
          title: "Web Development",
          duration: "4–8 weeks",
          denari: "from 50,000 den",
          dinar: "from 93,750 din",
          dollar: "from $893",
          note: "Landing pages from 30,000 den / 56,250 din / $535",
        },
        design: {
          title: "UI/UX Design",
          duration: "2–4 weeks",
          denari: "from 25,000 den",
          dinar: "from 46,875 din",
          dollar: "from $446",
          note: "For larger projects: 30,000–40,000 den / 56,250–75,000 din / $535–714",
        },
        mobile: {
          title: "Mobile Development",
          duration: "8–16 weeks",
          denari: "from 350,000 den",
          dinar: "from 656,250 din",
          dollar: "from $6,250",
          note: "Simple MVP: from 150,000 den / 281,250 din / $2,678",
        },
        ai: {
          title: "AI Solutions",
          duration: "6–12 weeks",
          denari: "from 350,000 den",
          dinar: "from 656,250 din",
          dollar: "from $6,250",
          note: "Integrations with ready-made AI tools: lower price; Custom models: 400,000–600,000 den / 750,000–1,125,000 din / $7,143–10,714",
        },
        poc: {
          title: "Proof of Concept / MVP",
          duration: "2–4 weeks",
          denari: "from 50,000 den",
          dinar: "from 93,750 din",
          dollar: "from $893",
          note: "Rapid idea validation",
        },
        ngo: {
          title: "NGO Support",
          duration: "As needed",
          denari: "Free / Discount",
          dinar: "Free / Discount",
          dollar: "Free / Discount",
          note: "Long-term partnerships",
        },
      },
    },
  },

  contact: {
    title: "Ready to start your project?",
    hub: {
      title: "Get in Touch",
      subtitle: "Have a project in mind? We'd love to discuss how we can help.",
      letsWorkTogether: "LET'S WORK TOGETHER",
      cta: {
        buttonText: "Start Your Project",
      },
      methods: {
        email: {
          title: "Send an Email",
          subtitle: "Direct Communication",
          description: "Write to us about your project needs and expectations.",
          action: "Email Us",
          badge: "24h Response",
          stats: "Avg. response time: 4 hours",
        },
        call: {
          title: "Book a Call",
          subtitle: "Personal Consultation",
          description:
            "Schedule a call with our team to discuss your project in detail.",
          action: "Schedule Call",
          badge: "Free Consultation",
          stats: "30 min initial discussion",
        },
        project: {
          title: "Start a Project",
          subtitle: "Formal Request",
          description:
            "Fill out our project brief form to get a detailed proposal.",
          action: "Start Now",
          badge: "Detailed Brief",
          stats: "Quote within 2-3 days",
        },
      },
      info: {
        location: {
          label: "Office Location",
          value: "Skopje, Macedonia",
          description: "Central European Time (CET)",
        },
        ceoPhone: {
          label: "Direct line to the Chief Executive Officer",
          value: "+389 78 209 046",
          description: "Aleksandar, CEO & Co-founder",
        },
        ctoPhone: {
          label: "Direct line to the Chief Technology Officer",
          value: "+389 70 456 789",
          description: "Dimitar, CTO & Co-founder",
        },
        hours: {
          label: "Business Hours",
          value: "Mon-Fri: 9AM - 6PM CET",
          description: "Weekend: By appointment",
        },
        languages: {
          label: "Languages",
          value: "English, Macedonian, Serbian",
        },
      },
      social: {
        title: "Follow Us",
        linkedin: { name: "LinkedIn" },
        twitter: { name: "Twitter" },
        instagram: { name: "Instagram" },
        facebook: { name: "Facebook" },
      },
      form: {
        title: "Send a Message",
        subtitle: "We'll get back to you as soon as possible.",
      },
      status: {
        connected: "Live connection",
        offline: "Currently offline",
      },
      contactInfo: {
        title: "Contact Information",
      },
      ctaSection: {
        title: "Ready to Start?",
        description: "Initiate your project brief and get a custom proposal.",
        buttonText: "Start Your Project",
      },
    },
    form: {
      title: "Send us a Message",
      subtitle: "We'll get back to you as soon as possible",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your name",
      emailLabel: "Email Address",
      emailPlaceholder: "name@example.com",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+1 (123) 456-7890",
      phoneDescription: "Optional, but helpful for quick follow-ups",
      companyLabel: "Company",
      companyPlaceholder: "Your organization",
      companyDescription: "Optional company or organization name",
      subjectLabel: "How can we help?",
      subjectPlaceholder: "Select a topic",
      subjectDescription: "Choose the topic that best fits your inquiry",
      budgetLabel: "Project Budget",
      budgetPlaceholder: "Select your budget range",
      budgetDescription: "Helps us provide appropriate solutions",
      messageLabel: "Your Message",
      messagePlaceholder: "Please describe what you're looking for...",
      messageDescription: "Share as much detail as you'd like",
      submit: "Send Message",
      submitting: "Sending...",
      sending: "Sending...",
      success: "Your message has been sent!",
      submitButton: "Send Message",
      characters: "characters",
      systemStatus: "System Status",
      connectionWarning:
        "We're having trouble connecting to our server. Your message will still be saved locally until connection is restored.",
      validation: {
        minLength: "Message is too short",
      },
      contactTypes: {
        general: "General Inquiry",
        business: "Business Opportunity",
        sales: "Sales Question",
        support: "Technical Support",
        other: "Other",
      },
      budgets: {
        under5k: "Under $5,000",
        fiveToTenK: "$5,000 - $10,000",
        tenToTwentyFiveK: "$10,000 - $20,000",
        twentyFiveToFiftyK: "$25,000 +",
        letsDiscuss: "Let's discuss",
      },
      errors: {
        submissionError:
          "There was a problem sending your message. Please try again.",
        nameRequired: "Please provide your name",
        emailRequired: "Please provide a valid email",
        emailFormat: "Please enter a valid email address",
        messageRequired: "Please include a message",
        subjectRequired: "Please select a topic",
      },
    },
  },

  // Project Initialization
  project: {
    thankYou: {
      title: "Thank you for your message!",
      subtitle: "Your request has been successfully sent.",
      whatHappensNext: "What happens next?",
      nextSteps: [
        "We will review your message and get back to you as soon as possible.",
        "Our team will analyze your request and contact you to discuss the next steps.",
        "In the meantime, you can explore our services or contact us directly by phone.",
      ],
      actions: {
        returnHome: "Return to home page",
        exploreServices: "Explore our services",
      },
    },
    initialize: {
      title: "Start your project",
      subtitle:
        "Tell us more about your project and we'll get back to you with a customized quote",

      // Steps
      steps: {
        step1: "Basic information",
        step2: "Project details",
        step3: "Timeline and budget",
        step4: "Contact information",
        step5: "Review and send",
      },

      // Form Fields
      fields: {
        name: "Project name",
        description: "Project description",
        type: "Project type",
        urgency: "Project urgency",
        industry: "Industry/Business type",
        targetAudience: "Target audience",
        existingWebsite: "Existing website (if any)",
        goals: "Project goals",
        features: "Desired features",
        timeline: "Project timeline",
        budget: "Budget",
        hasContent: "Content readiness",
        designPreferences: "Preferred design style",
        contactName: "Your name",
        contactEmail: "Email address",
        contactPhone: "Phone number",
        company: "Company/Organization",
        preferredContact: "Preferred contact method",
        additionalInfo: "Additional information",
        projectFiles: "References and materials",
      },

      // Placeholders
      placeholders: {
        name: "Enter project name",
        description: "Describe the goals and requirements of your project...",
        type: "Select project type",
        urgency: "Select timeframe",
        industry: "Select industry",
        targetAudience:
          "Describe your target audience (e.g., young professionals, small business owners, students...)",
        existingWebsite: "https://yoursite.com",
        designPreferences:
          "Describe desired design style, colors, website examples you like, etc.",
        contactName: "Enter your full name",
        contactEmail: "your.email@example.com",
        contactPhone: "+1 (555) 123-4567",
        company: "Your company name",
        preferredContact: "How would you like us to contact you? (optional)",
        additionalInfo:
          "Additional information, special requests, or questions you have?",
        timeline: "When does the project need to be completed?",
        budget: "What is your approximate budget?",
        hasContent: "Do you have content prepared?",
      },

      // Buttons & Actions
      buttons: {
        next: "Next step",
        previous: "Previous step",
        submit: "Submit request",
        chooseFiles: "Choose files",
        startFresh: "Start over",
        back: "Back",
        continue: "Continue",
      },

      // Progress Messages
      progress: {
        step: "Step {current} of {total}",
        percentage: "{percentage}% Complete",
      },

      // Labels
      labels: {
        characters: "characters",
      },

      // Field descriptions
      descriptions: {
        urgency:
          "Select the timeframe that best fits your project needs",
        industry: "Select the industry your company operates in",
        goals: "Select all goals that apply to your project",
        features: "Select all features you'd like in your project",
        targetAudience:
          "Describe who will be using your website or application",
        existingWebsite:
          "If you have a current website, please provide the URL",
      },

      // Project Types
      types: {
        websiteRedesign: "Website Redesign",
        newWebsite: "New Website",
        ecommerce: "E-commerce Store",
        webApp: "Web Application",
        mobileApp: "Mobile Application",
        seo: "SEO Optimization",
        marketing: "Digital Marketing",
      },

      // Urgency Levels
      urgencyLevels: {
        notUrgent: "Not urgent (3+ months)",
        standard: "Standard (1-3 months)",
        urgent: "Urgent (2-4 weeks)",
        asap: "Very urgent (1-2 weeks)",
      },

      // Timelines
      timelines: {
        urgent: "Urgent (ASAP)",
        oneToTwoMonths: "1-2 months",
        twoToFourMonths: "2-4 months",
        fourToSixMonths: "4-6 months",
        sixMonthsPlus: "6+ months",
        flexible: "Flexible timeline",
      },

      // Budgets
      budgets: {
        under5k: "Under $5,000",
        fiveTo15k: "$5,000 - $10,000",
        fifteenTo30k: "$10,000 - $20,000",
        thirtyTo50k: "$25,000 +",
        discuss: "Let's discuss",
      },

      // Content Readiness
      contentReadiness: {
        ready: "Yes, all content is ready",
        partial: "Partially ready, we need help",
        none: "No, we need help preparing content",
      },

      // Contact Methods
      contactMethods: {
        email: "Email",
        phone: "Phone",
        whatsapp: "WhatsApp",
        viber: "Viber",
        zoom: "Zoom",
        other: "Other (specify in additional info)",
      },

      // Form Validation
      validation: {
        required: "This field is required",
        invalidEmail: "Please enter a valid email address",
        invalidUrl: "Please enter a valid URL",
        minLength: "Must contain at least {min} characters",
        maxLength: "Must contain at most {max} characters",
      },

      // Success Message
      success: {
        title: "Successfully sent!",
        message:
          "Thank you for contacting us. We will get back to you as soon as possible.",
        returnHome: "Return to home page",
      },

      // Error Message
      error: {
        title: "An error occurred",
        message:
          "Unfortunately, an error occurred while sending your request. Please try again later.",
        tryAgain: "Try again",
      },

      // File Upload
      fileUpload: {
        title: "References and materials",
        description:
          "Upload references, logos, sketches, or any other materials that will help us better understand your needs",
        supportedFormats:
          "Max. 10MB per file. Supported formats: JPG, PNG, GIF, PDF, DOC, TXT",
      },

      // Confirmation Dialog
      confirm: {
        title: "Are you sure?",
        message:
          "You have unsaved changes. Are you sure you want to leave?",
        yes: "Yes, leave",
        no: "No, stay",
      },

      // Accessibility
      a11y: {
        closeButton: "Close",
        menuButton: "Menu",
        nextStep: "Next step",
        previousStep: "Previous step",
      },
    },
  },

  about: {
    title: "About Us",
    subtitle: `NGC – Next Generation Code is a digital agency specialized in crafting modern, fast, and functional websites and applications. We are a team of young, creative, and experienced developers and designers focused on quality, performance, and unique user experiences.

Our mission is to help businesses, brands, and individuals stand out in the digital world through innovative solutions and modern design. Using cutting-edge technologies like Next.js, React, Tailwind CSS, and WordPress, we deliver optimized and sustainable digital products.`,
    ourMission: {
      title: "Our Mission",
      content: `At NGC, our mission is to provide top-tier digital solutions that transform businesses and simplify daily operations for our clients. We believe technology drives innovation and growth, so we are dedicated to developing creative and technically sophisticated products tailored to individual needs. Our goal is to build long-term partnerships based on trust, quality, and continuous support, helping companies stand out in today's digital landscape.`,
    },
    ourTeam: {
      title: "Our Team",
      content: `Our team consists of skilled and dedicated professionals with expertise in web development, design, marketing, and project management. With a clear vision and strong teamwork, we strive to exceed our clients' expectations through innovative and effective solutions. Each team member brings unique expertise and creativity, creating strong synergy and guaranteeing project success. At NGC, we value honesty, transparency, and continuous improvement because we believe that’s the way to achieve real results.`,
    },
    whyChooseUs: "Why Choose Us",
    benefits: {
      experience: "Years of industry experience",
      quality: "Commitment to quality",
      support: "Dedicated support",
      innovation: "Innovative solutions",
    },
  },

  search: {
    categories: {
      all: "All Categories",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "About",
      contact: "Contact",
    },
    sort: {
      relevance: "Most Relevant",
      recent: "Most Recent",
      popular: "Most Popular",
      alphabetical: "A-Z",
    },
  },

  footer: {
    description:
      "Transform your ideas into exceptional digital experiences. Let's build something amazing together.",
    copyright: "© {year} NGC. All rights reserved.",
    sections: {
      services: "Services",
      company: "Company",
    },
    links: {
      services: {
        design: "Design",
        webdev: "Web Development",
        mobile: "Mobile Apps",
        branding: "Branding",
      },
      company: {
        about: "About Us",
        careers: "Careers",
        blog: "Blog",
        contact: "Contact Us",
      },
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cookies: "Cookie Policy",
      },
    },
  },
};

export default en;
