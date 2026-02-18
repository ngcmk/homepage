"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard, { ServiceCardCompact } from "./ServiceCard";
import { Filter, Grid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "../../contexts/language-context";

interface ServiceGridProps {
  services: Array<{
    icon: React.ReactNode;
    id: string;
    title: string;
    description: string;
    category: string;
    categoryKey?: string;
    // badge?: string;
    price?: string;
    duration?: string;
    features?: string[];
    popularity?: number;
    isNew?: boolean;
    isPopular?: boolean;
  }>;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function ServiceGrid({
  services,
  title = "Our Services",
  subtitle = "Comprehensive solutions for your digital needs",
  className = "",
}: ServiceGridProps) {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Get unique categories
  const categories = ["all", ...new Set(services.map((s) => s.categoryKey || "other"))];

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || (service.categoryKey || "other") === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className={`py-8 md:py-12 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
          </motion.div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            {/* <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/80 backdrop-blur-sm"
              />
            </div> */}

            {/* View Toggle */}
            {/* <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "compact" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("compact")}
                className="px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div> */}
          </div>

          {/* Category Filters */}
          <div className="mt-6">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-muted/50">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-sm capitalize"
                  >
                    {category === "all"
                      ? t("services.categories.all")
                      : category === "technical"
                      ? t("services.categories.technical")
                      : category === "creative"
                      ? t("services.categories.creative")
                      : category === "innovation"
                      ? t("services.categories.innovation")
                      : category === "social-impact"
                      ? t("services.categories.social-impact")
                      : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* Results Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {/* <p className="text-sm text-muted-foreground">
              Showing {filteredServices.length} of {services.length} services
              {searchTerm && ` for "${searchTerm}"`}
              {activeCategory !== "all" && ` in ${activeCategory}`}
            </p> */}
            {/* <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <Filter className="w-3 h-3 mr-1" />
                {activeCategory === "all" ? "All" : activeCategory}
              </Badge>
            </div> */}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-4"
          }
        >
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <motion.div key={service.id} variants={itemVariants}>
                {viewMode === "grid" ? (
                  <ServiceCard
                    service={service}
                    index={index}
                    className="h-full"
                  />
                ) : (
                  <ServiceCardCompact service={service} index={index} />
                )}
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("services.noResults.title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("services.noResults.description")}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                >
                  {t("services.noResults.clearButton")}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Service Categories Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(1).map((category, index) => {
              const categoryServices = services.filter(
                (s) => (s.categoryKey || "other") === category,
              );
              const categoryColors = {
                technical: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
                creative:
                  "from-purple-500/20 to-pink-500/20 border-purple-500/30",
                innovation:
                  "from-green-500/20 to-emerald-500/20 border-green-500/30",
                "social-impact":
                  "from-orange-500/20 to-red-500/20 border-orange-500/30",
              };

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`
                    p-4 rounded-lg border bg-gradient-to-br cursor-pointer
                    transition-all duration-300 hover:shadow-lg
                    ${categoryColors[category as keyof typeof categoryColors] || "from-gray-500/20 to-gray-600/20 border-gray-500/30"}
                  `}
                  onClick={() => setActiveCategory(category)}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {categoryServices.length}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {(() => {
                        const categoryMap: { [key: string]: string } = {
                          technical: t("services.categories.technical"),
                          creative: t("services.categories.creative"),
                          innovation: t("services.categories.innovation"),
                          "social-impact": t("services.categories.social-impact"),
                        };
                        return categoryMap[category] || category;
                      })()}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
