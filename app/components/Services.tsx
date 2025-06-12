"use client"

import { Layout, Code, Smartphone, Rocket, BrainCircuit, HeartHandshake } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import Link from "next/link"

export default function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: <Code className="w-10 h-10" />,
      id: "development",
      title: t("services.development.title"),
      description: t("services.development.description"),
     
    },

    {
      icon: <Layout className="w-10 h-10" />,
      id: "design",
      title: t("services.design.title"),
      description: t("services.design.description"),
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      id: "mobile",
      title: t("services.mobile.title"),
      description: t("services.mobile.description"),
    },
    {
      icon: <BrainCircuit className="w-10 h-10" />,
      id: "ai",
      title: t("services.ai.title"),
      description: t("services.ai.description"),
    },
    {
      id: "poc",
      icon: <Rocket className="w-10 h-10" />,
      title: t("services.poc.title"),
      description: t("services.poc.description"),
    },
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      id: "ngo-support",
      title: t("services.ngo-support.title"),
      description: t("services.ngo-support.description"),
    },
  ]

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-xl">
          <h2 className="text-3xl font-bold mb-6 accent-border inline-block">{t("services.title")}</h2>
          <p className="text-neutral-600">{t("services.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <Link 
                key={index} 
                href={`/services/${service.id}`}
                className="group hover-lift block"
              >
                <div className="mb-6 text-neutral-900 group-hover:text-[rgb(var(--accent))] transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-neutral-600">{service.description}</p>
              </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
