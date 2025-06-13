"use client";

import {
  Layout,
  Code,
  Smartphone,
  Rocket,
  BrainCircuit,
  HeartHandshake,
} from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import ServiceGrid from "./Services/ServiceGrid";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Code className="w-10 h-10" />,
      id: "development",
      title: t("services.development.title"),
      description: t("services.development.description"),
      category: "Technical",
      badge: "Core Service",
      price: "From $5,000",
      duration: "4-8 weeks",
      features: [
        "Custom web applications",
        "E-commerce platforms",
        "API development",
        "Performance optimization",
      ],
      popularity: 5,
      isPopular: true,
    },
    {
      icon: <Layout className="w-10 h-10" />,
      id: "design",
      title: t("services.design.title"),
      description: t("services.design.description"),
      category: "Creative",
      badge: "Core Service",
      price: "From $3,000",
      duration: "2-4 weeks",
      features: [
        "UI/UX design",
        "Brand identity",
        "Responsive layouts",
        "User research",
      ],
      popularity: 5,
      isPopular: true,
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      id: "mobile",
      title: t("services.mobile.title"),
      description: t("services.mobile.description"),
      category: "Technical",
      badge: "Popular",
      price: "From $8,000",
      duration: "6-12 weeks",
      features: [
        "iOS & Android apps",
        "Cross-platform development",
        "App store optimization",
        "Push notifications",
      ],
      popularity: 4,
      isPopular: true,
    },
    {
      icon: <BrainCircuit className="w-10 h-10" />,
      id: "ai",
      title: t("services.ai.title"),
      description: t("services.ai.description"),
      category: "Innovation",
      badge: "New",
      price: "From $10,000",
      duration: "8-16 weeks",
      features: [
        "AI model integration",
        "Machine learning solutions",
        "Chatbot development",
        "Data analysis",
      ],
      popularity: 4,
      isNew: true,
    },
    {
      id: "poc",
      icon: <Rocket className="w-10 h-10" />,
      title: t("services.poc.title"),
      description: t("services.poc.description"),
      category: "Innovation",
      badge: "Specialized",
      price: "From $2,500",
      duration: "1-3 weeks",
      features: [
        "Rapid prototyping",
        "MVP development",
        "Market validation",
        "Technical feasibility",
      ],
      popularity: 3,
    },
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      id: "ngo-support",
      title: t("services.ngo-support.title"),
      description: t("services.ngo-support.description"),
      category: "Social Impact",
      badge: "Pro Bono",
      price: "Free",
      duration: "Varies",
      features: [
        "Discounted rates",
        "Full-service support",
        "Long-term partnerships",
        "Impact measurement",
      ],
      popularity: 4,
    },
  ];

  return (
    <ServiceGrid
      services={services}
      title={t("services.title")}
      subtitle={t("services.subtitle")}
      className="bg-gradient-to-b from-background to-muted/20"
    />
  );
}
