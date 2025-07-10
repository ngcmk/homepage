"use client";

import { useLanguage } from "../contexts/language-context";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t('about.title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {t('about.ourMission.title')}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('about.ourMission.content')}
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">
            {t('about.ourTeam.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('about.ourTeam.content')}
          </p>
        </div>
        
        {/* <div className="bg-muted rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">
            {t('about.whyChooseUs')}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{t('about.benefits.experience')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{t('about.benefits.quality')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{t('about.benefits.support')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{t('about.benefits.innovation')}</span>
            </li>
          </ul>
        </div> */}
      </div>
      </main>
      <Footer />
    </div>
  );
}