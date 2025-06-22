"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  File,
  Mail,
  Phone,
  RefreshCcw,
  Rocket,
  Upload,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import PageBreadcrumb from "../components/Breadcrumb";
import { useLanguage } from "../contexts/language-context";
import { useProjectConsultationForm } from "../hooks/use-project-consultations";
import StepProgressBar from "./components/StepProgressBar";
import ProjectFormStep1 from "./components/ProjectFormStep1";
import ProjectFormStep2 from "./components/ProjectFormStep2";
import ProjectFormStep3 from "./components/ProjectFormStep3";
import ProjectFormStep4 from "./components/ProjectFormStep4";
import ProjectFormStep5 from "./components/ProjectFormStep5";
import { createProjectFormSchema, ProjectFormValues } from "./schema";

// We'll define the type inside the component

export default function InitializeProject() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = React.useState(1);

  // Validation function with access to the t function
  const getValidationMessage = (
    key: string,
    defaultMessage: string,
    params: Record<string, any> = {},
  ) => {
    const translation = t(`project.initialize.validation.${key}`, {
      ...params,
      default: defaultMessage,
    });
    return translation;
  };

  // Create the schema with our validation function
  const projectFormSchema = createProjectFormSchema(getValidationMessage);

  // Explicitly define status type to fix TypeScript errors
  // type ConvexStatus = "idle" | "connected" | "error" | "unknown";

  const [hasAutoSaved, setHasAutoSaved] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // const [submissionAttempts, setSubmissionAttempts] = React.useState(0);
  type ConvexStatus = "idle" | "connected" | "error" | "unknown";
  const [convexStatus, setConvexStatus] =
    React.useState<ConvexStatus>("unknown");

  const router = useRouter();
  const [submissionAttempts, setSubmissionAttempts] = React.useState(0);
  const { submitProjectConsultation } = useProjectConsultationForm();

  const AUTOSAVE_KEY = "ngc-project-form-data";

  React.useEffect(() => {
    const checkConvexConnection = async () => {
      try {
        await fetch(process.env.NEXT_PUBLIC_CONVEX_URL || "", {
          method: "HEAD",
          mode: "no-cors",
        });
        setConvexStatus("connected" as ConvexStatus);
      } catch (error) {
        console.error("Convex connection check failed:", error);
        setConvexStatus("error");
      }
    };

    checkConvexConnection();
  }, []);

  // Initialize the form with default values
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

  // Get translated labels and placeholders using the new nested structure
  const labels = {
    projectName: t("project.initialize.fields.name"),
    projectDescription: t("project.initialize.fields.description"),
    projectType: t("project.initialize.fields.type"),
    projectUrgency: t("project.initialize.fields.urgency"),
    industry: t("project.initialize.fields.industry"),
    targetAudience: t("project.initialize.fields.targetAudience"),
    existingWebsite: t("project.initialize.fields.existingWebsite"),
    projectGoals: t("project.initialize.fields.goals"),
    features: t("project.initialize.fields.features"),
    timeline: t("project.initialize.fields.timeline"),
    budget: t("project.initialize.fields.budget"),
    hasContent: t("project.initialize.fields.hasContent"),
    designPreferences: t("project.initialize.fields.designPreferences"),
    contactName: t("project.initialize.fields.contactName"),
    contactEmail: t("project.initialize.fields.contactEmail"),
    contactPhone: t("project.initialize.fields.contactPhone"),
    company: t("project.initialize.fields.company"),
    preferredContact: t("project.initialize.fields.preferredContact"),
    additionalInfo: t("project.initialize.fields.additionalInfo"),
    projectFiles: t("project.initialize.fields.projectFiles"),
  };

  // Helper function to safely get translations with fallbacks
  const getTranslation = (key: string, defaultValue: string) => {
    try {
      const value = t(key, { default: defaultValue });
      return typeof value === "string" ? value : defaultValue;
    } catch (error) {
      console.error(`Error getting translation for ${key}:`, error);
      return defaultValue;
    }
  };

  const placeholders = {
    projectName: t("project.initialize.placeholders.name"),
    projectDescription: t("project.initialize.placeholders.description"),
    industry: t("project.initialize.placeholders.industry"),
    targetAudience: t("project.initialize.placeholders.targetAudience"),
    existingWebsite: t("project.initialize.placeholders.existingWebsite"),
    designPreferences: t("project.initialize.placeholders.designPreferences"),
    contactName: t("project.initialize.placeholders.contactName"),
    contactEmail: t("project.initialize.placeholders.contactEmail"),
    contactPhone: t("project.initialize.placeholders.contactPhone"),
    company: t("project.initialize.placeholders.company"),
    preferredContact: t("project.initialize.placeholders.preferredContact"),
    additionalInfo: t("project.initialize.placeholders.additionalInfo"),
    type: t("project.initialize.placeholders.type"),
    urgency: t("project.initialize.placeholders.urgency"),
  };

  const buttons = {
    next: t("project.initialize.buttons.next"),
    previous: t("project.initialize.buttons.previous"),
    submit: t("project.initialize.buttons.submit"),
    chooseFiles: t("project.initialize.buttons.chooseFiles"),
    startFresh: t("project.initialize.buttons.startFresh"),
  };

  const fileUploadTexts = {
    title: t("project.initialize.fileUpload.title"),
    description: t("project.initialize.fileUpload.description"),
    supportedFormats: t("project.initialize.fileUpload.supportedFormats"),
  };

  const autoSaveMessages = {
    restored: t("project.initialize.autosave.restored"),
    startFresh: t("project.initialize.autosave.startFresh"),
  };

  const confirmationDialog = {
    title: t("project.initialize.confirm.title"),
    message: t("project.initialize.confirm.message"),
    yes: t("project.initialize.confirm.yes"),
    no: t("project.initialize.confirm.no"),
  };

  // Clear saved data
  const clearSavedData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTOSAVE_KEY);
      localStorage.removeItem(`${AUTOSAVE_KEY}-step`);
      setHasAutoSaved(false);
    }
  };

  const projectTypes = [
    {
      value: "website-redesign",
      label: t("project.initialize.types.websiteRedesign"),
    },
    { value: "new-website", label: t("project.initialize.types.newWebsite") },
    { value: "ecommerce", label: t("project.initialize.types.ecommerce") },
    { value: "web-app", label: t("project.initialize.types.webApp") },
    { value: "mobile-app", label: t("project.initialize.types.mobileApp") },
    { value: "branding", label: t("project.initialize.types.branding") },
  ];

  const timelines = [
    { value: "urgent", label: t("project.initialize.timelines.urgent") },
    {
      value: "1-2-months",
      label: t("project.initialize.timelines.oneToTwoMonths"),
    },
    {
      value: "2-4-months",
      label: t("project.initialize.timelines.twoToFourMonths"),
    },
    {
      value: "4-6-months",
      label: t("project.initialize.timelines.fourToSixMonths"),
    },
    {
      value: "6-months-plus",
      label: t("project.initialize.timelines.sixMonthsPlus"),
    },
    { value: "flexible", label: t("project.initialize.timelines.flexible") },
  ];

  // Prepare data structures for the form
  const budgets = [
    { value: "under-5k", label: t("under-5k") },
    { value: "5k-15k", label: t("5k-10") },
    { value: "15k-30k", label: t("10-20") },

    { value: "discuss", label: t("project.initialize.budgets.discuss") },
  ];

  // Get and format urgency levels from translations
  console.log("Attempting to get urgencyLevels...");
  // Define urgency levels with fallback
  const urgencyLevels = [
    {
      value: "low",
      label: t("project.initialize.urgencyLevels.notUrgent", {
        default: "Not Urgent (3+ months)",
      }),
    },
    {
      value: "medium",
      label: t("project.initialize.urgencyLevels.standard", {
        default: "Standard (1-3 months)",
      }),
    },
    {
      value: "high",
      label: t("project.initialize.urgencyLevels.urgent", {
        default: "Urgent (2-4 weeks)",
      }),
    },
    {
      value: "urgent",
      label: t("project.initialize.urgencyLevels.asap", {
        default: "ASAP (1-2 weeks)",
      }),
    },
  ];
  console.log(`Using urgencyLevels:`, urgencyLevels);

  // Define industries with fallback
  const industries = [
    {
      value: "tech",
      label: getTranslation("project.initialize.industries.tech", "Technology"),
    },
    {
      value: "finance",
      label: getTranslation("project.initialize.industries.finance", "Finance"),
    },
    {
      value: "healthcare",
      label: getTranslation(
        "project.initialize.industries.healthcare",
        "Healthcare",
      ),
    },
    {
      value: "education",
      label: getTranslation(
        "project.initialize.industries.education",
        "Education",
      ),
    },
    {
      value: "retail",
      label: getTranslation("project.initialize.industries.retail", "Retail"),
    },
    {
      value: "manufacturing",
      label: getTranslation(
        "project.initialize.industries.manufacturing",
        "Manufacturing",
      ),
    },
    {
      value: "other",
      label: getTranslation("project.initialize.industries.other", "Other"),
    },
  ];

  // Define project goals with fallback
  const projectGoals = [
    {
      value: "increase-traffic",
      label: getTranslation(
        "project.initialize.projectGoals.increase-traffic",
        "Increase Website Traffic",
      ),
    },
    {
      value: "increase-conversions",
      label: getTranslation(
        "project.initialize.projectGoals.increaseConversions",
        "Increase Conversions",
      ),
    },
    {
      value: "improve-ux",
      label: getTranslation(
        "project.initialize.projectGoals.improveUx",
        "Improve User Experience",
      ),
    },
    {
      value: "rebrand",
      label: getTranslation(
        "project.initialize.projectGoals.rebrand",
        "Rebrand/Refresh Design",
      ),
    },
    {
      value: "add-features",
      label: getTranslation(
        "project.initialize.projectGoals.addFeatures",
        "Add New Features",
      ),
    },
    {
      value: "mobile-friendly",
      label: getTranslation(
        "project.initialize.projectGoals.mobileFriendly",
        "Make Site Mobile-Friendly",
      ),
    },
    {
      value: "seo",
      label: getTranslation(
        "project.initialize.projectGoals.seo",
        "Improve SEO",
      ),
    },
  ];

  // Define common features with fallback
  const commonFeatures = [
    {
      value: "responsive",
      label: getTranslation(
        "project.initialize.commonFeatures.responsive",
        "Responsive Design",
      ),
    },
    {
      value: "cms",
      label: getTranslation(
        "project.initialize.commonFeatures.cms",
        "Content Management System",
      ),
    },
    {
      value: "ecommerce",
      label: getTranslation(
        "project.initialize.commonFeatures.ecommerce",
        "E-commerce Capabilities",
      ),
    },
    {
      value: "blog",
      label: getTranslation("project.initialize.commonFeatures.blog", "Blog"),
    },
    {
      value: "contact-form",
      label: getTranslation(
        "project.initialize.commonFeatures.contactForm",
        "Contact Form",
      ),
    },
    {
      value: "seo",
      label: getTranslation(
        "project.initialize.commonFeatures.seo",
        "SEO Optimization",
      ),
    },
    {
      value: "analytics",
      label: getTranslation(
        "project.initialize.commonFeatures.analytics",
        "Analytics Integration",
      ),
    },
  ];

  // Define contact methods with fallback
  const contactMethods = [
    {
      value: "email",
      label: getTranslation(
        "project.initialize.contactMethods.email.label",
        "Email",
      ),
      description: getTranslation(
        "project.initialize.contactMethods.email.description",
        "Best for detailed discussions",
      ),
    },
    {
      value: "phone",
      label: getTranslation(
        "project.initialize.contactMethods.phone.label",
        "Phone Call",
      ),
      description: getTranslation(
        "project.initialize.contactMethods.phone.description",
        "Good for quick questions",
      ),
    },
    {
      value: "video",
      label: getTranslation(
        "project.initialize.contactMethods.video.label",
        "Video Call",
      ),
      description: getTranslation(
        "project.initialize.contactMethods.video.description",
        "Best for complex discussions",
      ),
    },
  ];

  const steps = [
    {
      number: 1,
      title: t("project.initialize.steps.step1"),
      fields: [],
    },
    {
      number: 2,
      title: t("project.initialize.steps.step2"),
      fields: [],
    },
    {
      number: 3,
      title: t("project.initialize.steps.step3"),
      fields: [],
    },
    {
      number: 4,
      title: t("project.initialize.steps.step4"),
      fields: [],
    },
    {
      number: 5,
      title: t("project.initialize.steps.step5"),
      fields: [],
    },
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
    console.log("handleSubmit function called with data:", data);

    // Prevent multiple submissions
    if (isSubmitting) {
      console.log("Already submitting, preventing duplicate submission");
      return;
    }

    // Check Convex connection before submitting
    if (convexStatus === ("error" as ConvexStatus)) {
      toast.error(t("project.initialize.errors.connectionError"), {
        duration: 5000,
      });
      return;
    }

    // Ensure we at least have contact information
    if (!data.contactEmail) {
      toast.error(t("project.initialize.errors.emailRequired"));
      return;
    }

    setIsSubmitting(true);
    console.log("isSubmitting state set to true");

    try {
      // Create a clean object containing only fields that are in the Convex schema
      // This ensures we don't send any fields that aren't in the schema
      const projectData = {
        // Basic information
        name: data.name || undefined,
        description: data.description || undefined,

        // Project type and urgency as literals
        type: data.type as
          | "website-redesign"
          | "new-website"
          | "ecommerce"
          | "web-app"
          | "mobile-app"
          | "branding"
          | undefined,
        urgency: data.urgency as
          | "low"
          | "medium"
          | "high"
          | "urgent"
          | undefined,

        // Project details
        industry: data.industry || undefined,
        targetAudience: data.targetAudience || undefined,
        existingWebsite: data.existingWebsite || undefined,

        // Only include arrays if they have values
        goals: data.goals && data.goals.length > 0 ? data.goals : undefined,
        features:
          data.features && data.features.length > 0 ? data.features : undefined,

        // Timeline and budget
        timeline: data.timeline || undefined,
        budget: data.budget || undefined,
        hasContent: data.hasContent || undefined,
        designPreferences: data.designPreferences || undefined,

        // Contact information
        contactName: data.contactName || undefined,
        contactEmail: data.contactEmail || undefined,
        contactPhone: data.contactPhone || undefined,
        company: data.company || undefined,
        preferredContact: data.preferredContact || undefined,
        additionalInfo: data.additionalInfo || undefined,

        // Source information
        source: "website",
      };

      console.log("Submitting project consultation:", projectData);
      // Double-check connection status right before submission
      if (convexStatus === ("error" as ConvexStatus)) {
        throw new Error(
          "Connection to server lost. Please try again when your internet connection is restored.",
        );
      }

      // Track submission attempts
      setSubmissionAttempts((prevAttempts) => prevAttempts + 1);

      // Direct call to the Convex mutation
      try {
        const result = await submitProjectConsultation(projectData);
        console.log("Submission result:", result);

        if (result.success) {
          toast.success(t("project.initialize.success.submissionSuccess"), {
            duration: 6000,
          });

          // Clear auto-saved data after successful submission
          clearSavedData();
          form.reset();
          setCurrentStep(1);
          setUploadedFiles([]);

          // Redirect to thank you page
          router.push("/thank-you");
        } else {
          // If we have contact info but submission failed, show a more helpful message
          if (data.contactEmail && submissionAttempts > 1) {
            toast.error(
              t("project.initialize.errors.submissionErrorWithContact"),
              { duration: 8000 },
            );
            throw new Error(
              result.error || "Failed to submit project consultation",
            );
          } else {
            throw new Error(
              result.error || "Failed to submit project consultation",
            );
          }
        }
      } catch (convexError) {
        console.error("Convex API call failed:", convexError);

        // Check for various Convex errors
        if (
          convexError instanceof Error &&
          convexError.message.includes("ArgumentValidationError")
        ) {
          console.error("Validation error:", convexError.message);
          toast.error(t("project.initialize.errors.validationError"), {
            duration: 5000,
          });
        } else if (
          convexError instanceof Error &&
          convexError.message.includes("does not match the schema")
        ) {
          console.error("Schema error:", convexError.message);

          // This is likely the activities table error
          toast.success(t("project.initialize.success.minorErrorSuccess"), {
            duration: 6000,
          });

          // Clear auto-saved data
          clearSavedData();
          form.reset();
          setCurrentStep(1);
          setUploadedFiles([]);

          // Redirect to thank you page anyway since the project was likely created
          router.push("/thank-you");
          return;
        } else {
          throw convexError;
        }
      }
    } catch (error) {
      console.error("Project consultation submission error:", error);

      // Add more specific error message based on the type of error
      let errorMessage = t("project.initialize.errors.genericError");

      if (error instanceof Error) {
        console.error("Error details:", error.message, error.stack);

        if (
          error.message.includes("network") ||
          error.message.includes("fetch") ||
          error.message.includes("connection")
        ) {
          errorMessage = t("project.initialize.errors.networkError");
          // Update connection status
          setConvexStatus("error" as ConvexStatus);
        } else if (
          error.message.includes("permission") ||
          error.message.includes("auth")
        ) {
          errorMessage = t("project.initialize.errors.authError");
        } else if (
          error.message.includes("ArgumentValidation") ||
          error.message.includes("validation") ||
          error.message.includes("schema")
        ) {
          errorMessage = t("project.initialize.errors.dataValidationError");
        } else {
          errorMessage = `${t("project.initialize.errors.submissionFailed")}: ${error.message}`;
        }
      }

      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="min-h-screen bg-neutral-50 pt-24">
      <PageBreadcrumb />
      <div className="container mx-auto px-6 pt-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("project.initialize.title")}
            </h1>
            <p className="text-neutral-600 text-lg">
              {t("project.initialize.subtitle")}
            </p>
            {hasAutoSaved && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mr-2" />
                  <span className="text-sm text-blue-800">
                    {t("project.initialize.autosave.restored")}
                  </span>
                </div>
                <button
                  onClick={clearSavedData}
                  className="text-xs text-blue-600 hover:text-blue-800 underline sm:ml-auto"
                >
                  {buttons.startFresh}
                </button>
              </div>
            )}
          </div>

          {/* Progress Section */}
          <StepProgressBar
            steps={steps}
            currentStep={currentStep}
            t={t}
            getStepProgress={getStepProgress}
          />

          {/* Form Card */}
          <Card className="shadow-lg border-0 bg-background/95 backdrop-blur-sm form-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl font-semibold">
                {t(`project.initialize.steps.step${currentStep}`)}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {t("project.initialize.progress.step", {
                  current: currentStep,
                  total: steps.length,
                })}
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                {convexStatus === "error" && (
                  <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700/30 text-red-700 dark:text-red-200 rounded">
                    <p className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {t("project.initialize.errors.connectionError")}
                    </p>
                    <p className="mt-2 text-sm">
                      {t("project.initialize.errors.connectionErrorContact")} {" "}
                      <a
                        href={`mailto:${t("project.initialize.contactEmail")}`}
                        className="font-medium underline"
                      >
                        {t("project.initialize.contactEmail")}
                      </a>
                    </p>
                  </div>
                )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit((data) => {
                      handleSubmit(data);
                    })(e);
                  }}
                  className="space-y-6 project-form"
                >
                  {currentStep === 1 && (
                    <ProjectFormStep1
                      form={form}
                      t={t}
                      projectTypes={projectTypes}
                      urgencyLevels={urgencyLevels}
                    />
                  )}
                  {currentStep === 2 && (
                    <ProjectFormStep2
                      form={form}
                      labels={labels}
                      placeholders={placeholders}
                      t={t}
                      industries={industries}
                    />
                  )}
                  {currentStep === 3 && (
                    <ProjectFormStep3
                      form={form}
                      t={t}
                      calculateEstimatedBudget={calculateEstimatedBudget}
                    />
                  )}
                  {currentStep === 4 && (
                    <ProjectFormStep4
                      form={form}
                      t={t}
                      contactMethods={contactMethods}
                    />
                  )}
                  {currentStep === 5 && (
                    <ProjectFormStep5
                      t={t}
                      formValues={form.getValues()}
                      labels={labels}
                      projectTypes={projectTypes}
                      urgencyLevels={urgencyLevels}
                      industries={industries}
                      projectGoals={projectGoals}
                      commonFeatures={commonFeatures}
                      timelines={timelines}
                      budgets={budgets}
                    />
                  )}
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
                        {t("project.initialize.buttons.back")}
                      </Button>
                    )}
                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 justify-center ml-auto h-12 px-8 touch-manipulation"
                      >
                        {t("project.initialize.buttons.continue")}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <div className="flex flex-col w-full gap-4">
                        <Button
                          type="button"
                          className="flex items-center gap-2 justify-center bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 ml-auto text-lg px-8 py-4 h-auto font-semibold shadow-lg touch-manipulation w-full"
                          disabled={isSubmitting}
                          onClick={() => {
                            const formData = form.getValues();
                            handleSubmit(formData);
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                              Submitting Request...
                            </>
                          ) : submissionAttempts > 1 ? (
                            <>
                              <RefreshCcw className="w-5 h-5" />
                              Try Again
                            </>
                          ) : (
                            <>
                              <Rocket className="w-5 h-5" />
                              Request Consultation
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          Having trouble with the form? Contact us directly at{" "}
                          <a
                            href="mailto:support@ngc.com"
                            className="text-primary hover:underline"
                          >
                            support@ngc.com
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          {/* Direct Contact Alternative */}
          {submissionAttempts > 0 && (
            <div className="mt-8 bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Having trouble submitting?
              </h3>
              <p className="mb-4">
                If you're experiencing difficulties with the form, you can
                contact us directly:
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>
                    Email: {" "}
                    <a
                      href="mailto:projects@ngc.com"
                      className="text-primary hover:underline"
                    >
                      projects@ngc.com
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>
                    Phone: {" "}
                    <a
                      href="tel:+1234567890"
                      className="text-primary hover:underline"
                    >
                      +1 (234) 567-890
                    </a>
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    const data = form.getValues();
                    const subject = encodeURIComponent(
                      "Project Consultation Request",
                    );
                    const body = encodeURIComponent(
                      `Name: ${data.contactName || "Not provided"}\nEmail: ${data.contactEmail || "Not provided"}\nProject type: ${data.type || "Not provided"}\nDescription: ${data.description || "Not provided"}\nBudget: ${data.budget || "Not provided"}\nTimeline: ${data.timeline || "Not provided"}`,
                    );
                    window.location.href = `mailto:projects@ngc.com?subject=${subject}&body=${body}`;
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us Your Details
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
