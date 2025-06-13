export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceBenefit {
  id: string;
  title: string;
  description: string;
  metric?: string;
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

export interface ServicePricing {
  tier: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface ServiceTechnology {
  name: string;
  category: string;
  icon?: string;
}

export interface ServicePortfolioItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  url?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  path: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  category: string;
  color: string;
  gradient: string;
  isNGO?: boolean;
  isPremium?: boolean;
  estimatedDuration: string;
  startingPrice: string;
  complexity: "Low" | "Medium" | "High" | "Expert";
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  process: ServiceProcess[];
  pricing: ServicePricing[];
  technologies: ServiceTechnology[];
  portfolio: ServicePortfolioItem[];
  faqs: ServiceFAQ[];
  relatedServices: string[];
  targetAudience: string[];
  deliverables: string[];
  tags: string[];
}

export const servicesData: Service[] = [
  {
    id: "design",
    path: "/services/design",
    title: "UI/UX Design",
    description:
      "Intuitive interfaces that engage users and drive conversions through thoughtful design and seamless interactions.",
    shortDescription: "User-centered design that converts",
    icon: "Palette",
    category: "Creative",
    color: "#8B5CF6",
    gradient: "from-purple-500 to-pink-500",
    estimatedDuration: "4-8 weeks",
    startingPrice: "$2,500",
    complexity: "Medium",
    features: [
      {
        id: "user-research",
        title: "User Research & Analysis",
        description:
          "Deep dive into your target audience behavior and preferences",
        icon: "Users",
      },
      {
        id: "wireframing",
        title: "Wireframing & Prototyping",
        description: "Interactive prototypes to validate design concepts",
        icon: "Layout",
      },
      {
        id: "visual-design",
        title: "Visual Design Systems",
        description: "Comprehensive design systems for consistent branding",
        icon: "Paintbrush",
      },
      {
        id: "responsive-design",
        title: "Responsive Design",
        description:
          "Optimized experiences across all devices and screen sizes",
        icon: "Smartphone",
      },
      {
        id: "accessibility",
        title: "Accessibility Standards",
        description: "WCAG compliant designs for inclusive user experiences",
        icon: "Eye",
      },
      {
        id: "user-testing",
        title: "User Testing & Iteration",
        description: "Continuous improvement based on real user feedback",
        icon: "TestTube",
      },
    ],
    benefits: [
      {
        id: "conversion-boost",
        title: "Increased Conversions",
        description:
          "Well-designed interfaces can increase conversion rates significantly",
        metric: "Up to 200%",
      },
      {
        id: "user-satisfaction",
        title: "Enhanced User Satisfaction",
        description:
          "Intuitive designs lead to better user experiences and retention",
        metric: "95% satisfaction",
      },
      {
        id: "brand-credibility",
        title: "Improved Brand Credibility",
        description:
          "Professional design builds trust and establishes authority",
        metric: "3x more trust",
      },
      {
        id: "reduced-support",
        title: "Reduced Support Costs",
        description:
          "Clear interfaces reduce user confusion and support tickets",
        metric: "40% less support",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Research",
        description:
          "Understanding your business goals, target audience, and competitive landscape",
        duration: "1-2 weeks",
      },
      {
        step: 2,
        title: "Strategy & Planning",
        description:
          "Creating user personas, journey maps, and design strategy",
        duration: "1 week",
      },
      {
        step: 3,
        title: "Wireframing & Architecture",
        description:
          "Defining information architecture and creating low-fidelity wireframes",
        duration: "1-2 weeks",
      },
      {
        step: 4,
        title: "Visual Design",
        description: "Creating high-fidelity designs with your brand identity",
        duration: "2-3 weeks",
      },
      {
        step: 5,
        title: "Prototyping & Testing",
        description:
          "Building interactive prototypes and conducting user testing",
        duration: "1-2 weeks",
      },
      {
        step: 6,
        title: "Delivery & Handoff",
        description: "Final designs, design system, and developer handoff",
        duration: "1 week",
      },
    ],
    pricing: [
      {
        tier: "Essential",
        price: "$2,500",
        description: "Perfect for small businesses and startups",
        features: [
          "Up to 5 unique page designs",
          "Mobile & desktop versions",
          "Basic user research",
          "2 rounds of revisions",
          "Design files & assets",
        ],
      },
      {
        tier: "Professional",
        price: "$5,000",
        description: "Comprehensive solution for growing businesses",
        features: [
          "Up to 15 unique page designs",
          "Complete design system",
          "User research & personas",
          "Interactive prototypes",
          "3 rounds of revisions",
          "Developer handoff support",
        ],
        recommended: true,
      },
      {
        tier: "Enterprise",
        price: "$10,000+",
        description: "Full-scale design solutions for large organizations",
        features: [
          "Unlimited page designs",
          "Advanced user testing",
          "Custom design system",
          "Multiple brand variations",
          "Ongoing design support",
          "Priority support & consultation",
        ],
      },
    ],
    technologies: [
      { name: "Figma", category: "Design Tool" },
      { name: "Adobe Creative Suite", category: "Design Tool" },
      { name: "Principle", category: "Prototyping" },
      { name: "InVision", category: "Collaboration" },
      { name: "Maze", category: "User Testing" },
      { name: "Hotjar", category: "Analytics" },
    ],
    portfolio: [
      {
        id: "ecommerce-redesign",
        title: "E-commerce Platform Redesign",
        description:
          "Complete UI overhaul resulting in 150% increase in conversions",
        technologies: ["Figma", "React", "Next.js"],
        url: "/portfolio/ecommerce-redesign",
      },
      {
        id: "saas-dashboard",
        title: "SaaS Analytics Dashboard",
        description: "Complex data visualization made simple and intuitive",
        technologies: ["Figma", "D3.js", "React"],
        url: "/portfolio/saas-dashboard",
      },
    ],
    faqs: [
      {
        question: "How long does the design process typically take?",
        answer:
          "Most design projects take 4-8 weeks depending on complexity. We'll provide a detailed timeline during our initial consultation.",
      },
      {
        question: "Do you provide the design files after completion?",
        answer:
          "Yes, you'll receive all design files including Figma files, exported assets, and a comprehensive design system documentation.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Absolutely! We can work within your existing brand guidelines or help evolve your brand identity as needed.",
      },
      {
        question: "Do you offer revisions?",
        answer:
          "Yes, all packages include multiple rounds of revisions. We work closely with you to ensure the final design meets your expectations.",
      },
    ],
    relatedServices: ["development", "mobile", "poc"],
    targetAudience: ["Startups", "SMBs", "E-commerce", "SaaS Companies"],
    deliverables: [
      "High-fidelity design mockups",
      "Design system & style guide",
      "Interactive prototypes",
      "Asset exports & icons",
      "Developer handoff documentation",
    ],
    tags: [
      "UI/UX",
      "Responsive Design",
      "User Research",
      "Prototyping",
      "Design Systems",
    ],
  },
  {
    id: "development",
    path: "/services/development",
    title: "Web Development",
    description:
      "Clean, efficient code that brings designs to life with performance and accessibility at the forefront.",
    shortDescription: "Scalable web applications that perform",
    icon: "Code",
    category: "Technical",
    color: "#10B981",
    gradient: "from-green-500 to-blue-500",
    estimatedDuration: "6-16 weeks",
    startingPrice: "$5,000",
    complexity: "High",
    features: [
      {
        id: "frontend-development",
        title: "Frontend Development",
        description:
          "Modern React/Next.js applications with optimal performance",
        icon: "Monitor",
      },
      {
        id: "backend-development",
        title: "Backend Development",
        description: "Scalable APIs and server-side solutions",
        icon: "Server",
      },
      {
        id: "database-design",
        title: "Database Architecture",
        description: "Efficient database design and optimization",
        icon: "Database",
      },
      {
        id: "api-integration",
        title: "API Integration",
        description: "Seamless third-party service integrations",
        icon: "Link",
      },
      {
        id: "performance-optimization",
        title: "Performance Optimization",
        description: "Lightning-fast loading times and smooth interactions",
        icon: "Zap",
      },
      {
        id: "security-implementation",
        title: "Security Implementation",
        description: "Industry-standard security practices and protocols",
        icon: "Shield",
      },
    ],
    benefits: [
      {
        id: "faster-loading",
        title: "Faster Loading Times",
        description: "Optimized code ensures quick page loads and better SEO",
        metric: "Under 2s load time",
      },
      {
        id: "scalability",
        title: "Scalable Architecture",
        description: "Built to handle growth and increased traffic",
        metric: "10x scale capacity",
      },
      {
        id: "maintainability",
        title: "Easy Maintenance",
        description: "Clean, documented code that's easy to update and extend",
        metric: "50% faster updates",
      },
      {
        id: "seo-optimized",
        title: "SEO Optimized",
        description: "Built with search engine optimization best practices",
        metric: "3x better rankings",
      },
    ],
    process: [
      {
        step: 1,
        title: "Technical Planning",
        description:
          "Architecture design, technology stack selection, and project setup",
        duration: "1-2 weeks",
      },
      {
        step: 2,
        title: "Development Setup",
        description:
          "Environment configuration, CI/CD pipeline, and initial scaffolding",
        duration: "1 week",
      },
      {
        step: 3,
        title: "Core Development",
        description: "Building main features, components, and functionality",
        duration: "4-8 weeks",
      },
      {
        step: 4,
        title: "Integration & Testing",
        description: "API integrations, comprehensive testing, and bug fixes",
        duration: "2-3 weeks",
      },
      {
        step: 5,
        title: "Performance Optimization",
        description: "Speed optimization, SEO improvements, and final polish",
        duration: "1-2 weeks",
      },
      {
        step: 6,
        title: "Deployment & Launch",
        description:
          "Production deployment, monitoring setup, and go-live support",
        duration: "1 week",
      },
    ],
    pricing: [
      {
        tier: "Starter",
        price: "$5,000",
        description: "Simple websites and landing pages",
        features: [
          "Up to 5 pages",
          "Responsive design",
          "Contact forms",
          "Basic SEO setup",
          "1 month support",
        ],
      },
      {
        tier: "Business",
        price: "$15,000",
        description: "Full-featured web applications",
        features: [
          "Custom web application",
          "User authentication",
          "Database integration",
          "Admin dashboard",
          "API development",
          "3 months support",
        ],
        recommended: true,
      },
      {
        tier: "Enterprise",
        price: "$35,000+",
        description: "Complex applications with advanced features",
        features: [
          "Enterprise-grade application",
          "Multiple integrations",
          "Advanced security",
          "Performance optimization",
          "Custom features",
          "6 months support",
        ],
      },
    ],
    technologies: [
      { name: "React", category: "Frontend" },
      { name: "Next.js", category: "Framework" },
      { name: "TypeScript", category: "Language" },
      { name: "Node.js", category: "Backend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "AWS", category: "Cloud" },
    ],
    portfolio: [
      {
        id: "fintech-platform",
        title: "FinTech Trading Platform",
        description: "High-performance trading application with real-time data",
        technologies: ["React", "Node.js", "WebSocket", "PostgreSQL"],
        url: "/portfolio/fintech-platform",
      },
      {
        id: "healthcare-portal",
        title: "Healthcare Patient Portal",
        description: "HIPAA-compliant patient management system",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
        url: "/portfolio/healthcare-portal",
      },
    ],
    faqs: [
      {
        question: "What technologies do you use for development?",
        answer:
          "We primarily use modern technologies like React, Next.js, Node.js, and PostgreSQL. We choose the best stack based on your specific requirements.",
      },
      {
        question: "Do you provide ongoing maintenance and support?",
        answer:
          "Yes, we offer various support packages including bug fixes, updates, and feature enhancements post-launch.",
      },
      {
        question: "Can you integrate with our existing systems?",
        answer:
          "Absolutely! We have extensive experience integrating with various APIs, databases, and third-party services.",
      },
      {
        question: "How do you ensure the security of the application?",
        answer:
          "We implement industry-standard security practices including encryption, secure authentication, input validation, and regular security audits.",
      },
    ],
    relatedServices: ["design", "mobile", "ai"],
    targetAudience: [
      "Tech Startups",
      "Enterprises",
      "SaaS Companies",
      "E-commerce",
    ],
    deliverables: [
      "Complete web application",
      "Source code & documentation",
      "Deployment scripts",
      "Admin documentation",
      "Performance reports",
    ],
    tags: ["React", "Next.js", "Full-Stack", "API Development", "Performance"],
  },
  {
    id: "mobile",
    path: "/services/mobile",
    title: "Mobile App Development",
    description:
      "Native and cross-platform applications that deliver consistent experiences across all devices.",
    shortDescription: "Cross-platform mobile apps that scale",
    icon: "Smartphone",
    category: "Technical",
    color: "#3B82F6",
    gradient: "from-blue-500 to-purple-500",
    estimatedDuration: "8-20 weeks",
    startingPrice: "$8,000",
    complexity: "Expert",
    features: [
      {
        id: "cross-platform",
        title: "Cross-Platform Development",
        description: "Single codebase for iOS and Android using React Native",
        icon: "Smartphone",
      },
      {
        id: "native-performance",
        title: "Native Performance",
        description: "Optimized performance that feels truly native",
        icon: "Zap",
      },
      {
        id: "offline-support",
        title: "Offline Functionality",
        description: "Apps that work even without internet connection",
        icon: "Wifi",
      },
      {
        id: "push-notifications",
        title: "Push Notifications",
        description: "Engage users with timely and relevant notifications",
        icon: "Bell",
      },
      {
        id: "app-store-optimization",
        title: "App Store Optimization",
        description: "Optimized for discovery and downloads",
        icon: "Star",
      },
      {
        id: "analytics-integration",
        title: "Analytics & Monitoring",
        description: "Comprehensive app performance and user analytics",
        icon: "BarChart",
      },
    ],
    benefits: [
      {
        id: "wider-reach",
        title: "Wider Market Reach",
        description: "Access both iOS and Android users with one app",
        metric: "2x market coverage",
      },
      {
        id: "cost-effective",
        title: "Cost-Effective Development",
        description:
          "Single codebase reduces development and maintenance costs",
        metric: "40% cost savings",
      },
      {
        id: "faster-development",
        title: "Faster Time to Market",
        description: "Cross-platform approach accelerates development timeline",
        metric: "50% faster launch",
      },
      {
        id: "user-engagement",
        title: "Higher User Engagement",
        description: "Mobile apps have higher engagement rates than web",
        metric: "3x more engagement",
      },
    ],
    process: [
      {
        step: 1,
        title: "App Strategy & Planning",
        description:
          "Platform selection, feature prioritization, and technical architecture",
        duration: "2 weeks",
      },
      {
        step: 2,
        title: "UI/UX Design",
        description: "Mobile-first design with platform-specific guidelines",
        duration: "3-4 weeks",
      },
      {
        step: 3,
        title: "Development & Backend",
        description: "Core app development and backend API creation",
        duration: "6-12 weeks",
      },
      {
        step: 4,
        title: "Testing & QA",
        description: "Comprehensive testing on multiple devices and platforms",
        duration: "2-3 weeks",
      },
      {
        step: 5,
        title: "App Store Preparation",
        description: "App store optimization and submission preparation",
        duration: "1-2 weeks",
      },
      {
        step: 6,
        title: "Launch & Support",
        description: "App store launch and post-launch support",
        duration: "1-2 weeks",
      },
    ],
    pricing: [
      {
        tier: "MVP",
        price: "$8,000",
        description: "Minimum viable product for validation",
        features: [
          "Core functionality",
          "Basic UI/UX design",
          "iOS & Android apps",
          "Basic backend",
          "App store submission",
        ],
      },
      {
        tier: "Professional",
        price: "$25,000",
        description: "Feature-rich application for market launch",
        features: [
          "Advanced features",
          "Custom UI/UX design",
          "User authentication",
          "Push notifications",
          "Analytics integration",
          "3 months support",
        ],
        recommended: true,
      },
      {
        tier: "Enterprise",
        price: "$50,000+",
        description: "Complex applications with enterprise features",
        features: [
          "Enterprise-grade features",
          "Advanced integrations",
          "Custom backend",
          "Admin dashboard",
          "Advanced security",
          "6 months support",
        ],
      },
    ],
    technologies: [
      { name: "React Native", category: "Framework" },
      { name: "Expo", category: "Platform" },
      { name: "TypeScript", category: "Language" },
      { name: "Firebase", category: "Backend" },
      { name: "Redux", category: "State Management" },
      { name: "Stripe", category: "Payments" },
    ],
    portfolio: [
      {
        id: "fitness-tracker",
        title: "Fitness Tracking App",
        description:
          "Comprehensive fitness app with workout tracking and social features",
        technologies: ["React Native", "Firebase", "HealthKit"],
        url: "/portfolio/fitness-tracker",
      },
      {
        id: "food-delivery",
        title: "Food Delivery Platform",
        description: "Multi-vendor food delivery app with real-time tracking",
        technologies: ["React Native", "Node.js", "Socket.io", "Stripe"],
        url: "/portfolio/food-delivery",
      },
    ],
    faqs: [
      {
        question: "Do you develop for both iOS and Android?",
        answer:
          "Yes, we primarily use React Native which allows us to develop for both platforms simultaneously, reducing costs and development time.",
      },
      {
        question: "How long does it take to get an app approved in app stores?",
        answer:
          "Apple App Store typically takes 1-3 days, while Google Play Store usually approves within a few hours. We handle the entire submission process.",
      },
      {
        question: "Can you integrate with device features like camera and GPS?",
        answer:
          "Absolutely! We can integrate with all native device features including camera, GPS, push notifications, biometric authentication, and more.",
      },
      {
        question: "Do you provide app maintenance after launch?",
        answer:
          "Yes, we offer ongoing maintenance packages including bug fixes, OS updates, new feature development, and performance monitoring.",
      },
    ],
    relatedServices: ["design", "development", "ai"],
    targetAudience: ["Startups", "Enterprises", "E-commerce", "Healthcare"],
    deliverables: [
      "iOS & Android applications",
      "App store listings",
      "Backend API",
      "Admin dashboard",
      "Analytics setup",
    ],
    tags: ["React Native", "iOS", "Android", "Mobile UX", "App Store"],
  },
  {
    id: "ai",
    path: "/services/ai",
    title: "AI Integration",
    description:
      "Integrate AI into client workflows with on-premises and cloud solutions.",
    shortDescription: "AI-powered solutions for business automation",
    icon: "Brain",
    category: "Emerging Tech",
    color: "#F59E0B",
    gradient: "from-yellow-500 to-orange-500",
    estimatedDuration: "4-12 weeks",
    startingPrice: "$10,000",
    complexity: "Expert",
    isPremium: true,
    features: [
      {
        id: "custom-ai-models",
        title: "Custom AI Models",
        description:
          "Tailored machine learning models for your specific use case",
        icon: "Brain",
      },
      {
        id: "nlp-integration",
        title: "Natural Language Processing",
        description: "Chatbots, sentiment analysis, and text processing",
        icon: "MessageSquare",
      },
      {
        id: "computer-vision",
        title: "Computer Vision",
        description: "Image recognition, object detection, and visual analysis",
        icon: "Eye",
      },
      {
        id: "predictive-analytics",
        title: "Predictive Analytics",
        description: "Forecast trends and make data-driven decisions",
        icon: "TrendingUp",
      },
      {
        id: "automation-workflows",
        title: "Automation Workflows",
        description:
          "Streamline business processes with intelligent automation",
        icon: "Workflow",
      },
      {
        id: "ai-consulting",
        title: "AI Strategy Consulting",
        description: "Strategic guidance on AI implementation and adoption",
        icon: "Lightbulb",
      },
    ],
    benefits: [
      {
        id: "efficiency-boost",
        title: "Increased Efficiency",
        description: "Automate repetitive tasks and focus on high-value work",
        metric: "60% time savings",
      },
      {
        id: "better-decisions",
        title: "Data-Driven Decisions",
        description: "Make informed decisions based on AI-powered insights",
        metric: "40% better outcomes",
      },
      {
        id: "competitive-advantage",
        title: "Competitive Advantage",
        description: "Stay ahead with cutting-edge AI technology",
        metric: "2x faster innovation",
      },
      {
        id: "cost-reduction",
        title: "Operational Cost Reduction",
        description: "Reduce operational costs through intelligent automation",
        metric: "30% cost savings",
      },
    ],
    process: [
      {
        step: 1,
        title: "AI Opportunity Assessment",
        description:
          "Identify AI use cases and potential impact on your business",
        duration: "1-2 weeks",
      },
      {
        step: 2,
        title: "Data Analysis & Preparation",
        description:
          "Analyze existing data and prepare it for AI model training",
        duration: "2-3 weeks",
      },
      {
        step: 3,
        title: "Model Development",
        description:
          "Develop and train custom AI models for your specific needs",
        duration: "3-6 weeks",
      },
      {
        step: 4,
        title: "Integration & Testing",
        description:
          "Integrate AI models into your existing systems and workflows",
        duration: "2-4 weeks",
      },
      {
        step: 5,
        title: "Deployment & Monitoring",
        description:
          "Deploy to production with comprehensive monitoring and optimization",
        duration: "1-2 weeks",
      },
      {
        step: 6,
        title: "Training & Support",
        description: "Team training and ongoing support for AI systems",
        duration: "Ongoing",
      },
    ],
    pricing: [
      {
        tier: "Proof of Concept",
        price: "$10,000",
        description: "Validate AI potential for your use case",
        features: [
          "AI opportunity assessment",
          "Simple AI prototype",
          "Feasibility report",
          "ROI projections",
          "Implementation roadmap",
        ],
      },
      {
        tier: "Production Ready",
        price: "$35,000",
        description: "Full AI implementation for business use",
        features: [
          "Custom AI model development",
          "System integration",
          "Performance optimization",
          "Team training",
          "3 months support",
        ],
        recommended: true,
      },
      {
        tier: "Enterprise AI",
        price: "$75,000+",
        description: "Comprehensive AI transformation",
        features: [
          "Multiple AI implementations",
          "Advanced model optimization",
          "Scalable architecture",
          "Ongoing model improvement",
          "Dedicated AI consultant",
        ],
      },
    ],
    technologies: [
      { name: "Python", category: "Language" },
      { name: "TensorFlow", category: "ML Framework" },
      { name: "PyTorch", category: "ML Framework" },
      { name: "OpenAI API", category: "AI Service" },
      { name: "Hugging Face", category: "AI Platform" },
      { name: "AWS AI Services", category: "Cloud AI" },
    ],
    portfolio: [
      {
        id: "customer-service-ai",
        title: "AI Customer Service Bot",
        description: "Intelligent chatbot reducing support tickets by 70%",
        technologies: ["OpenAI", "Python", "React", "Node.js"],
        url: "/portfolio/customer-service-ai",
      },
      {
        id: "predictive-maintenance",
        title: "Predictive Maintenance System",
        description:
          "AI-powered equipment monitoring preventing costly breakdowns",
        technologies: ["TensorFlow", "Python", "IoT Sensors", "AWS"],
        url: "/portfolio/predictive-maintenance",
      },
    ],
    faqs: [
      {
        question: "What types of AI solutions do you develop?",
        answer:
          "We develop various AI solutions including chatbots, predictive analytics, computer vision systems, natural language processing, and custom machine learning models.",
      },
      {
        question: "Do I need a lot of data to implement AI?",
        answer:
          "The amount of data needed varies by use case. We can work with your existing data or help you develop a data collection strategy. Sometimes pre-trained models can be adapted with minimal data.",
      },
      {
        question: "How do you ensure AI model accuracy and reliability?",
        answer:
          "We use rigorous testing methodologies, cross-validation, and continuous monitoring to ensure high accuracy. We also implement fallback mechanisms for edge cases.",
      },
      {
        question: "Can AI be integrated with our existing systems?",
        answer:
          "Yes, we specialize in integrating AI solutions with existing business systems through APIs, webhooks, and custom integrations.",
      },
    ],
    relatedServices: ["development", "poc", "design"],
    targetAudience: [
      "Tech Companies",
      "Enterprises",
      "Healthcare",
      "Manufacturing",
    ],
    deliverables: [
      "Custom AI models",
      "Integration code",
      "API documentation",
      "Training materials",
      "Performance reports",
    ],
    tags: [
      "Machine Learning",
      "AI Integration",
      "Automation",
      "Predictive Analytics",
      "NLP",
    ],
  },
  {
    id: "poc",
    path: "/services/poc",
    title: "Proof of Concept",
    description:
      "Bring your ideas to life with rapid prototyping and validation to test concepts before full development.",
    shortDescription: "Validate ideas with rapid prototyping",
    icon: "Lightbulb",
    category: "Strategy",
    color: "#EC4899",
    gradient: "from-pink-500 to-red-500",
    estimatedDuration: "2-6 weeks",
    startingPrice: "$3,000",
    complexity: "Medium",
    features: [
      {
        id: "rapid-prototyping",
        title: "Rapid Prototyping",
        description: "Quick development of core features to test feasibility",
        icon: "Zap",
      },
      {
        id: "market-validation",
        title: "Market Validation",
        description: "Test your idea with real users and gather feedback",
        icon: "Users",
      },
      {
        id: "technical-feasibility",
        title: "Technical Feasibility Analysis",
        description: "Assess technical challenges and solutions",
        icon: "Settings",
      },
      {
        id: "mvp-roadmap",
        title: "MVP Roadmap",
        description: "Clear path from prototype to minimum viable product",
        icon: "Map",
      },
      {
        id: "investor-ready",
        title: "Investor-Ready Demos",
        description: "Compelling prototypes for funding presentations",
        icon: "PresentationChart",
      },
      {
        id: "risk-assessment",
        title: "Risk Assessment",
        description: "Identify potential challenges and mitigation strategies",
        icon: "AlertTriangle",
      },
    ],
    benefits: [
      {
        id: "reduced-risk",
        title: "Reduced Development Risk",
        description: "Validate concepts before investing in full development",
        metric: "80% risk reduction",
      },
      {
        id: "faster-validation",
        title: "Quick Market Validation",
        description: "Get market feedback in weeks, not months",
        metric: "10x faster validation",
      },
      {
        id: "cost-effective",
        title: "Cost-Effective Testing",
        description:
          "Test multiple concepts at a fraction of full development cost",
        metric: "90% cost savings",
      },
      {
        id: "investor-confidence",
        title: "Increased Investor Confidence",
        description: "Demonstrate viability with working prototypes",
        metric: "3x higher funding success",
      },
    ],
    process: [
      {
        step: 1,
        title: "Concept Analysis",
        description:
          "Deep dive into your idea, market research, and competitive analysis",
        duration: "3-5 days",
      },
      {
        step: 2,
        title: "Technical Planning",
        description:
          "Define technical approach, architecture, and feasibility assessment",
        duration: "3-5 days",
      },
      {
        step: 3,
        title: "Prototype Development",
        description: "Build core functionality and user interface",
        duration: "1-3 weeks",
      },
      {
        step: 4,
        title: "User Testing",
        description: "Test with target users and gather feedback",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Iteration & Refinement",
        description: "Improve prototype based on user feedback",
        duration: "3-5 days",
      },
      {
        step: 6,
        title: "Roadmap & Recommendations",
        description: "Provide development roadmap and next steps",
        duration: "2-3 days",
      },
    ],
    pricing: [
      {
        tier: "Concept Validation",
        price: "$3,000",
        description: "Basic prototype to test core concept",
        features: [
          "Simple interactive prototype",
          "Core feature demonstration",
          "Basic user testing",
          "Feasibility report",
          "Next steps recommendation",
        ],
      },
      {
        tier: "Market Ready",
        price: "$8,000",
        description: "Comprehensive prototype with user testing",
        features: [
          "Advanced interactive prototype",
          "Multiple user flows",
          "Comprehensive user testing",
          "Market analysis report",
          "Detailed development roadmap",
          "Investor presentation",
        ],
        recommended: true,
      },
      {
        tier: "Enterprise POC",
        price: "$15,000+",
        description: "Complex prototype with integrations",
        features: [
          "Enterprise-grade prototype",
          "System integrations",
          "Security considerations",
          "Scalability assessment",
          "Technical documentation",
          "Implementation strategy",
        ],
      },
    ],
    technologies: [
      { name: "Figma", category: "Prototyping" },
      { name: "React", category: "Frontend" },
      { name: "Next.js", category: "Framework" },
      { name: "Supabase", category: "Backend" },
      { name: "Vercel", category: "Deployment" },
      { name: "Firebase", category: "Backend" },
    ],
    portfolio: [
      {
        id: "social-commerce-poc",
        title: "Social Commerce Platform POC",
        description:
          "Prototype validating social shopping concept, led to $2M funding",
        technologies: ["React", "Firebase", "Stripe", "Social APIs"],
        url: "/portfolio/social-commerce-poc",
      },
      {
        id: "ar-furniture-poc",
        title: "AR Furniture Visualization",
        description: "Proof of concept for AR furniture placement in homes",
        technologies: ["React Native", "ARKit", "3D Models"],
        url: "/portfolio/ar-furniture-poc",
      },
    ],
    faqs: [
      {
        question: "What's the difference between a POC and MVP?",
        answer:
          "A POC proves that an idea is technically feasible and viable. An MVP is a more complete product with core features ready for real users. POCs are typically faster and less expensive to build.",
      },
      {
        question: "How detailed should my idea be before starting a POC?",
        answer:
          "You just need a basic concept. We'll help you refine and detail the idea during our discovery process. The less defined your idea, the more valuable a POC becomes.",
      },
      {
        question: "Can the POC be evolved into the final product?",
        answer:
          "While POCs are built for speed and validation rather than production quality, the learnings and some components can definitely inform and accelerate full development.",
      },
      {
        question: "Do you provide user testing as part of the POC?",
        answer:
          "Yes, user testing is crucial for validation. We can conduct testing with your target audience or help you set up testing frameworks.",
      },
    ],
    relatedServices: ["design", "development", "ai"],
    targetAudience: [
      "Entrepreneurs",
      "Startups",
      "Innovation Teams",
      "Investors",
    ],
    deliverables: [
      "Interactive prototype",
      "User testing results",
      "Feasibility report",
      "Technical recommendations",
      "Development roadmap",
    ],
    tags: ["Prototyping", "Validation", "MVP", "User Testing", "Feasibility"],
  },
  {
    id: "ngo-support",
    path: "/services/ngo-support",
    title: "NGO Support",
    description:
      "Free design, development and hosting for NGOs from SEE that don't receive foreign funding.",
    shortDescription: "Free tech support for local NGOs",
    icon: "Heart",
    category: "Community",
    color: "#DC2626",
    gradient: "from-red-500 to-pink-500",
    isNGO: true,
    estimatedDuration: "4-8 weeks",
    startingPrice: "Free",
    complexity: "Medium",
    features: [
      {
        id: "free-development",
        title: "Completely Free Development",
        description: "No cost web development for qualifying NGOs",
        icon: "Gift",
      },
      {
        id: "professional-design",
        title: "Professional Design",
        description: "High-quality design that reflects your mission",
        icon: "Palette",
      },
      {
        id: "donation-integration",
        title: "Donation Integration",
        description: "Easy-to-use donation systems and payment processing",
        icon: "CreditCard",
      },
      {
        id: "volunteer-management",
        title: "Volunteer Management",
        description: "Tools to manage volunteers and community engagement",
        icon: "Users",
      },
      {
        id: "content-management",
        title: "Easy Content Management",
        description: "Simple tools to update content and share your impact",
        icon: "Edit",
      },
      {
        id: "free-hosting",
        title: "Free Hosting & Maintenance",
        description: "Ongoing hosting and basic maintenance included",
        icon: "Server",
      },
    ],
    benefits: [
      {
        id: "increased-visibility",
        title: "Increased Online Visibility",
        description: "Professional web presence to reach more supporters",
        metric: "5x more visibility",
      },
      {
        id: "donation-growth",
        title: "Enhanced Fundraising",
        description: "Better donation tools lead to increased funding",
        metric: "200% more donations",
      },
      {
        id: "volunteer-engagement",
        title: "Better Volunteer Coordination",
        description: "Streamlined volunteer management and engagement",
        metric: "3x volunteer retention",
      },
      {
        id: "impact-communication",
        title: "Better Impact Communication",
        description: "Effectively share your mission and achievements",
        metric: "4x engagement",
      },
    ],
    process: [
      {
        step: 1,
        title: "Eligibility Verification",
        description: "Confirm NGO status and funding requirements",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Mission Understanding",
        description: "Deep dive into your organization's mission and needs",
        duration: "1 week",
      },
      {
        step: 3,
        title: "Website Planning",
        description: "Plan structure, features, and content strategy",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Design & Development",
        description: "Create beautiful, functional website",
        duration: "3-4 weeks",
      },
      {
        step: 5,
        title: "Training & Launch",
        description: "Train your team and launch the website",
        duration: "1 week",
      },
      {
        step: 6,
        title: "Ongoing Support",
        description: "Continued support and maintenance",
        duration: "Ongoing",
      },
    ],
    pricing: [
      {
        tier: "Complete NGO Package",
        price: "Free",
        description: "Everything your NGO needs online",
        features: [
          "Professional website design",
          "Donation system integration",
          "Volunteer management tools",
          "Content management system",
          "Free hosting for 2 years",
          "Basic maintenance & support",
          "SEO optimization",
          "Social media integration",
        ],
        recommended: true,
      },
    ],
    technologies: [
      { name: "WordPress", category: "CMS" },
      { name: "React", category: "Frontend" },
      { name: "Stripe", category: "Payments" },
      { name: "Mailchimp", category: "Email Marketing" },
      { name: "Google Analytics", category: "Analytics" },
      { name: "Cloudflare", category: "Hosting" },
    ],
    portfolio: [
      {
        id: "environmental-ngo",
        title: "Environmental Protection NGO",
        description:
          "Complete digital transformation increasing donations by 300%",
        technologies: ["WordPress", "Stripe", "Mailchimp"],
        url: "/portfolio/environmental-ngo",
      },
      {
        id: "education-ngo",
        title: "Children's Education Foundation",
        description: "Platform connecting donors with educational programs",
        technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
        url: "/portfolio/education-ngo",
      },
    ],
    faqs: [
      {
        question: "What are the eligibility requirements?",
        answer:
          "Your organization must be a registered NGO in Southeast Europe, focused on local community impact, and not receiving foreign institutional funding.",
      },
      {
        question: "Is this completely free with no hidden costs?",
        answer:
          "Yes, completely free including design, development, hosting, and basic maintenance for qualifying NGOs. You only pay for any premium third-party services you choose.",
      },
      {
        question: "How long does the free hosting last?",
        answer:
          "We provide free hosting for 2 years initially, with the possibility to extend based on your continued eligibility and our capacity.",
      },
      {
        question: "Can you help with ongoing updates and changes?",
        answer:
          "Yes, we provide training so you can make basic updates yourself, plus ongoing support for technical issues and major changes.",
      },
      {
        question: "Do you help with content creation?",
        answer:
          "We can provide guidance and basic content structure, but the specific content about your mission and programs should come from your organization.",
      },
    ],
    relatedServices: ["design", "development"],
    targetAudience: [
      "NGOs",
      "Non-profits",
      "Community Organizations",
      "Social Enterprises",
    ],
    deliverables: [
      "Complete NGO website",
      "Donation system setup",
      "Content management training",
      "SEO optimization",
      "2 years free hosting",
    ],
    tags: ["NGO", "Non-profit", "Community", "Free Service", "Social Impact"],
  },
];
