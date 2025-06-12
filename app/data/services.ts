export interface Service {
  id: string;
  path: string;
  title: string;
  description: string;
  isNGO?: boolean;
}

export const servicesData: Service[] = [
  {
    id: "ngo-support",
    path: "/services/ngo-support",
    title: "NGO Support",
    description: "Free design, development and hosting for NGOs from SEE that don't receive foreign funding",
    isNGO: true
  },
  {
    id: "design",
    path: "/services/design",
    title: "Design",
    description: "Custom UI/UX design services"
  },
  {
    id: "development",
    path: "/services/development",
    title: "Development",
    description: "Web application development"
  },
  {
    id: "mobile",
    path: "/services/mobile",
    title: "Mobile Apps",
    description: "Cross-platform mobile development"
  },
  {
    id: "poc",
    path: "/services/poc",
    title: "Proof of Concept",
    description: "Rapid prototyping and validation"
  },
  {
    id: "ai",
    path: "/services/ai",
    title: "AI Integration",
    description: "AI-powered solutions for your business"
  }
];
