"use client";

import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import PageBreadcrumb from "../../components/Breadcrumb";
import {
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Award,
  Code,
  Palette,
  Smartphone,
  Brain,
  Lightbulb,
  Heart,
  ChevronRight,
  Play,
  Download,
  ExternalLink,
  MessageSquare,
  Calendar,
  Target,
  BarChart,
  Settings,
} from "lucide-react";

interface ServiceTemplateProps {
  params: { service: string };
}

const iconMap: Record<string, React.ComponentType<any>> = {
  CheckCircle,
  Users,
  Zap,
  Shield,
  Code,
  Palette,
  Smartphone,
  Brain,
  Lightbulb,
  Heart,
  TrendingUp,
  Award,
  Settings,
  Target,
  BarChart,
  MessageSquare,
  ExternalLink,
  Download,
  Clock,
  DollarSign,
  Star,
};

const getIcon = (iconName?: string) => {
  if (!iconName) return CheckCircle;
  return iconMap[iconName] || CheckCircle;
};

export default function ServiceTemplate({ params }: ServiceTemplateProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const service: Service | undefined = servicesData.find(
    (s: Service) => s.id === params.service,
  );

  if (!service) {
    return notFound();
  }

  const serviceTitle = service.title;
  const serviceDescription = service.description;

  return (
    <main className="pt-4 pb-12 md:pb-20">
      <PageBreadcrumb />

      {/* Hero Section */}
      <div
        className={`bg-gradient-to-br ${service.gradient} text-white pt-12 pb-16`}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                {React.createElement(getIcon(service.icon), {
                  className: "w-10 h-10 text-white",
                })}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {serviceTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              {serviceDescription}
            </p>

            {/* Service Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {service.startingPrice}
                </div>
                <div className="text-white/80 text-sm">Starting Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {service.estimatedDuration}
                </div>
                <div className="text-white/80 text-sm">Timeline</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{service.complexity}</div>
                <div className="text-white/80 text-sm">Complexity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{service.category}</div>
                <div className="text-white/80 text-sm">Category</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 font-semibold px-8"
              >
                <Link href="/initialize-project">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold px-8"
              >
                <Link href="#pricing">
                  View Pricing
                  <DollarSign className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-12"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-12">
              {/* Service Benefits */}
              <section>
                <h2 className="text-3xl font-bold text-center mb-8">
                  Why Choose Our {serviceTitle}?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {service.benefits.map((benefit) => (
                    <Card
                      key={benefit.id}
                      className="text-center hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        {benefit.metric && (
                          <div className="text-2xl font-bold text-primary mb-2">
                            {benefit.metric}
                          </div>
                        )}
                        <p className="text-muted-foreground text-sm">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Target Audience */}
              <section className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Perfect For
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {service.targetAudience.map((audience, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm py-2 px-4"
                    >
                      {audience}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Technologies */}
              <section>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Technologies We Use
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {service.technologies.map((tech, index) => (
                    <Card
                      key={index}
                      className="text-center p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="font-medium text-sm">{tech.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {tech.category}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Deliverables */}
              <section>
                <h2 className="text-2xl font-bold mb-6">What You'll Receive</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>
              </section>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Service Features</h2>
                <p className="text-muted-foreground">
                  Comprehensive features designed to meet your specific needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.features.map((feature) => {
                  const IconComponent = getIcon(feature.icon);
                  return (
                    <Card
                      key={feature.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Process Tab */}
            <TabsContent value="process" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Our Process</h2>
                <p className="text-muted-foreground">
                  A proven methodology that ensures successful project delivery
                </p>
              </div>

              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <Card key={step.step} className="relative overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold">
                              {step.title}
                            </h3>
                            {step.duration && (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <Clock className="w-3 h-3" />
                                {step.duration}
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    {index < service.process.length - 1 && (
                      <div className="absolute left-11 top-[72px] w-0.5 h-6 bg-primary/20"></div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-8" id="pricing">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
                <p className="text-muted-foreground">
                  Choose the package that best fits your needs and budget
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.pricing.map((tier) => (
                  <Card
                    key={tier.tier}
                    className={`relative ${tier.recommended ? "ring-2 ring-primary shadow-lg scale-105" : ""}`}
                  >
                    {tier.recommended && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Badge className="bg-primary text-white">
                          Recommended
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl">{tier.tier}</CardTitle>
                      <div className="text-3xl font-bold text-primary mt-2">
                        {tier.price}
                      </div>
                      <CardDescription className="mt-2">
                        {tier.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        asChild
                        className={`w-full ${tier.recommended ? "bg-primary" : ""}`}
                        variant={tier.recommended ? "default" : "outline"}
                      >
                        <Link href="/initialize-project">
                          Get Started
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Custom Pricing Note */}
              <div className="text-center">
                <Card className="bg-blue-50 border-blue-200 max-w-2xl mx-auto">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">
                      Need a Custom Solution?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Every project is unique. Contact us for a personalized
                      quote based on your specific requirements.
                    </p>
                    <Button asChild variant="outline">
                      <Link href="/#contact">
                        Get Custom Quote
                        <MessageSquare className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Our Work</h2>
                <p className="text-muted-foreground">
                  See how we've helped other businesses succeed with{" "}
                  {serviceTitle.toLowerCase()}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.portfolio.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-gray-400">
                        {/* Placeholder for project image */}
                        <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                          <ExternalLink className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      {item.url && (
                        <Button asChild variant="outline" size="sm">
                          <Link href={item.url}>
                            View Case Study
                            <ExternalLink className="ml-2 w-3 h-3" />
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {service.portfolio.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Portfolio Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're working on showcasing our latest{" "}
                    {serviceTitle.toLowerCase()} projects.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground">
                  Everything you need to know about our{" "}
                  {serviceTitle.toLowerCase()} service
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Still have questions */}
              <div className="text-center">
                <Card className="bg-gray-50 max-w-xl mx-auto">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">
                      Still Have Questions?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We're here to help! Get in touch with our team for
                      personalized answers.
                    </p>
                    <Button asChild>
                      <Link href="/#contact">
                        Contact Us
                        <MessageSquare className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Services */}
          {service.relatedServices.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-8 text-center">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.relatedServices.map((relatedId) => {
                  const relatedService = servicesData.find(
                    (s) => s.id === relatedId,
                  );
                  if (!relatedService) return null;

                  return (
                    <Card
                      key={relatedId}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${relatedService.gradient} flex items-center justify-center`}
                          >
                            {React.createElement(getIcon(relatedService.icon), {
                              className: "w-5 h-5 text-white",
                            })}
                          </div>
                          <CardTitle className="text-lg">
                            {relatedService.title}
                          </CardTitle>
                        </div>
                        <CardDescription>
                          {relatedService.shortDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-muted-foreground">
                            Starting at
                          </span>
                          <span className="font-semibold">
                            {relatedService.startingPrice}
                          </span>
                        </div>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={relatedService.path}>
                            Learn More
                            <ChevronRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {/* Final CTA */}
          <section className="mt-16">
            <Card
              className={`bg-gradient-to-br ${service.gradient} text-white border-0`}
            >
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Let's discuss how our {serviceTitle.toLowerCase()} services
                  can help transform your business and achieve your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-white/90 font-semibold px-8"
                  >
                    <Link href="/initialize-project">
                      Start Your Project
                      <Zap className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 font-semibold px-8"
                  >
                    <Link href="/#contact">
                      Schedule Consultation
                      <Calendar className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
