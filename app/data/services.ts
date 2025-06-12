export interface Service {
  id: string;
  path: string;
}

export const servicesData: Service[] = [
  {
    id: "design",
    path: "/services/design"
  },
  {
    id: "development",
    path: "/services/development"
  },
  {
    id: "mobile",
    path: "/services/mobile"
  },
  {
    id: "poc",
    path: "/services/poc"
  },
  {
    id: "ai",
    path: "/services/ai"
  }
];
