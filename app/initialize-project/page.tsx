"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/app/contexts/language-context";
import PageBreadcrumb from "../components/Breadcrumb";
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Rocket,
  Upload,
  X,
  File,
} from "lucide-react";

// Validation schema
const projectFormSchema = z.object({
  name: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 2 && val.length <= 100),
      "Project name must be between 2-100 characters if provided",
    ),
  description: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 10 && val.length <= 1000),
      "Description must be between 10-1000 characters if provided",
    ),
  type: z.string().optional(),
  urgency: z.string().optional(),
  industry: z.string().optional(),
  targetAudience: z.string().optional(),
  existingWebsite: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+/.test(val),
      "Please enter a valid URL starting with http:// or https://",
    ),
  goals: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  hasContent: z.string().optional(),
  designPreferences: z.string().optional(),
  contactName: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 2 && val.length <= 100),
      "Contact name must be between 2-100 characters if provided",
    ),
  contactEmail: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Please enter a valid email address if provided",
    ),
  contactPhone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val),
      "Please enter a valid phone number",
    ),
  company: z.string().optional(),
  preferredContact: z.string().optional(),
  additionalInfo: z.string().optional(),
  projectFiles: z.array(z.any()).optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export default function InitializeProject() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [hasAutoSaved, setHasAutoSaved] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const { t } = useLanguage();

  // Auto-save key for localStorage
  const AUTOSAVE_KEY = "ngc-project-form-data";

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      urgency: "",
      industry: "",
      targetAudience: "",
      existingWebsite: "",
      goals: [],
      features: [],
      timeline: "",
      budget: "",
      hasContent: "",
      designPreferences: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      company: "",
      preferredContact: "",
      additionalInfo: "",
      projectFiles: [],
    },
    mode: "onChange",
  });

  // Load saved data on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(AUTOSAVE_KEY);
      const savedStep = localStorage.getItem(`${AUTOSAVE_KEY}-step`);

      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          Object.keys(parsedData).forEach((key) => {
            if (parsedData[key]) {
              form.setValue(key as keyof ProjectFormValues, parsedData[key]);
            }
          });
          setHasAutoSaved(true);
        } catch (error) {
          console.error("Error loading saved form data:", error);
        }
      }

      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    }
  }, [form]);

  // Auto-save form data on change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(value));
        localStorage.setItem(`${AUTOSAVE_KEY}-step`, currentStep.toString());
      }
    });
    return () => subscription.unsubscribe();
  }, [form, currentStep]);

  // Clear saved data
  const clearSavedData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTOSAVE_KEY);
      localStorage.removeItem(`${AUTOSAVE_KEY}-step`);
      setHasAutoSaved(false);
    }
  };

  const projectTypes = [
    { value: "website-redesign", label: t("initializeProject.typeRedesign") },
    { value: "new-website", label: t("initializeProject.typeNewSite") },
    { value: "ecommerce", label: t("initializeProject.typeEcommerce") },
    { value: "web-app", label: t("initializeProject.typeWebApp") },
    { value: "mobile-app", label: t("initializeProject.typeMobileApp") },
    { value: "branding", label: t("initializeProject.typeBranding") },
  ];

  const timelines = [
    { value: "urgent", label: "ASAP (Rush job)" },
    { value: "1-2-months", label: "1-2 months" },
    { value: "2-4-months", label: "2-4 months" },
    { value: "4-6-months", label: "4-6 months" },
    { value: "6-months-plus", label: "6+ months" },
    { value: "flexible", label: "I'm flexible" },
  ];

  const budgets = [
    { value: "under-5k", label: "Under $5,000" },
    { value: "5k-15k", label: "$5,000 - $15,000" },
    { value: "15k-30k", label: "$15,000 - $30,000" },
    { value: "30k-50k", label: "$30,000 - $50,000" },
    { value: "50k-100k", label: "$50,000 - $100,000" },
    { value: "over-100k", label: "Over $100,000" },
    { value: "discuss", label: "Let's discuss" },
  ];

  const urgencyLevels = [
    {
      value: "low",
      label: "Low Priority",
      description: "No rush, flexible timeline",
    },
    {
      value: "medium",
      label: "Medium Priority",
      description: "Standard timeline expected",
    },
    {
      value: "high",
      label: "High Priority",
      description: "Important project, tight timeline",
    },
    {
      value: "urgent",
      label: "Urgent",
      description: "Critical deadline, immediate attention needed",
    },
  ];

  const industries = [
    { value: "technology", label: "Technology & Software" },
    { value: "healthcare", label: "Healthcare & Medical" },
    { value: "finance", label: "Finance & Banking" },
    { value: "education", label: "Education & Training" },
    { value: "retail", label: "Retail & E-commerce" },
    { value: "restaurant", label: "Restaurant & Food Service" },
    { value: "real-estate", label: "Real Estate" },
    { value: "consulting", label: "Consulting & Professional Services" },
    { value: "nonprofit", label: "Non-profit & NGO" },
    { value: "manufacturing", label: "Manufacturing & Industrial" },
    { value: "creative", label: "Creative & Design" },
    { value: "other", label: "Other" },
  ];

  const projectGoals = [
    { value: "increase-sales", label: "Increase Sales & Revenue" },
    { value: "brand-awareness", label: "Build Brand Awareness" },
    { value: "user-engagement", label: "Improve User Engagement" },
    { value: "lead-generation", label: "Generate More Leads" },
    { value: "customer-support", label: "Better Customer Support" },
    { value: "mobile-presence", label: "Establish Mobile Presence" },
    { value: "automation", label: "Automate Business Processes" },
    { value: "modernize", label: "Modernize Existing Systems" },
    { value: "expand-market", label: "Expand to New Markets" },
    { value: "improve-seo", label: "Improve Search Rankings" },
  ];

  const commonFeatures = [
    { value: "user-accounts", label: "User Registration & Login" },
    { value: "payment-processing", label: "Payment Processing" },
    { value: "content-management", label: "Content Management System" },
    { value: "analytics", label: "Analytics & Reporting" },
    { value: "social-integration", label: "Social Media Integration" },
    { value: "search-functionality", label: "Search Functionality" },
    { value: "multi-language", label: "Multi-language Support" },
    { value: "api-integration", label: "Third-party API Integration" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "admin-dashboard", label: "Admin Dashboard" },
    { value: "email-notifications", label: "Email Notifications" },
    { value: "file-uploads", label: "File Upload System" },
  ];

  const contactMethods = [
    {
      value: "email",
      label: "Email",
      description: "Preferred for detailed discussions",
    },
    {
      value: "phone",
      label: "Phone Call",
      description: "Quick and direct communication",
    },
    {
      value: "video",
      label: "Video Call",
      description: "Face-to-face meetings online",
    },
    { value: "any", label: "Any Method", description: "Whatever works best" },
  ];

  const steps = [
    {
      number: 1,
      title: "Project Basics",
      fields: [],
    },
    {
      number: 2,
      title: "Project Details",
      fields: [],
    },
    {
      number: 3,
      title: "Timeline & Budget",
      fields: [],
    },
    {
      number: 4,
      title: "Contact Information",
      fields: [],
    },
    { number: 5, title: "Review & Submit", fields: [] },
  ];

  const validateCurrentStep = async () => {
    // Since all fields are optional, always return true
    return true;
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: ProjectFormValues) => {
    try {
      console.log("Project consultation request:", data);
      // Here you would typically send the data to your API
      alert(
        "Thank you for your interest! We'll review the information you've provided and get back to you within 24 hours to discuss your project needs.",
      );

      // Clear auto-saved data after successful submission
      clearSavedData();
      form.reset();
      setCurrentStep(1);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const getStepProgress = () => {
    return (currentStep / steps.length) * 100;
  };

  // Smart budget calculator based on project type and features
  const calculateEstimatedBudget = () => {
    const projectType = form.getValues("type");
    const features = form.getValues("features") || [];
    const urgency = form.getValues("urgency");

    let baseBudget = 0;

    // Base budget by project type
    if (projectType) {
      switch (projectType) {
        case "website-redesign":
          baseBudget = 8000;
          break;
        case "new-website":
          baseBudget = 12000;
          break;
        case "ecommerce":
          baseBudget = 20000;
          break;
        case "web-app":
          baseBudget = 35000;
          break;
        case "mobile-app":
          baseBudget = 45000;
          break;
        case "branding":
          baseBudget = 6000;
          break;
        default:
          baseBudget = 10000;
      }
    } else {
      // Default estimate when no project type selected
      baseBudget = 10000;
    }

    // Add feature costs
    const featureCosts: Record<string, number> = {
      "user-accounts": 3000,
      "payment-processing": 5000,
      "content-management": 4000,
      analytics: 2000,
      "social-integration": 1500,
      "search-functionality": 2500,
      "multi-language": 4000,
      "api-integration": 3500,
      "mobile-app": 20000,
      "admin-dashboard": 6000,
      "email-notifications": 1000,
      "file-uploads": 2000,
    };

    if (features && features.length > 0) {
      features.forEach((feature) => {
        baseBudget += featureCosts[feature] || 0;
      });
    }

    // Urgency multiplier
    const urgencyMultiplier: Record<string, number> = {
      low: 0.9,
      medium: 1.0,
      high: 1.2,
      urgent: 1.5,
    };

    if (urgency) {
      baseBudget *= urgencyMultiplier[urgency] || 1.0;
    }

    return Math.round(baseBudget);
  };

  // Smart timeline estimator
  const calculateEstimatedTimeline = () => {
    const projectType = form.getValues("type");
    const features = form.getValues("features") || [];
    const hasContent = form.getValues("hasContent");
    const urgency = form.getValues("urgency");

    let baseWeeks = 0;

    // Base timeline by project type (in weeks)
    if (projectType) {
      switch (projectType) {
        case "website-redesign":
          baseWeeks = 6;
          break;
        case "new-website":
          baseWeeks = 8;
          break;
        case "ecommerce":
          baseWeeks = 12;
          break;
        case "web-app":
          baseWeeks = 16;
          break;
        case "mobile-app":
          baseWeeks = 20;
          break;
        case "branding":
          baseWeeks = 4;
          break;
        default:
          baseWeeks = 8;
      }
    } else {
      // Default estimate when no project type selected
      baseWeeks = 8;
    }

    // Add feature time
    const featureWeeks: Record<string, number> = {
      "user-accounts": 2,
      "payment-processing": 3,
      "content-management": 2,
      analytics: 1,
      "social-integration": 1,
      "search-functionality": 2,
      "multi-language": 3,
      "api-integration": 2,
      "mobile-app": 8,
      "admin-dashboard": 4,
      "email-notifications": 1,
      "file-uploads": 1,
    };

    if (features && features.length > 0) {
      features.forEach((feature) => {
        baseWeeks += featureWeeks[feature] || 0;
      });
    }

    // Content preparation impact
    const contentMultiplier: Record<string, number> = {
      ready: 1.0,
      partial: 1.2,
      "need-help": 1.5,
      "not-sure": 1.3,
    };

    if (hasContent) {
      baseWeeks *= contentMultiplier[hasContent] || 1.2;
    } else {
      baseWeeks *= 1.2; // Default multiplier when not specified
    }

    // Urgency impact
    const urgencyMultiplier: Record<string, number> = {
      low: 1.1,
      medium: 1.0,
      high: 0.8,
      urgent: 0.6,
    };

    if (urgency) {
      baseWeeks *= urgencyMultiplier[urgency] || 1.0;
    }

    return Math.round(baseWeeks);
  };

  // Get project complexity score
  const getComplexityScore = () => {
    const features = form.getValues("features") || [];
    const projectType = form.getValues("type");

    let complexity = 0;

    // Base complexity by project type
    const typeComplexity: Record<string, number> = {
      "website-redesign": 2,
      "new-website": 3,
      ecommerce: 5,
      "web-app": 7,
      "mobile-app": 8,
      branding: 2,
    };

    if (projectType) {
      complexity += typeComplexity[projectType] || 3;
    } else {
      complexity += 3; // Default complexity when no type selected
    }

    if (features && features.length > 0) {
      complexity += features.length * 0.5;
    }

    if (complexity <= 3) return { level: "Low", color: "text-green-600" };
    if (complexity <= 6) return { level: "Medium", color: "text-yellow-600" };
    if (complexity <= 9) return { level: "High", color: "text-orange-600" };
    return { level: "Very High", color: "text-red-600" };
  };

  // File upload handlers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return file.size <= maxSize && allowedTypes.includes(file.type);
    });

    setUploadedFiles((prev) => [...prev, ...validFiles]);
    form.setValue("projectFiles", [...uploadedFiles, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    form.setValue("projectFiles", newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24">
      <PageBreadcrumb />
      <div className="container mx-auto px-6 pt-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("initializeProject.title")}
            </h1>
            <p className="text-neutral-600 text-lg">
              {t("initializeProject.subtitle")}
            </p>

            {/* Auto-save indicator */}
            {hasAutoSaved && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Previous progress restored. You can continue where you left
                  off.
                </span>
                <button
                  onClick={clearSavedData}
                  className="ml-2 text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Start fresh
                </button>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex items-center ${index < steps.length - 1 ? "flex-1 min-w-0" : "shrink-0"}`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-200 text-xs md:text-sm font-medium ${
                      currentStep >= step.number
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-neutral-300 text-neutral-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-4 h-4 md:w-6 md:h-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 md:mx-4 rounded transition-all duration-200 ${
                        currentStep > step.number
                          ? "bg-primary"
                          : "bg-neutral-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-sm text-neutral-600">
                Step {currentStep} of {steps.length}:{" "}
                {steps[currentStep - 1].title}
              </span>
            </div>
          </div>

          {/* Form Card */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl font-semibold text-gray-900">
                {steps[currentStep - 1].title}
              </CardTitle>
              <div className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6"
                >
                  {/* Step 1: Project Basics */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t("initializeProject.nameLabel")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t(
                                  "initializeProject.namePlaceholder",
                                )}
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t("initializeProject.descriptionLabel")}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t(
                                  "initializeProject.descriptionPlaceholder",
                                )}
                                className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {field.value?.length || 0}/1000 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t("initializeProject.typeLabel")}
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder="Select your project type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {projectTypes.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="urgency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Urgency</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder="How urgent is this project?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {urgencyLevels.map((urgency) => (
                                  <SelectItem
                                    key={urgency.value}
                                    value={urgency.value}
                                  >
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {urgency.label}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {urgency.description}
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              This helps us prioritize your project and assign
                              the right team
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 2: Project Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry/Business Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder="Select your industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {industries.map((industry) => (
                                  <SelectItem
                                    key={industry.value}
                                    value={industry.value}
                                  >
                                    {industry.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              This helps us understand your market and tailor
                              our approach
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="targetAudience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Audience</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your target audience (e.g., young professionals, small business owners, students...)"
                                className="min-h-[80px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Who are you trying to reach with this project?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="existingWebsite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Existing Website URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://yourwebsite.com"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Optional - Link to your current website if you
                              have one
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="goals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Goals</FormLabel>
                            <FormDescription className="mb-4">
                              Select the main goals you want to achieve
                              (optional)
                            </FormDescription>
                            <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                              {projectGoals.map((goal) => (
                                <div
                                  key={goal.value}
                                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all touch-manipulation ${
                                    field.value?.includes(goal.value)
                                      ? "border-primary bg-primary/5"
                                      : "border-gray-200 hover:border-gray-300 active:bg-gray-50"
                                  }`}
                                  onClick={() => {
                                    const currentGoals = field.value || [];
                                    if (currentGoals.includes(goal.value)) {
                                      field.onChange(
                                        currentGoals.filter(
                                          (g) => g !== goal.value,
                                        ),
                                      );
                                    } else {
                                      field.onChange([
                                        ...currentGoals,
                                        goal.value,
                                      ]);
                                    }
                                  }}
                                >
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                      field.value?.includes(goal.value)
                                        ? "border-primary bg-primary"
                                        : "border-gray-300"
                                    }`}
                                  >
                                    {field.value?.includes(goal.value) && (
                                      <CheckCircle className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  <span className="text-sm font-medium">
                                    {goal.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Desired Features</FormLabel>
                            <FormDescription className="mb-4">
                              Select features you'd like to include (optional)
                            </FormDescription>
                            <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                              {commonFeatures.map((feature) => (
                                <div
                                  key={feature.value}
                                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all touch-manipulation ${
                                    field.value?.includes(feature.value)
                                      ? "border-primary bg-primary/5"
                                      : "border-gray-200 hover:border-gray-300 active:bg-gray-50"
                                  }`}
                                  onClick={() => {
                                    const currentFeatures = field.value || [];
                                    if (
                                      currentFeatures.includes(feature.value)
                                    ) {
                                      field.onChange(
                                        currentFeatures.filter(
                                          (f) => f !== feature.value,
                                        ),
                                      );
                                    } else {
                                      field.onChange([
                                        ...currentFeatures,
                                        feature.value,
                                      ]);
                                    }
                                  }}
                                >
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                      field.value?.includes(feature.value)
                                        ? "border-primary bg-primary"
                                        : "border-gray-300"
                                    }`}
                                  >
                                    {field.value?.includes(feature.value) && (
                                      <CheckCircle className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  <span className="text-sm font-medium">
                                    {feature.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 3: Timeline & Budget */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Timeline</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder="When do you need this completed?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timelines.map((timeline) => (
                                  <SelectItem
                                    key={timeline.value}
                                    value={timeline.value}
                                  >
                                    {timeline.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              This helps us plan resources and provide accurate
                              timelines
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Budget</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder="Select your budget range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgets.map((budget) => (
                                  <SelectItem
                                    key={budget.value}
                                    value={budget.value}
                                  >
                                    {budget.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Budget ranges help us provide appropriate
                              solutions and recommendations
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Smart Estimates Card - Always show */}
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Smart Project Estimates
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-800">
                                ${calculateEstimatedBudget().toLocaleString()}
                              </div>
                              <div className="text-blue-600">
                                Estimated Cost
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-800">
                                {calculateEstimatedTimeline()} weeks
                              </div>
                              <div className="text-blue-600">
                                Estimated Timeline
                              </div>
                            </div>
                            <div className="text-center">
                              <div
                                className={`text-lg font-bold ${getComplexityScore().color}`}
                              >
                                {getComplexityScore().level}
                              </div>
                              <div className="text-blue-600">Complexity</div>
                            </div>
                          </div>
                          <p className="text-xs text-blue-700 mt-3 text-center">
                            *These are preliminary estimates. More details will
                            improve accuracy. Final pricing provided after
                            consultation.
                          </p>
                        </CardContent>
                      </Card>

                      <FormField
                        control={form.control}
                        name="hasContent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content Preparation</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder="Do you have content ready?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ready">
                                  Content is ready (text, images, etc.)
                                </SelectItem>
                                <SelectItem value="partial">
                                  Some content ready, need help with rest
                                </SelectItem>
                                <SelectItem value="need-help">
                                  Need help creating all content
                                </SelectItem>
                                <SelectItem value="not-sure">
                                  Not sure what content is needed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              This affects timeline and helps us plan content
                              creation services
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="designPreferences"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Design Style Preferences</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your preferred design style, colors, examples of websites you like, etc."
                                className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Optional - Any design preferences, inspiration, or
                              style guidelines
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 4: Contact Information */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Optional - We'll use this to send you project
                              updates and communicate about your project
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Optional - We may call to discuss project details
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company/Organization</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your company name"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Optional - Tell us about your organization
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="preferredContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Contact Method</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder="How would you like us to contact you? (Optional)" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {contactMethods.map((method) => (
                                  <SelectItem
                                    key={method.value}
                                    value={method.value}
                                  >
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {method.label}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {method.description}
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any additional details, special requirements, or questions you'd like to share?"
                                className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Optional - Anything else you think we should know
                              about your project
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Project References & Assets
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload inspiration images, existing logos,
                            wireframes, or any reference materials
                          </p>
                          <input
                            type="file"
                            multiple
                            accept="image/*,.pdf,.doc,.docx,.txt"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 cursor-pointer transition-colors"
                          >
                            Choose Files
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            Max 10MB per file. Supported: JPG, PNG, GIF, PDF,
                            DOC, TXT
                          </p>
                        </div>

                        {/* Display uploaded files */}
                        {uploadedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium">
                              Uploaded Files:
                            </p>
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  <File className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm font-medium">
                                    {file.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    ({formatFileSize(file.size)})
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Summary */}
                  {currentStep === 5 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="text-center mb-6">
                        <Rocket className="w-16 h-16 mx-auto mb-4 text-primary" />
                        <h3 className="text-2xl font-semibold mb-2">
                          Project Consultation Request
                        </h3>
                        <p className="text-neutral-600">
                          Review your information before submitting your
                          consultation request
                        </p>
                      </div>

                      <div className="grid gap-6">
                        {/* Project Basics */}
                        <div className="bg-neutral-50 p-6 rounded-lg">
                          <h4 className="font-semibold mb-4 text-lg">
                            Project Basics
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-neutral-700">
                                Project Name:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("name") || "To be determined"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Project Type:
                              </span>
                              <p className="text-neutral-900">
                                {projectTypes.find(
                                  (t) => t.value === form.getValues("type"),
                                )?.label || "General Project"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Urgency Level:
                              </span>
                              <p className="text-neutral-900">
                                {urgencyLevels.find(
                                  (u) => u.value === form.getValues("urgency"),
                                )?.label || "Standard Priority"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Industry:
                              </span>
                              <p className="text-neutral-900">
                                {industries.find(
                                  (i) => i.value === form.getValues("industry"),
                                )?.label || "General Business"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Description:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("description") ||
                                  "Will be discussed during consultation"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="bg-neutral-50 p-6 rounded-lg">
                          <h4 className="font-semibold mb-4 text-lg">
                            Project Details
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-neutral-700">
                                Target Audience:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("targetAudience") ||
                                  "To be defined during planning"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Existing Website:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("existingWebsite") ||
                                  "Starting fresh"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Project Goals:
                              </span>
                              <div className="mt-1">
                                {form.getValues("goals")?.length ? (
                                  <div className="flex flex-wrap gap-2">
                                    {form
                                      .getValues("goals")
                                      ?.map((goalValue) => (
                                        <Badge
                                          key={goalValue}
                                          variant="secondary"
                                        >
                                          {
                                            projectGoals.find(
                                              (g) => g.value === goalValue,
                                            )?.label
                                          }
                                        </Badge>
                                      ))}
                                  </div>
                                ) : (
                                  <p className="text-neutral-900">
                                    Will define during consultation
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Desired Features:
                              </span>
                              <div className="mt-1">
                                {form.getValues("features")?.length ? (
                                  <div className="flex flex-wrap gap-2">
                                    {form
                                      .getValues("features")
                                      ?.map((featureValue) => (
                                        <Badge
                                          key={featureValue}
                                          variant="outline"
                                        >
                                          {
                                            commonFeatures.find(
                                              (f) => f.value === featureValue,
                                            )?.label
                                          }
                                        </Badge>
                                      ))}
                                  </div>
                                ) : (
                                  <p className="text-neutral-900">
                                    Standard features package
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Timeline & Budget */}
                        <div className="bg-neutral-50 p-6 rounded-lg">
                          <h4 className="font-semibold mb-4 text-lg">
                            Timeline & Budget
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-neutral-700">
                                Timeline:
                              </span>
                              <p className="text-neutral-900">
                                {timelines.find(
                                  (t) => t.value === form.getValues("timeline"),
                                )?.label || "Flexible timeline"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Budget:
                              </span>
                              <p className="text-neutral-900">
                                {budgets.find(
                                  (b) => b.value === form.getValues("budget"),
                                )?.label || "Let's discuss"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Content Preparation:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("hasContent") === "ready" &&
                                  "Content is ready"}
                                {form.getValues("hasContent") === "partial" &&
                                  "Some content ready, need help with rest"}
                                {form.getValues("hasContent") === "need-help" &&
                                  "Need help creating all content"}
                                {form.getValues("hasContent") === "not-sure" &&
                                  "Not sure what content is needed"}
                                {!form.getValues("hasContent") &&
                                  "Will assess during planning"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Design Preferences:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("designPreferences") ||
                                  "Open to recommendations"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-neutral-50 p-6 rounded-lg">
                          <h4 className="font-semibold mb-4 text-lg">
                            Contact Information
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-neutral-700">
                                Name:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("contactName") ||
                                  "Will collect during follow-up"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Email:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("contactEmail") ||
                                  "Will collect during follow-up"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Phone:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("contactPhone") ||
                                  "Email preferred"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Company:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("company") ||
                                  "Individual/Personal"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Preferred Contact Method:
                              </span>
                              <p className="text-neutral-900">
                                {contactMethods.find(
                                  (m) =>
                                    m.value ===
                                    form.getValues("preferredContact"),
                                )?.label || "Any method"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Additional Information:
                              </span>
                              <p className="text-neutral-900">
                                {form.getValues("additionalInfo") ||
                                  "Will discuss during consultation"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Project Files:
                              </span>
                              <div className="mt-1">
                                {uploadedFiles.length > 0 ? (
                                  <div className="space-y-1">
                                    {uploadedFiles.map((file, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2 text-sm"
                                      >
                                        <File className="w-3 h-3 text-gray-500" />
                                        <span>{file.name}</span>
                                        <span className="text-gray-500">
                                          ({formatFileSize(file.size)})
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-neutral-900">
                                    Can share references during consultation
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Final Estimates Summary */}
                      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                            <Rocket className="w-5 h-5" />
                            Final Project Analysis
                          </h4>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-2xl font-bold text-blue-800">
                                ${calculateEstimatedBudget().toLocaleString()}
                              </div>
                              <div className="text-sm text-blue-600">
                                Estimated Investment
                              </div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-2xl font-bold text-green-800">
                                {calculateEstimatedTimeline()} weeks
                              </div>
                              <div className="text-sm text-green-600">
                                Project Duration
                              </div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                              <div
                                className={`text-2xl font-bold ${getComplexityScore().color}`}
                              >
                                {getComplexityScore().level}
                              </div>
                              <div className="text-sm text-gray-600">
                                Complexity Level
                              </div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-2xl font-bold text-purple-800">
                                {urgencyLevels.find(
                                  (u) => u.value === form.getValues("urgency"),
                                )?.label || "Standard"}
                              </div>
                              <div className="text-sm text-purple-600">
                                Priority Level
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <Badge variant="secondary" className="mb-2">
                              Next Steps: Free Consultation & Custom Proposal
                            </Badge>
                            <p className="text-xs text-blue-700">
                              We'll review your information and contact you
                              within 24 hours to discuss your project and
                              provide a custom proposal.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                        <p className="text-sm text-neutral-700">
                          By submitting this consultation request, you agree to
                          be contacted by our team. This is not a binding
                          commitment - it's simply to start a conversation about
                          your project needs.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Progress Indicator */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getStepProgress()}%` }}
                      />
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-sm text-gray-600">
                        {Math.round(getStepProgress())}% Complete
                      </span>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-6 border-t">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        className="flex items-center gap-2 justify-center h-12 touch-manipulation"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        {t("initializeProject.back")}
                      </Button>
                    )}

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 justify-center ml-auto h-12 px-8 touch-manipulation"
                      >
                        {t("initializeProject.continue")}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="flex items-center gap-2 justify-center bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 ml-auto text-lg px-8 py-4 h-auto font-semibold shadow-lg touch-manipulation"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                            Submitting Request...
                          </>
                        ) : (
                          <>
                            <Rocket className="w-5 h-5" />
                            Request Consultation
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
