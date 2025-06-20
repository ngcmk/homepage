// ngc/app/initialize-project/schemas.ts

import { z } from "zod";

/**
 * Schema for project form validation
 */
export const createProjectFormSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be at most 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be at most 1000 characters"),
  type: z.enum([
    "website-redesign",
    "new-website",
    "ecommerce",
    "web-app",
    "mobile-app",
    "branding",
  ]),
  urgency: z.enum(["low", "medium", "high", "urgent"]),
  industry: z.string().min(1, "Industry is required"),
  targetAudience: z.string().min(1, "Target audience is required"),
  existingWebsite: z.string().url("Please enter a valid URL").optional(),
  goals: z.array(z.string().min(1, "Goal cannot be empty")),
  features: z.array(z.string().min(1, "Feature cannot be empty")),
  timeline: z.string().min(1, "Timeline is required"),
  budget: z.string().min(1, "Budget is required"),
  hasContent: z.string().optional(),
  designPreferences: z.string().optional(),
  contactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(100, "Contact name must be at most 100 characters"),
  contactEmail: z.string().email("Please enter a valid email address"),
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

/**
 * Type for project form values
 */
export type ProjectFormValues = z.infer<typeof createProjectFormSchema>;

/**
 * Status of the project initialization process
 */
export type ConvexStatus = "connected" | "error" | "unknown";
