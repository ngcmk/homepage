"use client";

import { Quote } from "lucide-react";
import { useLanguage } from "../contexts/language-context";

export default function Testimonials() {
  // TODO: Replace or remove testimonial
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t("testimonials.client1.name"),
      role: t("testimonials.client1.role"),
      content: t("testimonials.client1.quote"),
    },
    {
      name: t("testimonials.client2.name"),
      role: t("testimonials.client2.role"),
      content: t("testimonials.client2.quote"),
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-xl">
          <h2 className="text-3xl font-bold mb-6 accent-border inline-block">
            {t("testimonials.title")}
          </h2>
          <p className="text-neutral-600">{t("testimonials.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative">
              <Quote className="absolute -top-6 -left-6 w-12 h-12 text-neutral-200" />
              <div className="bg-white p-8 rounded-lg shadow-sm relative z-10">
                <p className="text-neutral-600 mb-6 relative z-10">
                  {testimonial.content}
                </p>
                <div className="flex items-center">
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-neutral-500 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
