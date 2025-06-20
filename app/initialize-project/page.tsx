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

// Define schema creation function that takes validation functions as parameters
const createProjectFormSchema = (
  getValidationMessage: (
    key: string,
    defaultMessage: string,
    params?: Record<string, any>,
  ) => string,
) =>
  z.object({
    name: z
      .string()
      .optional()
      .refine(
        (val) => !val || (val.length >= 2 && val.length <= 100),
        (val) => ({
          message: getValidationMessage(
            val && val.length < 2 ? "minLength" : "maxLength",
            val && val.length < 2
              ? "Must be at least 2 characters"
              : "Must be 100 characters or less",
            { min: 2, max: 100 },
          ),
        }),
      ),
    description: z
      .string()
      .optional()
      .refine(
        (val) => !val || (val.length >= 10 && val.length <= 1000),
        (val) => ({
          message: getValidationMessage(
            val && val.length < 10 ? "minLength" : "maxLength",
            val && val.length < 10
              ? "Must be at least 10 characters"
              : "Must be 1000 characters or less",
            { min: 10, max: 1000 },
          ),
        }),
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
        getValidationMessage(
          "invalidUrl",
          "Please enter a valid URL starting with http:// or https://",
        ),
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
        (val) => ({
          message: getValidationMessage(
            val && val.length < 2 ? "minLength" : "maxLength",
            val && val.length < 2
              ? "Must be at least 2 characters"
              : "Must be 100 characters or less",
            { min: 2, max: 100 },
          ),
        }),
      ),
    contactEmail: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        getValidationMessage(
          "invalidEmail",
          "Please enter a valid email address",
        ),
      ),
    contactPhone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val),
        getValidationMessage(
          "invalidPhone",
          "Please enter a valid phone number",
        ),
      ),
    company: z.string().optional(),
    preferredContact: z.string().optional(),
    additionalInfo: z.string().optional(),
    projectFiles: z.array(z.any()).optional(),
  });

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
  // Define the type based on the schema
  type ProjectFormValues = z.infer<typeof projectFormSchema>;

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
    { value: "under-5k", label: t("project.initialize.budgets.under5k") },
    { value: "5k-15k", label: t("project.initialize.budgets.fiveTo15k") },
    { value: "15k-30k", label: t("project.initialize.budgets.fifteenTo30k") },
    { value: "30k-50k", label: t("project.initialize.budgets.thirtyTo50k") },
    { value: "50k-100k", label: t("project.initialize.budgets.fiftyTo100k") },
    { value: "over-100k", label: t("project.initialize.budgets.over100k") },
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
              {t("project.initialize.title")}
            </h1>
            <p className="text-neutral-600 text-lg">
              {t("project.initialize.subtitle")}
            </p>

            {/* Auto-save indicator */}
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
          <div className="mb-12">
            {/* Step Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-600">
                  {t("project.initialize.progress.step", {
                    current: currentStep,
                    total: steps.length,
                  })}
                </span>
                <span className="text-sm font-medium text-primary">
                  {t("project.initialize.progress.percentage", {
                    percentage: Math.round(getStepProgress()),
                  })}
                </span>
              </div>
              <Progress value={getStepProgress()} className="h-3 mb-2" />
              <div className="text-center">
                <span className="text-lg font-semibold text-gray-900">
                  {steps[currentStep - 1].title}
                </span>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="hidden md:flex justify-between items-center overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex items-center ${index < steps.length - 1 ? "flex-1 min-w-0" : "shrink-0"}`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 text-sm font-medium mb-2 ${
                        currentStep >= step.number
                          ? "bg-primary border-primary text-primary-foreground shadow-lg"
                          : currentStep === step.number - 1
                            ? "border-primary text-primary bg-primary/10"
                            : "border-neutral-300 text-neutral-500"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`text-xs text-center font-medium px-2 ${
                        currentStep >= step.number
                          ? "text-primary"
                          : "text-neutral-500"
                      }`}
                    >
                      {t(`project.initialize.steps.step${step.number}`)}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 rounded transition-all duration-300 ${
                        currentStep > step.number ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Step Indicators */}
            <div className="md:hidden flex justify-center space-x-2 mt-4">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentStep >= step.number ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

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
                      {t("project.initialize.errors.connectionErrorContact")}{" "}
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
                    console.log("Form submit event triggered");
                    form.handleSubmit((data) => {
                      console.log("Form data validated successfully", data);
                      handleSubmit(data);
                    })(e);
                  }}
                  className="space-y-6 project-form"
                >
                  {/* Step 1: Project Basics */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{labels.projectName}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={placeholders.projectName}
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
                            <FormLabel>{labels.projectDescription}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={placeholders.projectDescription}
                                className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {field.value?.length || 0}/1000{" "}
                              {t("project.initialize.labels.characters")}
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
                            <FormLabel>{labels.projectType}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue
                                    placeholder={t(
                                      "project.initialize.placeholders.type",
                                    )}
                                  />
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
                            <FormLabel>{labels.projectUrgency}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue
                                    placeholder={t(
                                      "project.initialize.placeholders.urgency",
                                    )}
                                  />
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
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              {t("project.initialize.descriptions.urgency")}
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
                            <FormLabel>{labels.industry}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue
                                    placeholder={placeholders.industry}
                                  />
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
                              {t("project.initialize.descriptions.industry")}
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
                            <FormLabel>{labels.targetAudience}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={placeholders.targetAudience}
                                className="min-h-[80px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {t(
                                "project.initialize.descriptions.targetAudience",
                              )}
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
                            <FormLabel>{labels.existingWebsite}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={placeholders.existingWebsite}
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormDescription>
                              {t(
                                "project.initialize.descriptions.existingWebsite",
                              )}
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
                            <FormLabel>{labels.projectGoals}</FormLabel>
                            <FormDescription className="mb-4">
                              {t("project.initialize.descriptions.goals")}
                            </FormDescription>
                            <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                              {projectGoals.map((goal) => (
                                <div
                                  key={goal.value}
                                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all touch-manipulation project-selection-item ${
                                    field.value?.includes(goal.value)
                                      ? "border-primary bg-primary/5 selected"
                                      : "border-border hover:border-primary/30 active:bg-muted/50"
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
                            <FormLabel>{labels.features}</FormLabel>
                            <FormDescription className="mb-4">
                              {t("project.initialize.descriptions.features")}
                            </FormDescription>
                            <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                              {commonFeatures.map((feature) => (
                                <div
                                  key={feature.value}
                                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all touch-manipulation project-selection-item ${
                                    field.value?.includes(feature.value)
                                      ? "border-primary bg-primary/5 selected"
                                      : "border-border hover:border-primary/30 active:bg-muted/50"
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
                      <Card className="bg-blue-50 border-blue-200 project-estimate-card">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Smart Project Estimates
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-800 card-value">
                                ${calculateEstimatedBudget().toLocaleString()}
                              </div>
                              <div className="text-blue-600 card-label">
                                Estimated Cost
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-800 card-value">
                                {calculateEstimatedTimeline()} weeks
                              </div>
                              <div className="text-blue-600 card-label">
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
                            console.log("Submit button clicked directly");
                            // Get clean form data
                            const formData = form.getValues();
                            // Only send fields that are in the schema
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
                    Email:{" "}
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
                    Phone:{" "}
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
                    // Create a mailto link with form data
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
