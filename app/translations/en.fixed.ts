import { Translation } from "../types/translation";

const en: Translation = {
  // Navigation
  nav: {
    home: "Home",
    services: "Services",
    work: "Work",
    clients: "Clients",
    contact: "Contact",
    startProject: "Start Project",
  },

  // Hero Section
  hero: {
    title: "We Create Digital Solutions That Drive Growth",
    subtitle:
      "We transform ideas into exceptional digital solutions that drive growth and deliver results.",
    startProject: "Start Your Project",
    viewWork: "View Our Work",
  },

  // Services Section
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
      description:
        "Beautiful, intuitive interfaces that enhance user experience",
    },
    mobile: {
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android",
    },
    ai: {
      title: "AI Solutions",
      description:
        "Intelligent automation and data analysis using cutting-edge AI",
    },
    poc: {
      title: "Proof of Concept",
      description:
        "Rapid prototyping to validate your ideas before full development",
    },
    "ngo-support": {
      title: "NGO Support",
      description: "Discounted digital services for non-profit organizations",
    },
  },

  // Contact Section
  contact: {
    title: "Ready to start your project?",
    hub: {
      title: "Get in Touch",
      subtitle: "Have a project in mind? We'd love to discuss how we can help.",
      letsWorkTogether: "LET'S WORK TOGETHER",
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
          value: "Skopje, North Macedonia",
          description: "Central European Time (CET)",
        },
        ceoPhone: {
          label: "CEO Direct Line",
          value: "+389 70 123 456",
          description: "Martin, CEO & Co-founder",
        },
        ctoPhone: {
          label: "CTO Direct Line",
          value: "+389 70 456 789",
          description: "Stefan, CTO & Co-founder",
        },
        hours: {
          label: "Business Hours",
          value: "Mon-Fri: 9AM - 6PM CET",
          description: "Weekend: By appointment",
        },
        languages: {
          label: "Languages",
          value: "English, Macedonian, Serbian",
          description: "German & Dutch also available",
        },
      },
      social: {
        title: "Follow Us",
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
      cta: {
        title: "Ready to Start?",
        description: "Initiate your project brief and get a custom proposal.",
      },
    },
    // Additional contact info methods that might be referenced elsewhere
    methods: {
      email: {
        title: "Send an Email",
        subtitle: "Direct to our inbox",
        description:
          "Best for detailed inquiries and sharing documents. We typically respond within one business day.",
        action: "Send Email",
        badge: "Recommended",
        stats: "Average response: 24h",
      },
      call: {
        title: "Schedule a Call",
        subtitle: "Book a consultation",
        description:
          "Perfect for discussing project details, asking questions, and getting to know our team. Choose a time that works for you.",
        action: "Book Call",
        badge: "Most Popular",
        stats: "Available in 30-minute slots",
      },
      project: {
        title: "Start Your Project",
        subtitle: "Complete project brief",
        description:
          "Fill out our comprehensive project questionnaire to help us understand your needs and provide an accurate quote.",
        action: "Start Brief",
        badge: "Most Detailed",
        stats: "Takes approximately 10 minutes",
      },
    },
  },

  // Project Initialization
  project: {
    initialize: {
      title: "Start Your Project",
      subtitle:
        "Tell us about your project and we'll get back to you with a customized quote",

      // Steps
      steps: {
        step1: "Project Basics",
        step2: "Project Details",
        step3: "Timeline & Budget",
        step4: "Contact Info",
        step5: "Review & Submit",
      },

      // Form Fields
      fields: {
        name: "Project Name",
        description: "Project Description",
        type: "Project Type",
        urgency: "Project Urgency",
        industry: "Industry/Business Type",
        targetAudience: "Target Audience",
        existingWebsite: "Existing Website URL",
        goals: "Project Goals",
        features: "Desired Features",
        timeline: "Timeline",
        budget: "Budget",
        hasContent: "Do you have content?",
        designPreferences: "Design Preferences",
        contactName: "Contact Name",
        contactEmail: "Contact Email",
        contactPhone: "Contact Phone",
        company: "Company",
        preferredContact: "Preferred Contact Method",
        additionalInfo: "Additional Information",
        projectFiles: "Project Files",
      },

      // Placeholders
      placeholders: {
        name: "Enter project name",
        description: "Describe your project and what you want to achieve",
        type: "Select project type",
        urgency: "How urgent is your project?",
        industry: "Which industry are you in?",
        targetAudience: "Who is your target market?",
        existingWebsite: "https://your-site.com",
        timeline: "When does the project need to be completed?",
        budget: "What's your approximate budget?",
        hasContent: "Do you have text, images, etc. prepared?",
        designPreferences: "Share your design preferences",
        contactName: "Your name",
        contactEmail: "your-email@example.com",
        contactPhone: "+1 234 567 890",
        company: "Your company name",
        preferredContact: "How would you prefer we contact you?",
        additionalInfo:
          "Any additional details, special requirements, or questions you'd like to share?",
      },

      // Buttons & Actions
      buttons: {
        next: "Next Step",
        previous: "Previous Step",
        submit: "Submit Project",
        chooseFiles: "Choose Files",
        startFresh: "Start fresh",
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
        urgency: "Select the timeframe that best fits your project needs",
        industry: "Select the industry your business operates in",
        goals: "Select all the goals that apply to your project",
        features: "Select all the features you'd like in your project",
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
        branding: "Branding & Identity",
      },

      // Urgency Levels
      urgencyLevels: {
        notUrgent: "Not Urgent (3+ months)",
        standard: "Standard (1-3 months)",
        urgent: "Urgent (2-4 weeks)",
        asap: "ASAP (1-2 weeks)",
      },

      // Budget Ranges
      budgetRanges: {
        small: "Less than $1,000",
        medium: "$1,000 - $5,000",
        large: "$5,000 - $10,000",
        enterprise: "$10,000+",
      },

      // Content options
      contentOptions: {
        yes: "Yes, I have content ready",
        partial: "Partially, will need some help",
        no: "No, will need full content creation",
      },

      // Contact Method Options
      contactMethods: {
        email: "Email",
        phone: "Phone",
        any: "Either method",
      },

      // Success & Error Messages
      success: {
        submissionSuccess:
          "Your project request has been submitted successfully! We'll contact you soon.",
        minorErrorSuccess:
          "Your request was submitted with minor errors, but don't worry - we'll be in touch soon!",
      },
      errors: {
        connectionError:
          "We couldn't connect to our server. Please try again.",
        validationError:
          "Some fields contain errors. Please check and try again.",
        connectionErrorContact:
          "If the problem persists, please contact us directly at:",
        submissionError:
          "There was a problem submitting your request. Please try again later.",
        emailRequired:
          "Please enter a contact email to submit your request.",
      },

      // Autosave Messages
      autosave: {
        restored:
          "Previous progress restored. You can continue where you left off.",
        startFresh: "Start fresh",
      },

      // Form Validation
      validation: {
        required: "This field is required",
        minLength: "Must be at least {min} characters",
        maxLength: "Must be at most {max} characters",
        invalidEmail: "Please enter a valid email address",
        invalidUrl: "Please enter a valid URL",
        invalidPhone: "Please enter a valid phone number",
      },
    },
  },

  // Footer
  footer: {
    copyright: "All rights reserved.",
    description: "We create digital solutions that drive growth and results for businesses of all sizes.",
    social: {
      facebook: "Facebook",
      twitter: "Twitter",
      linkedin: "LinkedIn",
      instagram: "Instagram",
    },
    links: {
      services: {
        design: "UI/UX Design",
        webdev: "Web Development",
        mobile: "Mobile Development",
        branding: "Branding",
      },
      company: {
        about: "About Us",
        careers: "Careers",
        blog: "Blog",
        contact: "Contact",
      },
    },
    sections: {
      services: "Services",
      company: "Company",
    },
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
};

export default en;
