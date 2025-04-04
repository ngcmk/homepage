"use client";

import Image from "next/image";
import { useLanguage } from "../contexts/language-context";

export default function Portfolio() {
  // TODO: Replace portfolio with tech stack
  const { t } = useLanguage();

  const projects = [
    {
      image: "/placeholder.svg?height=600&width=800",
      title: t("portfolio.project1.title"),
      category: t("portfolio.project1.category"),
      description: t("portfolio.project1.description"),
    },
    {
      image: "/placeholder.svg?height=600&width=800",
      title: t("portfolio.project2.title"),
      category: t("portfolio.project2.category"),
      description: t("portfolio.project2.description"),
    },
    {
      image: "/placeholder.svg?height=600&width=800",
      title: t("portfolio.project3.title"),
      category: t("portfolio.project3.category"),
      description: t("portfolio.project3.description"),
    },
  ];

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-xl">
          <h2 className="text-3xl font-bold mb-6 accent-border inline-block">
            {t("portfolio.title")}
          </h2>
          <p className="text-neutral-600">{t("portfolio.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group hover-lift bg-white rounded-lg overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-[rgb(var(--accent))] font-medium mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-neutral-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
