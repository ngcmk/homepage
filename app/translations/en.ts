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
    serviceCategories: "Service Categories",
    exploreServices: "Explore our comprehensive range of digital solutions",
    needCustomSolution: "Need a Custom Solution?",
    customSolutionDescription: "Can't find exactly what you're looking for? Let's discuss your unique requirements and create a tailored solution for your business.",
    startCustomProject: "Start Custom Project",
    scheduleConsultation: "Schedule Consultation",
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
          value: "+389 78 209046",
          description: "Aleksandar, CEO & Co-founder",
        },
        ctoPhone: {
          label: "Direct line to the Chief Technology Officer",
          value: "+389 70 294386",
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
        project: "New Project",
        design: "Design Services",
        development: "Development Services",
        mobile: "Mobile App",
        ai: "AI Solutions",
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
    initialize: {
      title: "Start Your Project",
      subtitle:
        "Tell us about your project and we'll get back to you with a customized quote",

      steps: {
        step1: "Project Basics",
        step2: "Project Details",
        step3: "Timeline & Budget",
        step4: "Contact Info",
        step5: "Review & Submit",
      },

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

      buttons: {
        next: "Next Step",
        previous: "Previous Step",
        submit: "Submit Project",
        chooseFiles: "Choose Files",
        startFresh: "Start fresh",
        back: "Back",
        continue: "Continue",
      },

      progress: {
        step: "Step {current} of {total}",
        percentage: "{percentage}% Complete",
      },

      labels: {
        characters: "characters",
      },

      descriptions: {
        urgency:
          "Select the timeline that best matches your project needs",
        industry: "Select the industry your company operates in",
        goals: "Select all goals that apply to your project",
        features: "Select all features you'd like in your project",
        targetAudience: "Describe who will use your website or application",
        existingWebsite:
          "If you have an existing website, please provide the URL",
      },

      types: {
        websiteRedesign: "Website Redesign",
        newWebsite: "New Website",
        ecommerce: "E-commerce",
        webApp: "Web Application",
        mobileApp: "Mobile Application",
        branding: "Branding",
      },

      urgencyLevels: {
        low: "Low - No rush",
        medium: "Medium - Flexible",
        high: "High - Important",
        urgent: "Urgent - As soon as possible",
      },

      projectGoals: {
        "increase-traffic": "Increase Website Traffic",
        "increase-conversions": "Increase Conversions",
        "improve-ux": "Improve User Experience",
        rebrand: "Rebrand/Refresh Design",
        "add-features": "Add New Features",
        "mobile-friendly": "Make Site Mobile-Friendly",
        seo: "Improve SEO",
      },

      commonFeatures: {
        responsive: "Responsive Design",
        cms: "CMS Integration",
        ecommerce: "E-commerce Functionality",
        blog: "Blog",
        contactForm: "Contact Form",
        seo: "SEO Optimization",
        analytics: "Analytics/Tracking",
        socialMedia: "Social Media Integration",
        login: "User Authentication",
        multiLanguage: "Multi-language Support",
      },

      budgetRanges: {
        "under-1k": "Under €1,000",
        "1k-5k": "€1,000 - €5,000",
        "5k-10k": "€5,000 - €10,000",
        "10k-25k": "€10,000 - €25,000",
        "25k-50k": "€25,000 - €50,000",
        "over-50k": "Over €50,000",
        "not-sure": "Not sure yet",
      },

      hasContentOptions: {
        yes: "Yes, I have all content ready",
        partially: "Partially - need some help",
        no: "No - need help creating content",
      },

      yesNoOptions: {
        yes: "Yes",
        no: "No",
      },

      contactMethods: {
        email: "Email",
        phone: "Phone Call",
        "video-call": "Video Call",
        "any-method": "Any method is fine",
      },

      messages: {
        success: "Project submitted successfully!",
        error: "Failed to submit project. Please try again.",
        required: "This field is required",
        invalidEmail: "Please enter a valid email",
      },
    },
    thankYou: {
      title: "Thank You!",
      subtitle: "Your project request has been submitted.",
      whatHappensNext: "What happens next?",
      nextSteps: [
        "We will review your request and get back to you shortly.",
        "Our team will analyze your requirements and contact you to discuss next steps.",
        "In the meantime, you can explore our services or contact us directly.",
      ],
      actions: {
        returnHome: "Return to Home",
        exploreServices: "Explore Our Services",
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
