"use client";

import { useLanguage } from "../contexts/language-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Users } from "lucide-react";

export default function Portfolio() {
  // TODO: Replace portfolio with tech stack
  const { t } = useLanguage();

  const projects = [
    {
      title: t("portfolio.project1.title"),
      category: t("portfolio.project1.category"),
      description: t("portfolio.project1.description"),
      type: "web",
      technologies: ["React", "Next.js", "TypeScript"],
      fullDescription:
        "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, payment processing, inventory management, and real-time analytics.",
      duration: "3 months",
      teamSize: "4 developers",
      url: "https://example-project1.com",
      features: [
        "Responsive Design",
        "Payment Integration",
        "Admin Dashboard",
        "SEO Optimized",
      ],
    },
    {
      title: t("portfolio.project2.title"),
      category: t("portfolio.project2.category"),
      description: t("portfolio.project2.description"),
      type: "mobile",
      technologies: ["React Native", "Expo", "Firebase"],
      fullDescription:
        "A cross-platform mobile application for fitness tracking and social networking. Includes workout planning, progress tracking, and community features.",
      duration: "4 months",
      teamSize: "3 developers",
      url: "https://example-project2.com",
      features: [
        "Cross-platform",
        "Offline Support",
        "Push Notifications",
        "Social Features",
      ],
    },
    {
      title: t("portfolio.project3.title"),
      category: t("portfolio.project3.category"),
      description: t("portfolio.project3.description"),
      type: "design",
      technologies: ["Figma", "Adobe XD", "Sketch"],
      fullDescription:
        "Complete brand identity and UI/UX design for a fintech startup. Includes logo design, brand guidelines, and user interface design for web and mobile platforms.",
      duration: "2 months",
      teamSize: "2 designers",
      url: "https://example-project3.com",
      features: [
        "Brand Identity",
        "UI/UX Design",
        "Design System",
        "Prototyping",
      ],
    },
  ];

  const projectTypes = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web Development" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "design", label: "UI/UX Design" },
  ];

  const getFilteredProjects = (type: string) => {
    if (type === "all") return projects;
    return projects.filter((project) => project.type === type);
  };

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-xl">
          <h2 className="text-3xl font-bold mb-6 accent-border inline-block">
            {t("portfolio.title")}
          </h2>
          <p className="text-neutral-600">{t("portfolio.subtitle")}</p>
        </div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {projectTypes.map((type) => (
              <TabsTrigger key={type.value} value={type.value}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {projectTypes.map((type) => (
            <TabsContent key={type.value} value={type.value}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredProjects(type.value).map((project, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="group hover-lift bg-white rounded-lg overflow-hidden cursor-pointer">
                        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-primary/30 text-6xl font-bold">
                              {project.type.charAt(0).toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-sm text-[rgb(var(--accent))] font-medium">
                              {project.category}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {project.type}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-[rgb(var(--accent))] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-neutral-600 mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          {project.title}
                        </DialogTitle>
                        <DialogDescription className="text-base">
                          {project.category} • {project.type}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 h-48 rounded-lg flex items-center justify-center">
                          <div className="text-primary/30 text-8xl font-bold">
                            {project.type.charAt(0).toUpperCase()}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">
                            Project Overview
                          </h4>
                          <p className="text-neutral-600">
                            {project.fullDescription}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              Duration: {project.duration}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              Team: {project.teamSize}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Key Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.features.map((feature, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                          <Button variant="outline" asChild>
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>View Project</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
