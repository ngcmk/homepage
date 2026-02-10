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
  const { t, language } = useLanguage();

  // Get prices based on language
  const getPrices = () => {
    const pricingData = t("services.pricing.services") as Record<string, any>;
    
    if (language === "mk") {
      return {
        webdev: pricingData.webdev?.denari || "од 50.000 ден",
        design: pricingData.design?.denari || "од 18.000 ден",
        mobile: pricingData.mobile?.denari || "од 600.000 ден",
        ai: pricingData.ai?.denari || "од 600.000 ден",
        poc: pricingData.poc?.denari || "од 60.000 ден",
        ngo: pricingData.ngo?.denari || "Бесплатно",
      };
    } else if (language === "sr") {
      return {
        webdev: pricingData.webdev?.dinar || "od 800 din",
        design: pricingData.design?.dinar || "od 300 din",
        mobile: pricingData.mobile?.dinar || "od 10.000 din",
        ai: pricingData.ai?.dinar || "od 10.000 din",
        poc: pricingData.poc?.dinar || "od 1.000 din",
        ngo: pricingData.ngo?.dinar || "Besplatno",
      };
    } else {
      return {
        webdev: pricingData.webdev?.dollar || "From $900",
        design: pricingData.design?.dollar || "From $330",
        mobile: pricingData.mobile?.dollar || "From $11,000",
        ai: pricingData.ai?.dollar || "From $11,000",
        poc: pricingData.poc?.dollar || "From $1,100",
        ngo: pricingData.ngo?.dollar || "Free",
      };
    }
  };

  const prices = getPrices();

  const services = [
    {
      icon: <Code className="w-10 h-10" />,
      id: "development",
      title: t("services.development.title"),
      description: t("services.development.description"),
      category: t("services.categories.technical"),
      categoryKey: "technical",
      price: prices.webdev,
      duration: t("services.pricing.services.webdev.duration"),
      features: t("services.features.development") as string[],
      popularity: 5,
      isPopular: true,
    },
    {
      icon: <Layout className="w-10 h-10" />,
      id: "design",
      title: t("services.design.title"),
      description: t("services.design.description"),
      category: t("services.categories.creative"),
      categoryKey: "creative",
      price: prices.design,
      duration: t("services.pricing.services.design.duration"),
      features: t("services.features.design") as string[],
      popularity: 5,
      isPopular: true,
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      id: "mobile",
      title: t("services.mobile.title"),
      description: t("services.mobile.description"),
      category: t("services.categories.technical"),
      categoryKey: "technical",
      price: prices.mobile,
      duration: t("services.pricing.services.mobile.duration"),
      features: t("services.features.mobile") as string[],
      popularity: 4,
      isPopular: true,
    },
    {
      icon: <BrainCircuit className="w-10 h-10" />,
      id: "ai",
      title: t("services.ai.title"),
      description: t("services.ai.description"),
      category: t("services.categories.innovation"),
      categoryKey: "innovation",
      price: prices.ai,
      duration: t("services.pricing.services.ai.duration"),
      features: t("services.features.ai") as string[],
      popularity: 4,
      isNew: true,
    },
    {
      id: "poc",
      icon: <Rocket className="w-10 h-10" />,
      title: t("services.poc.title"),
      description: t("services.poc.description"),
      category: t("services.categories.innovation"),
      categoryKey: "innovation",
      price: prices.poc,
      duration: t("services.pricing.services.poc.duration"),
      features: t("services.features.poc") as string[],
      popularity: 3,
    },
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      id: "ngo-support",
      title: t("services.ngo-support.title"),
      description: t("services.ngo-support.description"),
      category: t("services.categories.social-impact"),
      categoryKey: "social-impact",
      price: prices.ngo,
      duration: t("services.pricing.services.ngo.duration"),
      features: t("services.features.ngo") as string[],
      popularity: 4,
    },
  ];

  return (
    <ServiceGrid
      services={services}
      title={t("services.pageTitle")}
      subtitle={t("services.pageDescription")}
      className="bg-gradient-to-b from-background to-muted/20"
    />
  );
}
