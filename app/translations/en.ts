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
