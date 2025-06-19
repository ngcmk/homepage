"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "../data/services";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageBreadcrumb from "../components/Breadcrumb";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Filter,
  Grid,
  List,
  Search,
  Star,
  TrendingUp,
  Users,
  Zap,
  Code,
  Palette,
  Smartphone,
  Brain,
  Lightbulb,
  Heart,
  ChevronRight,
  Award,
  Target,
  Shield,
  Rocket,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "../contexts/language-context";

const iconMap: Record<string, React.ComponentType<any>> = {
  Code,
  Palette,
  Smartphone,
  Brain,
  Lightbulb,
  Heart,
  CheckCircle,
};

const getIcon = (iconName?: string) => {
  if (!iconName) return CheckCircle;
  return iconMap[iconName] || CheckCircle;
};

export default function ServicesPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Filter services based on search and category
  const filteredServices = servicesData.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || service.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(servicesData.map(s => s.category.toLowerCase())))];

  const stats = [
    { label: t('services.stats.servicesOffered'), value: "6+", icon: Target },
    { label: t('services.stats.projectsCompleted'), value: "100+", icon: CheckCircle },
    { label: t('services.stats.clientSatisfaction'), value: "98%", icon: Star },
    { label: t('services.stats.yearsExperience'), value: "5+", icon: Award },
  ];

  return (
    <main className="pt-4 pb-12 md:pb-20">
      <PageBreadcrumb />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              {t('services.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {t('services.subtitle')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t('services.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t('services.allCategories')} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? t('services.allCategories') : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  aria-label={t('services.viewModes.grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  aria-label={t('services.viewModes.list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-gray-600">
              {t('services.resultsCount', { 
                count: filteredServices.length.toString(), 
                total: servicesData.length.toString() 
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => {
                  const IconComponent = getIcon(service.icon);
                  return (
                    <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                      {/* Service Header with Gradient */}
                      <div className={`bg-gradient-to-br ${service.gradient} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <Badge variant="secondary" className="bg-white/20 text-white border-0">
                              {service.category}
                            </Badge>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-white/90 text-sm">{service.shortDescription}</p>
                      </div>

                      <CardContent className="p-6">
                        <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                        {/* Service Details */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-gray-500">
                              <DollarSign className="w-4 h-4" />
                              <span>{t('services.serviceCard.startingAt')}</span>
                            </div>
                            <span className="font-semibold">{service.startingPrice}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{t('services.serviceCard.timeline')}</span>
                            </div>
                            <span className="font-semibold">{service.estimatedDuration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-gray-500">
                              <TrendingUp className="w-4 h-4" />
                              <span>{t('services.serviceCard.complexity')}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {service.complexity}
                            </Badge>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {service.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{service.tags.length - 3} more
                            </Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button asChild className="flex-1">
                            <Link href={service.path}>
                              {t('services.serviceCard.learnMore')}
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="icon" aria-label="Start Project">
                            <Link href="/initialize-project">
                              <Rocket className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>

                        {/* Special Badges */}
                        {service.isNGO && (
                          <div className="mt-3">
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              <Heart className="w-3 h-3 mr-1" />
                              {t('services.serviceCard.freeForNGOs')}
                            </Badge>
                          </div>
                        )}
                        {service.isPremium && (
                          <div className="mt-3">
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                              <Star className="w-3 h-3 mr-1" />
                              {t('services.serviceCard.premiumService')}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-6">
                {filteredServices.map((service) => {
                  const IconComponent = getIcon(service.icon);
                  return (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Left Side - Icon and Basic Info */}
                          <div className="flex-shrink-0">
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                          </div>

                          {/* Middle - Content */}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                              <div>
                                <h3 className="text-xl font-bold">{service.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">{service.shortDescription}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{service.category}</Badge>
                                {service.isNGO && (
                                  <Badge className="bg-red-100 text-red-800 border-red-200">
                                    <Heart className="w-3 h-3 mr-1" />
                                    {t('services.serviceCard.freeForNGOs')}
                                  </Badge>
                                )}
                                {service.isPremium && (
                                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                                    <Star className="w-3 h-3 mr-1" />
                                    {t('services.serviceCard.premiumService')}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <p className="text-gray-600 mb-4">{service.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="space-y-1">
                                <div className="text-sm text-gray-500">{t('services.serviceCard.startingAt')}</div>
                                <div className="font-medium">{service.startingPrice}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-sm text-gray-500">{t('services.serviceCard.timeline')}</div>
                                <div className="font-medium">{service.estimatedDuration}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-sm text-gray-500">{t('services.serviceCard.complexity')}</div>
                                <div>
                                  <Badge variant="outline" className="text-xs">
                                    {service.complexity}
                                  </Badge>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-sm text-gray-500">{t('serviceTemplate.category')}</div>
                                <div className="font-medium">{service.category}</div>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {service.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                              <Button asChild variant="outline" className="flex-1">
                                <Link href={service.path}>
                                  {t('services.serviceCard.learnMore')}
                                  <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                              </Button>
                              <Button asChild>
                                <Link href="/initialize-project">
                                  {t('serviceTemplate.cta.startProject')}
                                  <Rocket className="ml-2 w-4 h-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('services.whyChooseUs.title')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t('services.whyChooseUs.description')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t('services.whyChooseUs.expertTeam.title')}</h3>
                  <p className="text-gray-600">{t('services.whyChooseUs.expertTeam.description')}</p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t('services.whyChooseUs.fastDelivery.title')}</h3>
                  <p className="text-gray-600">{t('services.whyChooseUs.fastDelivery.description')}</p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t('services.whyChooseUs.ongoingSupport.title')}</h3>
                  <p className="text-gray-600">{t('services.whyChooseUs.ongoingSupport.description')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">{t('services.cta.title')}</h2>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">{t('services.cta.description')}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-white/90 font-semibold px-8"
                  >
                    <Link href="/initialize-project">
                      {t('services.cta.startProject')}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 font-semibold px-8"
                  >
                    <Link href="/#contact">
                      {t('services.cta.getFreeConsultation')}
                      <Users className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
