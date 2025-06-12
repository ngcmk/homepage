"use client"

import { useLanguage } from "@/app/contexts/language-context"
import { notFound } from "next/navigation"
import { servicesData, Service } from "@/app/data/services"

export default function ServiceTemplate({ params }: { params: { service: string } }) {
  const { t } = useLanguage()
  const service = servicesData.find((s: Service) => s.id === params.service)
  
  if (!service) {
    return notFound()
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{t(`services.${service.id}.title`)}</h1>
          
          {/* Hero Image */}
          <div className="mb-12 rounded-xl overflow-hidden">
            <img 
              src={`https://source.unsplash.com/random/800x400/?${service.id},technology`}
              alt={t(`services.${service.id}.title`)}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Service Overview */}
          <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('serviceTemplate.overview')}</h2>
            <p className="text-neutral-600 mb-4">
              {t(`services.${service.id}.description`)}
            </p>
            <p className="text-neutral-600">
              {t('serviceTemplate.comprehensiveSolutions', { service: t(`services.${service.id}.title`) })}
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{t('serviceTemplate.keyFeatures')}</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• {t('serviceTemplate.customSolutions')}</li>
                <li>• {t('serviceTemplate.industryExpertise')}</li>
                <li>• {t('serviceTemplate.seamlessIntegration')}</li>
                <li>• {t('serviceTemplate.ongoingSupport')}</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <img 
                src={`https://source.unsplash.com/random/400x300/?${service.id},process`}
                alt={`${t(`services.${service.id}.title`)} process`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">{t('serviceTemplate.businessBenefits')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">{t('serviceTemplate.increasedEfficiency')}</h3>
                <p className="text-neutral-600">
                  {t('serviceTemplate.efficiencyDescription', { service: t(`services.${service.id}.title`) })}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{t('serviceTemplate.competitiveAdvantage')}</h3>
                <p className="text-neutral-600">
                  {t('serviceTemplate.advantageDescription', { service: t(`services.${service.id}.title`) })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
