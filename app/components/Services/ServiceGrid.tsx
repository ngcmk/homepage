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

interface ServiceGridProps {
  services: Array<{
    icon: React.ReactNode;
    id: string;
    title: string;
    description: string;
    category: string;
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Get unique categories
  const categories = ["all", ...new Set(services.map((s) => s.category))];

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || service.category === activeCategory;
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
    <section id="services" className={`py-20 md:py-32 ${className}`}>
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
            className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6"
          >
            {/* <span className="text-primary font-semibold text-sm">
              ✨ Premium Services
            </span> */}
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
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
                    {category === "all" ? "All Services" : category}
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
                  No services found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                >
                  Clear Filters
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
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Service Categories</h3>
            <p className="text-muted-foreground">
              Explore our comprehensive range of digital solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(1).map((category, index) => {
              const categoryServices = services.filter(
                (s) => s.category === category,
              );
              const categoryColors = {
                Technical: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
                Creative:
                  "from-purple-500/20 to-pink-500/20 border-purple-500/30",
                Innovation:
                  "from-green-500/20 to-emerald-500/20 border-green-500/30",
                "Social Impact":
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
                      {category}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find exactly what you're looking for? Let's discuss your
              unique requirements and create a tailored solution for your
              business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="px-8">
                <a href="/initialize-project">Start Custom Project</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <a href="#contact">Schedule Consultation</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
