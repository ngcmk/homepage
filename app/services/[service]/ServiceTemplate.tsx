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
            <h2 className="text-2xl font-semibold mb-4">Service Overview</h2>
            <p className="text-neutral-600 mb-4">
              {t(`services.${service.id}.description`)}
            </p>
            <p className="text-neutral-600">
              Our comprehensive {t(`services.${service.id}.title`)} solutions are tailored to meet your specific business needs, delivering measurable results and exceptional value.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Customized solutions for your requirements</li>
                <li>• Industry-leading expertise and best practices</li>
                <li>• Seamless integration with existing systems</li>
                <li>• Ongoing support and maintenance</li>
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
            <h2 className="text-2xl font-semibold mb-4">Business Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Increased Efficiency</h3>
                <p className="text-neutral-600">
                  Streamline your operations and reduce costs through our optimized {t(`services.${service.id}.title`)} solutions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Competitive Advantage</h3>
                <p className="text-neutral-600">
                  Gain an edge over competitors with innovative {t(`services.${service.id}.title`)} implementations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
