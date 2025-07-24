import ThankYou from "../thank-you/page";
import { Translation } from "../types/translation";

const en: Translation = {
  // Navigation
  nav: {
    services: "Services",
    work: "Work",
    clients: "Clients",
    contact: "Contact",
    home: "Home",
    startProject: "Start Project",
     about: "About Us"
  },

  // Hero Section
  hero: {
    title: "We craft digital experiences with purpose",

    subtitle:
      "Minimalist design. Maximum impact. We build websites that convert visitors into customers.",

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
          // description: "German & Dutch also available",
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
      ctaSection: {
        title: "Ready to Start?",
        description: "Initiate your project brief and get a custom proposal.",
        buttonText: "Start Your Project",
      },
    },
    // Contact Form
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
        // fiftyToHundredK: "$50,000 - $100,000",
        // overHundredK: "Over $100,000",
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
      title: "Thank You for Your Message!",
      subtitle: "Your request has been successfully submitted.",
      whatHappensNext: "What Happens Next?",
      nextSteps: [
        "We'll review your message and get back to you as soon as possible.",
        "Our team will analyze your request and contact you to discuss the next steps.",
        "In the meantime, feel free to explore our services or contact us directly by phone.",
      ],
      actions: {
        returnHome: "Return to Homepage",
        exploreServices: "Explore Our Services",
      },
    },
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
        timeline: "Project Timeline",
        budget: "Project Budget",
        hasContent: "Content Preparation",
        designPreferences: "Design Style Preferences",
        contactName: "Your Name",
        contactEmail: "Email Address",
        contactPhone: "Phone Number",
        company: "Company/Organization",
        preferredContact: "Preferred Contact Method",
        additionalInfo: "Additional Information",
        projectFiles: "Project References & Assets",
      },

      // Placeholders
      placeholders: {
        name: "Enter your project name",
        description: "Tell us about your project goals and requirements...",
        type: "Select your project type",
        urgency: "Select timeframe",
        industry: "Select your industry",
        targetAudience:
          "Describe your target audience (e.g., young professionals, small business owners, students...)",
        existingWebsite: "https://yourwebsite.com",
        designPreferences:
          "Describe your preferred design style, colors, examples of websites you like, etc.",
        contactName: "Enter your full name",
        contactEmail: "your.email@example.com",
        contactPhone: "+1 (555) 123-4567",
        company: "Your company name",
        preferredContact: "How would you like us to contact you? (Optional)",
        additionalInfo:
          "Any additional details, special requirements, or questions you'd like to share?",
        timeline: "When do you need this completed?",
        budget: "What is your approximate budget?",
        hasContent: "Do you have content ready?",
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
      urgencyLevels: [
        {
          value: "low",
          label: "No Rush",
          description: "Flexible timeline, planning for future",
        },
        {
          value: "medium",
          label: "Standard",
          description: "Typical project timeline",
        },
        {
          value: "high",
          label: "Urgent",
          description: "Need as soon as possible",
        },
        {
          value: "urgent",
          label: "Critical",
          description: "Immediate attention required",
        },
      ],

      // Industries
      industries: [
        { value: "technology", label: "Technology" },
        { value: "healthcare", label: "Healthcare" },
        { value: "finance", label: "Finance & Banking" },
        { value: "education", label: "Education" },
        { value: "retail", label: "Retail & E-commerce" },
        { value: "other", label: "Other" },
      ],

      // Project Goals
      projectGoals: [
        {
          value: "increase-traffic",
          label: "Increase Website Traffic",
        },
        { value: "increaseSales", label: "Increase Sales/Leads" },
        { value: "improveBranding", label: "Improve Branding" },
        {
          value: "enhanceUserExperience",
          label: "Enhance User Experience",
        },
        { value: "reachNewCustomers", label: "Reach New Customers" },
        { value: "automateProcesses", label: "Automate Processes" },
      ],

      // Common Features
      commonFeatures: [
        { value: "user-accounts", label: "User Accounts" },
        { value: "payment-processing", label: "Payment Processing" },
        { value: "content-management", label: "Content Management" },
        { value: "analytics", label: "Analytics Dashboard" },
        {
          value: "social-integration",
          label: "Social Media Integration",
        },
      ],

      // Contact Methods
      contactMethods: [
        {
          value: "email",
          label: "Email",
          description: "Best for detailed discussions",
        },
        {
          value: "phone",
          label: "Phone Call",
          description: "Good for quick questions",
        },
        {
          value: "video-call",
          label: "Video Call",
          description: "Best for complex discussions",
        },
      ],

      // File Upload
      fileUpload: {
        title: "Project References & Assets",
        description:
          "Upload inspiration images, existing logos, wireframes, or any reference materials",
        supportedFormats:
          "Max 10MB per file. Supported: JPG, PNG, GIF, PDF, DOC, TXT",
      },

      // Summary Section
      summary: {
        title: "Project Consultation Request",
        description:
          "Thank you for submitting your project details. Our team will review your request and contact you soon.",
        projectBasics: "Project Basics",
        projectDetails: "Project Details",
        contactInformation: "Contact Information",
        submitConfirmation: "Submit Project Request",
      },

      // Auto-save Messages
      autosave: {
        restored:
          "Previous progress restored. You can continue where you left off.",
        startFresh: "Start fresh",
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

      // Form Validation
      validation: {
        required: "This field is required",
        minLength: "Must be at least {min} characters",
        maxLength: "Must be at most {max} characters",
        invalidEmail: "Please enter a valid email address",
        invalidUrl: "Please enter a valid URL",
      },

      // Error Messages
      errors: {
        serverUnavailable:
          "We couldn't connect to our server. Please try again.",
        emailRequired: "Please enter a contact email to submit your request.",
        unknownError: "An unknown error occurred. Please try again.",
        networkError:
          "Network connection failed. Please check your internet connection.",
        timeoutError: "Request timed out. Please try again.",
        permissionError: "You don't have permission to perform this action.",
        validationError:
          "Some fields contain errors. Please check and try again.",
      },

      // Success/Error States
      states: {
        loading: "Loading...",
        success: "Success!",
        error: "An error occurred",
        connectionLost:
          "Connection lost. Please check your internet connection.",
      },

      // Confirmation Dialog
      confirm: {
        title: "Are you sure?",
        message: "You have unsaved changes. Are you sure you want to leave?",
        yes: "Yes, leave",
        no: "No, stay",
      },

      // Accessibility
      a11y: {
        closeButton: "Close",
        menuButton: "Toggle menu",
        nextStep: "Next step",
        previousStep: "Previous step",
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
          timeline: "Project Timeline",
          budget: "Project Budget",
          hasContent: "Content Preparation",
          designPreferences: "Design Style Preferences",
          contactName: "Your Name",
          contactEmail: "Email Address",
          contactPhone: "Phone Number",
          company: "Company/Organization",
          preferredContact: "Preferred Contact Method",
          additionalInfo: "Additional Information",
          projectFiles: "Project References & Assets",
        },

        // Placeholders
        placeholders: {
          name: "Enter your project name",
          description: "Tell us about your project goals and requirements...",
          type: "Select your project type",
          urgency: "Select your project urgency",
          industry: "Select your industry",
          targetAudience:
            "Describe your target audience (e.g., young professionals, small business owners, students...)",
          existingWebsite: "https://yourwebsite.com",
          designPreferences:
            "Describe your preferred design style, colors, examples of websites you like, etc.",
          contactName: "Enter your full name",
          contactEmail: "your.email@example.com",
          contactPhone: "+1 (555) 123-4567",
          company: "Your company name",
          preferredContact: "How would you like us to contact you? (Optional)",
          additionalInfo:
            "Any additional details, special requirements, or questions you'd like to share?",
          timeline: "When do you need this completed?",
          budget: "What is your approximate budget?",
          hasContent: "Do you have content ready?",
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

        // Error Messages
        errors: {
          serverUnavailable:
            "We couldn't connect to our server. Please try again.",
          emailRequired: "Please enter a contact email to submit your request.",
          unknownError: "An unknown error occurred. Please try again.",
          networkError:
            "Network connection failed. Please check your internet connection.",
          timeoutError: "Request timed out. Please try again.",
          permissionError: "You don't have permission to perform this action.",
          validationError:
            "Some fields contain errors. Please check and try again.",
        },
      },
    },

    // Services - Main
    services: {
      pageTitle: "Our Services",
      title: "Our Services",
      subtitle:
        "We specialize in creating digital experiences that are both modern and functional, focusing on what matters most to your business.",
      design: {
        title: "Design",
        description:
          "Intuitive interfaces that engage users and drive conversions through thoughtful design and seamless interactions.",
      },
      development: {
        title: "Development",
        description:
          "Clean, efficient code that brings designs to life with performance and accessibility at the forefront.",
      },
      mobile: {
        title: "Mobile Apps",
        description:
          "Native and cross-platform applications that deliver consistent experiences across all devices.",
      },
      poc: {
        title: "Proof of Concept",
        description: "Bring your ideas to life",
      },
      ai: {
        title: "AI Integration",
        description:
          "Integrate AI into client workflows with on-premises and cloud solutions",
      },
      ngoSupport: {
        title: "NGO Support",
        description:
          "Free design, development and hosting for NGOs from SEE that don't receive foreign funding",
      },
      pageDescription:
        "Comprehensive digital solutions to transform your business and drive growth",
      whyChooseUs: {
        title: "Why Choose Us",
        description:
          "We are committed to delivering exceptional results for every project we undertake. Here's why our clients trust us with their digital needs.",
        expertTeam: {
          title: "Expert Team",
          description:
            "Our team of experienced professionals is dedicated to delivering high-quality solutions tailored to your needs.",
        },
        fastDelivery: {
          title: "Fast Delivery",
          description:
            "We understand the importance of time and ensure timely delivery of all our projects without compromising on quality.",
        },
        ongoingSupport: {
          title: "Ongoing Support",
          description:
            "Our relationship doesn't end with project delivery. We provide continuous support to ensure your success.",
        },
      },
      allCategories: "All Categories",
      viewModes: {
        grid: "Grid view",
        list: "List view",
      },
      filters: {
        searchPlaceholder: "Search services...",
        status: "Status",
        type: "Type",
        urgency: "Urgency",
        allStatuses: "All Statuses",
        allTypes: "All Types",
        allUrgencies: "All Urgencies",
      },
      stats: {
        servicesOffered: "Services Offered",
        projectsCompleted: "Projects Completed",
        clientSatisfaction: "Client Satisfaction",
        yearsExperience: "Years Experience",
      },
      serviceCard: {
        startingAt: "Starting at",
        timeline: "Timeline",
        complexity: "Complexity",
        learnMore: "Learn More",
        freeForNGOs: "Free for NGOs",
        premiumService: "Premium Service",
      },
      resultsCount: "Showing {count} of {total} services",
      cta: {
        title: "Ready to bring your ideas to life?",
        description:
          "Whether you have a project in mind or just want to explore possibilities, we're here to help. Let's create something amazing together!",
        startProject: "Start Your Project",
        getFreeConsultation: "Get Free Consultation",
      },
    },

    // Service Template
    serviceTemplate: {
      startingPrice: "Starting Price",
      timeline: "Timeline",
      complexity: "Complexity",
      category: "Category",
      targetAudience: "Perfect For",
      technologies: "Technologies We Use",
      deliverables: "What You'll Receive",
      features: "Service Features",
      featuresDescription:
        "Comprehensive features designed to meet your specific needs",
      process: "Our Process",
      processDescription:
        "A proven methodology that ensures successful project delivery",
      pricing: "Transparent Pricing",
      pricingDescription:
        "Choose the package that best fits your needs and budget",
      portfolio: {
        title: "Portfolio",
        cta: "View All Projects",
        description:
          "See how we've helped other businesses succeed with {service}",
      },
      faq: "Frequently Asked Questions",
      faqDescription: "Everything you need to know about our {service} service",
      recommended: "Recommended",
      customPricing: "Need a Custom Solution?",
      customPricingDescription:
        "Every project is unique. Contact us for a personalized quote based on your specific requirements.",
      portfolioComingSoon: "Portfolio Coming Soon",
      portfolioComingSoonDescription:
        "We're working on showcasing our latest {service} projects.",
      stillHaveQuestions: "Still Have Questions?",
      stillHaveQuestionsDescription:
        "We're here to help! Get in touch with our team for personalized answers.",
      relatedServices: "You Might Also Like",
      relatedServicesStartingAt: "Starting at",
      relatedServicesLearnMore: "Learn More",
      finalCta: "Ready to Get Started?",
      finalCtaDescription:
        "Let's discuss how our {service} services can help transform your business and achieve your goals.",
      cta: {
        startProject: "Start Your Project",
        viewPricing: "View Pricing",
        getStarted: "Get Started",
        customQuote: "Get Custom Quote",
        contactUs: "Contact Us",
        scheduleConsultation: "Schedule Consultation",
      },
      tabs: {
        overview: "Overview",
        features: "Features",
        process: "Process",
        pricing: "Pricing",
        portfolio: "Portfolio",
        faq: "FAQ",
      },
      whyChoose: "Why Choose Our {service}?",
    },

    // Hero
    hero: {
      title: "We craft digital experiences with purpose",
      allProjects: "All Projects",
      webDevelopment: "Web Development",
      mobileApps: "Mobile Apps",
      uiuxDesign: "UI/UX Design",
      project1: {
        title: "Ecommerce Redesign",
        category: "Design",
        description:
          "A complete overhaul of an e-commerce platform focusing on conversion optimization",
      },
      project2: {
        title: "Analytics Dashboard",
        category: "Web Application",
        description:
          "A comprehensive analytics platform for tracking user behavior and metrics",
      },
      project3: {
        title: "Fitness App",
        category: "Mobile Development",
        description:
          "Cross-platform mobile application for fitness tracking and nutrition planning",
      },
      viewProject: "View Project",
      projectDetails: "Project Details",
      projectOverview: "Project Overview",
      keyFeatures: "Key Features",
      duration: "Duration",
      team: "Team",
      technologies: "Technologies Used",
      visitWebsite: "Visit Website",
    },

    // Testimonials
    testimonials: {
      title: "Client Stories",
      subtitle:
        "Don't take our word for it. Here's what our clients have to say about working with us.",
      client1: {
        name: "Alex Johnson",
        role: "CEO, TechVision",
        quote:
          "Minima transformed our digital presence completely. Their attention to detail and focus on user experience resulted in a 40% increase in conversions.",
      },
      client2: {
        name: "Sarah Williams",
        role: "Founder, Innovate",
        quote:
          "Working with Minima was refreshingly straightforward. They delivered exactly what we needed, on time and on budget, with exceptional quality.",
      },
    },

    // Contact Info - Additional
    contactInfoExtra: {
      methods: {
        email: {
          title: "Send an Email",
          subtitle: "Directly to our inbox",
          description:
            "Best for detailed inquiries and sharing documents. We typically respond within one business day.",
          action: "Send Email",
          badge: "Recommended",
          stats: "Avg. response: 24h",
        },
        call: {
          title: "Schedule a Call",
          subtitle: "Book a consultation",
          description:
            "Perfect for discussing project details, asking questions, and getting to know our team. Book a time that works for you.",
          action: "Book a Call",
          badge: "Most Popular",
          stats: "30-minute slots available",
        },
        project: {
          title: "Start a Project",
          subtitle: "Use our detailed form",
          description:
            "Our project planner helps you outline your needs, ensuring we have all the details to provide an accurate quote and timeline.",
          action: "Start Project",
          badge: "Best for Quotes",
          stats: "Get a detailed proposal",
        },
      },
      info: {
        location: {
          label: "Location",
          value: "Skopje, Macedonia",
        },
        availability: {
          label: "Availability",
          value: "Mon-Fri, 9am - 5pm CET",
        },
        social: {
          label: "Follow Us",
        },
      },
    },
  },

  about: {
  title: "About Us",
  subtitle: `NGC – Next Generation Code is a digital agency specialized in crafting modern, fast, and functional websites and applications. We are a team of young, creative, and experienced developers and designers focused on quality, performance, and unique user experiences.

Our mission is to help businesses, brands, and individuals stand out in the digital world through innovative solutions and modern design. Using cutting-edge technologies like Next.js, React, Tailwind CSS, and WordPress, we deliver optimized and sustainable digital products.`,

  ourMission: {
    title: "Our Mission",
    content: `At NGC, our mission is to provide top-tier digital solutions that transform businesses and simplify daily operations for our clients. We believe technology drives innovation and growth, so we are dedicated to developing creative and technically sophisticated products tailored to individual needs. Our goal is to build long-term partnerships based on trust, quality, and continuous support, helping companies stand out in today's digital landscape.`
  },

  ourTeam: {
    title: "Our Team",
    content: `Our team consists of skilled and dedicated professionals with expertise in web development, design, marketing, and project management. With a clear vision and strong teamwork, we strive to exceed our clients' expectations through innovative and effective solutions. Each team member brings unique expertise and creativity, creating strong synergy and guaranteeing project success. At NGC, we value honesty, transparency, and continuous improvement because we believe that’s the way to achieve real results.`
  },

  whyChooseUs: "Why Choose Us",
  benefits: {
    experience: "Years of industry experience",
    quality: "Commitment to quality",
    support: "Dedicated support",
    innovation: "Innovative solutions"
  }
},


  // Footer
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
