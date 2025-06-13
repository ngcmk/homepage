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
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
    },

    {
      icon: <Layout className="w-10 h-10" />,
      id: "design",
      title: t("services.design.title"),
      description: t("services.design.description"),
      category: "Creative",
      badge: "Core Service",
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      id: "mobile",
      title: t("services.mobile.title"),
      description: t("services.mobile.description"),
      category: "Technical",
      badge: "Popular",
    },
    {
      icon: <BrainCircuit className="w-10 h-10" />,
      id: "ai",
      title: t("services.ai.title"),
      description: t("services.ai.description"),
      category: "Innovation",
      badge: "New",
    },
    {
      id: "poc",
      icon: <Rocket className="w-10 h-10" />,
      title: t("services.poc.title"),
      description: t("services.poc.description"),
      category: "Innovation",
      badge: "Specialized",
    },
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      id: "ngo-support",
      title: t("services.ngo-support.title"),
      description: t("services.ngo-support.description"),
      category: "Social Impact",
      badge: "Pro Bono",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-xl">
          <h2 className="text-3xl font-bold mb-6 accent-border inline-block">
            {t("services.title")}
          </h2>
          <p className="text-neutral-600">{t("services.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.id}`}
              className="group hover-lift block"
            >
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-neutral-900 group-hover:text-[rgb(var(--accent))] transition-colors">
                    {service.icon}
                  </div>
                  <Badge
                    variant={service.badge === "New" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {service.badge}
                  </Badge>
                </div>

                <Badge variant="outline" className="mb-3 text-xs">
                  {service.category}
                </Badge>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-[rgb(var(--accent))] transition-colors">
                  {service.title}
                </h3>

                <Separator className="mb-3" />

                <p className="text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
