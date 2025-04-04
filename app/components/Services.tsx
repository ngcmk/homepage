"use client"

import { Layout, Code, Smartphone } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

export default function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: <Layout className="w-10 h-10" />,
      title: t("services.design.title"),
      description: t("services.design.description"),
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: t("services.development.title"),
      description: t("services.development.description"),
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: t("services.mobile.title"),
      description: t("services.mobile.description"),
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
            <div key={index} className="group hover-lift">
              <div className="mb-6 text-neutral-900 group-hover:text-[rgb(var(--accent))] transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-neutral-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

