"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Users, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface ServiceCardProps {
  service: {
    icon: ReactNode;
    id: string;
    title: string;
    description: string;
    category: string;
    // badge: string;
    price?: string;
    duration?: string;
    features?: string[];
    popularity?: number;
    isNew?: boolean;
    isPopular?: boolean;
  };
  index: number;
  className?: string;
}

export default function ServiceCard({
  service,
  index,
  className = "",
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // const getBadgeVariant = () => {
  //   if (service.badge === "New") return "default";
  //   if (service.badge === "Popular") return "destructive";
  //   return "secondary";
  // };

  const getIconColor = () => {
    switch (service.category) {
      case "Technical":
        return "text-blue-500 group-hover:text-blue-400";
      case "Creative":
        return "text-purple-500 group-hover:text-purple-400";
      case "Innovation":
        return "text-green-500 group-hover:text-green-400";
      case "Social Impact":
        return "text-orange-500 group-hover:text-orange-400";
      default:
        return "text-primary group-hover:text-primary/80";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group ${className}`}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full"
      >
        {/* Main Card */}
        <Card className="relative h-full overflow-hidden border-2 border-border/50 group-hover:border-primary/30 transition-all duration-500 bg-card/80 backdrop-blur-sm">
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg,
                ${service.category === "Technical" ? "#3B82F6" : ""}
                ${service.category === "Creative" ? "#8B5CF6" : ""}
                ${service.category === "Innovation" ? "#10B981" : ""}
                ${service.category === "Social Impact" ? "#F59E0B" : ""}
                20%, transparent 80%)`,
            }}
          />

          {/* Floating Badge */}
          <motion.div
            className="absolute top-4 right-4 z-10"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* <Badge
              variant={getBadgeVariant()}
              className="text-xs font-semibold shadow-lg"
            >
              {service.badge}
            </Badge> */}
          </motion.div>

          {/* Popularity Stars */}
          {/* {service.popularity && (
            <div className="absolute top-4 left-4 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < service.popularity!
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          )} */}

          <CardContent className="p-6 h-full flex flex-col relative z-10">
            {/* Icon Section */}
            <div className="mb-6 flex items-center justify-between">
              <div
                className={`${getIconColor()} transition-colors duration-300 transform group-hover:scale-110`}
              >
                {service.icon}
              </div>

              {/* Quick Stats */}
              <div className="flex flex-col items-end space-y-1">
                {service.duration && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {service.duration}
                  </div>
                )}
                {service.price && (
                  <div className="text-sm font-semibold text-primary">
                    {service.price}
                  </div>
                )}
              </div>
            </div>

            {/* Category Badge */}
            <div className="mb-4">
              <Badge variant="outline" className="text-xs">
                {service.category}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>

            {/* Separator */}
            <Separator className="mb-4 group-hover:bg-primary/30 transition-colors duration-300" />

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
              {service.description}
            </p>

            {/* Features List */}
            {service.features && (
              <div className="mb-6">
                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            {/* <div className="flex flex-col space-y-2 mt-auto">
              <Button
                asChild
                className="w-full group/btn bg-primary/90 hover:bg-primary transition-all duration-300 transform hover:scale-105"
              >
                <Link href={`/services/${service.id}`}>
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full text-xs hover:bg-primary/5"
              >
                <Link href={`/initialize-project?service=${service.id}`}>
                  <Zap className="w-3 h-3 mr-1" />
                  Quick Start
                </Link>
              </Button>
            </div> */}
            <div className="mx-auto">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs hover:bg-primary/50"
              >
                <Link href={`/initialize-project`}>
                  {/* <Zap className="w-3 h-3 mr-1" /> */}
                  <p>Quick Start</p>
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            {/* {service.popularity && service.popularity > 3 && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Users className="w-3 h-3 mr-1" />
                  <span>Chosen by 50+ clients</span>
                </div>
              </div>
            )} */}
          </CardContent>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%,
                ${service.category === "Technical" ? "#3B82F6" : ""}
                ${service.category === "Creative" ? "#8B5CF6" : ""}
                ${service.category === "Innovation" ? "#10B981" : ""}
                ${service.category === "Social Impact" ? "#F59E0B" : ""}
                0%, transparent 70%)`,
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
          />

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
              transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
            }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Variant for compact service preview
export function ServiceCardCompact({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group cursor-pointer"
    >
      <Card className="p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className={`${getIconColor()} transition-colors duration-300`}>
            {service.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-sm">{service.title}</h4>
              {/* <Badge variant="outline" className="text-xs">
                {service.badge}
              </Badge> */}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {service.description}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
        </div>
      </Card>
    </motion.div>
  );
}

function getIconColor() {
  return "text-primary group-hover:text-primary/80";
}
