"use client";

import { useLanguage } from "@/app/contexts/language-context";
import { notFound } from "next/navigation";
import { servicesData, Service } from "@/app/data/services";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

interface ServiceTemplateProps {
  params: { service: string };
}

interface FeatureListProps {
  features: string[];
}

interface BenefitCardProps {
  title: string;
  description: string;
}

const FeatureList: React.FC<FeatureListProps> = ({ features }) => (
  <ul className="space-y-3 text-muted-foreground">
    {features.map((feature, index) => (
      <li key={index} className="flex items-start gap-2">
        <span className="text-primary font-semibold mt-1">•</span>
        <span>{feature}</span>
      </li>
    ))}
  </ul>
);

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

export default function ServiceTemplate({ params }: ServiceTemplateProps) {
  const { t } = useLanguage();
  const service: Service | undefined = servicesData.find(
    (s: Service) => s.id === params.service,
  );

  if (!service) {
    return notFound();
  }

  const serviceTitle = t(`services.${service.id}.title`);
  const serviceDescription = t(`services.${service.id}.description`);

  const keyFeatures = [
    t("serviceTemplate.customSolutions"),
    t("serviceTemplate.industryExpertise"),
    t("serviceTemplate.seamlessIntegration"),
    t("serviceTemplate.ongoingSupport"),
  ];

  return (
    <main className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <header className="text-center md:text-left space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {serviceTitle}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {serviceDescription}
            </p>
          </header>

          {/* Service Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {t("serviceTemplate.overview")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {serviceDescription}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("serviceTemplate.comprehensiveSolutions", {
                  service: serviceTitle,
                })}
              </p>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {t("serviceTemplate.keyFeatures")}
              </CardTitle>
              <CardDescription>
                What sets our {serviceTitle.toLowerCase()} services apart
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FeatureList features={keyFeatures} />
            </CardContent>
          </Card>

          {/* Business Benefits */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {t("serviceTemplate.businessBenefits")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitCard
                title={t("serviceTemplate.increasedEfficiency")}
                description={t("serviceTemplate.efficiencyDescription", {
                  service: serviceTitle,
                })}
              />
              <BenefitCard
                title={t("serviceTemplate.competitiveAdvantage")}
                description={t("serviceTemplate.advantageDescription", {
                  service: serviceTitle,
                })}
              />
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to get started?</CardTitle>
              <CardDescription className="text-base max-w-2xl mx-auto">
                Let's discuss how our {serviceTitle.toLowerCase()} services can
                help transform your business.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/initialize-project"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
