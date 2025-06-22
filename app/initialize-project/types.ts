// ngc/app/initialize-project/types.ts

import { z } from "zod";

// Explicit type for project form values matching schema requirements
// export type ProjectFormValues = z.infer<
//   ReturnType<typeof createProjectFormSchema>
// >;

// // Explicitly define status type for Convex
// export type ConvexStatus = "idle" | "connected" | "error" | "unknown";

// Define all possible values for enum fields
const ProjectTypes = [
  "website-redesign",
  "new-website",
  "ecommerce",
  "web-app",
  "mobile-app",
  "branding",
] as const;

const UrgencyLevels = ["low", "medium", "high", "urgent"] as const;

// Schema definition
export const createProjectFormSchema = (
  getValidationMessage: (
    key: string,
    defaultMessage: string,
    params?: Record<string, any>,
  ) => string,
) => {
  return z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(1000),
    type: z.enum(ProjectTypes),
    urgency: z.enum(UrgencyLevels),
    industry: z.string().optional(),
    targetAudience: z.string().optional(),
    existingWebsite: z.string().url().optional(),
    goals: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    timeline: z.string().optional(),
    budget: z.string().optional(),
    hasContent: z.string().optional(),
    designPreferences: z.string().optional(),
    contactName: z.string().optional(),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().optional(),
    company: z.string().optional(),
    preferredContact: z.string().optional(),
    additionalInfo: z.string().optional(),
    projectFiles: z.array(z.any()).optional(),
  });
};

// Infer the type from the schema
export type ProjectFormValues = z.infer<
  ReturnType<typeof createProjectFormSchema>
>;

// Status type
export type ConvexStatus = "idle" | "connected" | "error" | "unknown";
// Schema for project form validation
// export const createProjectFormSchema = (
//   getValidationMessage: (
//     key: string,
//     defaultMessage: string,
//     params?: Record<string, any>,
//   ) => string,
// ) =>
//   z.object({
//     name: z.string().min(2).max(100),
//     description: z.string().min(10).max(1000),
//     type: z.enum([
//       "website-redesign",
//       "new-website",
//       "ecommerce",
//       "web-app",
//       "mobile-app",
//       "branding",
//     ]),
//     urgency: z.enum(["low", "medium", "high", "urgent"]),
//     industry: z.string().optional(),
//     targetAudience: z.string().optional(),
//     existingWebsite: z
//       .string()
//       .optional()
//       .refine(
//         (val) => !val || /^https?:\/\/.+/.test(val),
//         getValidationMessage(
//           "invalidUrl",
//           "Please enter a valid URL starting with http:// or https://",
//         ),
//       ),
//     goals: z.array(z.string()).optional(),
//     features: z.array(z.string()).optional(),
//     timeline: z.string().optional(),
//     budget: z.string().optional(),
//     hasContent: z.string().optional(),
//     designPreferences: z.string().optional(),
//     contactName: z
//       .string()
//       .optional()
//       .refine(
//         (val) => !val || (val.length >= 2 && val.length <= 100),
//         (val) => ({
//           message: getValidationMessage(
//             val && val.length < 2 ? "minLength" : "maxLength",
//             val && val.length < 2
//               ? "Must be at least 2 characters"
//               : "Must be 100 characters or less",
//             { min: 2, max: 100 },
//           ),
//         }),
//       ),
//     contactEmail: z
//       .string()
//       .optional()
//       .refine(
//         (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
//         getValidationMessage(
//           "invalidEmail",
//           "Please enter a valid email address",
//         ),
//       ),
//     contactPhone: z
//       .string()
//       .optional()
//       .refine(
//         (val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val),
//         getValidationMessage(
//           "invalidPhone",
//           "Please enter a valid phone number",
//         ),
//       ),
//     company: z.string().optional(),
//     preferredContact: z.string().optional(),
//     additionalInfo: z.string().optional(),
//     projectFiles: z.array(z.any()).optional(),
//   });
