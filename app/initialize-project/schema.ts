import * as z from "zod";

// Define schema creation function that takes validation functions as parameters
export const createProjectFormSchema = (
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

export type ProjectFormSchema = ReturnType<typeof createProjectFormSchema>;
export type ProjectFormValues = z.infer<ReturnType<typeof createProjectFormSchema>>;
