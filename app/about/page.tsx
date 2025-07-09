import { useLanguage } from "../contexts/language-context";




export default function AboutUsPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t('about.title', 'About Us')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('about.subtitle', 'Learn more about our team and mission')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {t('about.ourMission.title', 'Our Mission')}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('about.ourMission.content', 'We are dedicated to delivering exceptional digital experiences that help businesses grow and succeed in the digital landscape.')}
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">
            {t('about.ourTeam.title', 'Our Team')}
          </h2>
          <p className="text-muted-foreground">
            {t('about.ourTeam.content', 'Our team consists of passionate professionals who are experts in their respective fields, working together to bring your vision to life.')}
          </p>
        </div>
        
        <div className="bg-muted rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">
            {t('about.whyChooseUs', 'Why Choose Us')}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{t('about.benefits.experience', 'Years of industry experience')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{t('about.benefits.quality', 'Commitment to quality')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{t('about.benefits.support', 'Dedicated support')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{t('about.benefits.innovation', 'Innovative solutions')}</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}