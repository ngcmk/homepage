"use client";

import AnimatedBackground from "../components/Hero/AnimatedBackground";
import { useLanguage } from "../contexts/language-context";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUsPage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background */}
      <AnimatedBackground className="z-0" />

      {/* Header */}
      <Header className="relative z-10" />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Title & Subtitle */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            {t("about.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Mission & Team */}
          <div className="space-y-10">
            {/* Mission */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                {t("about.ourMission.title")}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("about.ourMission.content")}
              </p>
            </section>

            {/* Team */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                {t("about.ourTeam.title")}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("about.ourTeam.content")}
              </p>
            </section>
          </div>

          {/* Right: Why Choose Us */}
          <div className="bg-muted/60 border border-border rounded-2xl p-8 shadow-md backdrop-blur-md space-y-6">
            <h3 className="text-xl font-semibold text-foreground">
              {t("about.whyChooseUs")}
            </h3>
            <ul className="space-y-4 text-base text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span>{t("about.benefits.experience")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span>{t("about.benefits.quality")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span>{t("about.benefits.support")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span>{t("about.benefits.innovation")}</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer className="relative z-10" />
    </div>
  );
}
