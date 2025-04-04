"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/language-context";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="md:pt-10 md:pb-32">
      <div className="container mx-auto px-6 md: flex items-center min-h-screen">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">{t("hero.title")}</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-neutral-600 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/initialize-project">
              <Button
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8"
              >
                {t("hero.startProject")}
              </Button>
            </Link>
            <Link href="#portfolio">
              <Button
                variant="outline"
                size="lg"
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-100 px-8"
              >
                {t("hero.viewWork")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50 to-transparent -z-10"></div>
    </section>
  );
}
