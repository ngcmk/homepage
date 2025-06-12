"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "../contexts/language-context";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="md:pt-10 md:pb-32">
      <div className="container mx-auto px-6 md:flex items-center min-h-screen">
        <Card className="max-w-3xl mx-auto p-6 md:p-8 text-center bg-background/50 backdrop-blur-sm">
          <CardContent className="mt-32">
            <h1 className="text-4xl gradient-text md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
              <span className="">{t("hero.title")}</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/initialize-project">
                <Button size="lg" variant="default" className="px-8">
                  {t("hero.startProject")}
                </Button>
              </Link>
              <Link href="#portfolio">
                <Button size="lg" variant="outline" className="px-8">
                  {t("hero.viewWork")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
