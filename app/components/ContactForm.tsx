"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContactForm } from "../hooks/use-contacts";
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
import { useLanguage } from "../contexts/language-context";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Briefcase,
  Loader2,
  Send,
} from "lucide-react";
import { toast } from "sonner";

// Validation schema
// Define validation schema with more lenient requirements for testing
const contactFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string(),
  budget: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit?: (data: ContactFormValues) => void;
  className?: string;
}

export default function ContactForm({ onSubmit, className }: ContactFormProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const isMounted = useRef(true);
  const { submitContact, isInitialized, createContactAvailable } =
    useContactForm();

  // Cleanup function to prevent state updates after unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Handle redirection when submission is successful
  useEffect(() => {
    if (isSuccess && !redirecting) {
      setRedirecting(true);
      setTimeout(() => {
        if (isMounted.current) {
          router.push("/thank-you");
        }
      }, 1500);
    }
  }, [isSuccess, redirecting, router]);

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "general", // Always set a default subject
      message: "",
      budget: "discuss", // Set a default budget (local only, not sent to Convex)
    },
  });

  // Ensure we have default values
  useEffect(() => {
    if (!form.getValues().subject) {
      form.setValue("subject", "general");
    }
    if (!form.getValues().budget) {
      form.setValue("budget", "discuss");
    }
  }, [form]);

  // Helper function to map subject to priority and contact type
  const getPriorityFromSubject = (
    subject: string | undefined,
  ): "low" | "medium" | "high" | "urgent" => {
    if (!subject || subject === "") return "medium";

    const priorityMap: Record<string, "low" | "medium" | "high" | "urgent"> = {
      urgent: "high",
      support: "high",
      general: "medium",
      project: "medium",
      design: "medium",
      development: "medium",
      mobile: "medium",
      ai: "high",
      other: "low",
    };

    return priorityMap[subject] || "medium";
  };

  const mapSubjectToContactType = (
    subject: string | undefined,
  ): "general" | "business" | "support" | "partnership" | "careers" => {
    if (!subject || subject === "") return "general";

    const typeMap: Record<
      string,
      "general" | "business" | "support" | "partnership" | "careers"
    > = {
      general: "general",
      project: "business",
      design: "business",
      development: "business",
      mobile: "business",
      ai: "business",
      support: "support",
      other: "general",
    };

    return typeMap[subject] || "general";
  };

  // Handle form values at submission time
  const handleSubmit = async (data: ContactFormValues) => {
    try {
      // Quick validation check
      if (!data.name || !data.email || !data.message) {
        toast.error("Please fill in all required fields");
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);
      setIsSuccess(false);
      setRedirecting(false);

      // console.log("[ContactForm] Starting submission with data:", data);

      // Call parent onSubmit if provided
      if (onSubmit) {
        // console.log("[ContactForm] Using parent onSubmit handler");
        // Make sure fields have default values before submitting
        const dataWithDefaults = {
          ...data,
          subject: data.subject || "general",
          budget: data.budget || "discuss",
        };
        await onSubmit(dataWithDefaults);
        if (isMounted.current) setIsSubmitting(false);
        form.reset();
        return;
      }

      // console.log("[ContactForm] Using Convex integration");
      // console.log(
      //   "[ContactForm] Convex status:",
      //   isInitialized ? "initialized" : "not initialized",
      // );
      // console.log(
      //   "[ContactForm] submitContact available:",
      //   typeof submitContact === "function",
      // );

      // Map form data to Convex format
      const contactType = mapSubjectToContactType(data.subject);
      const priority = getPriorityFromSubject(data.subject);

      // console.log("[ContactForm] Mapped data:", {
      //   contactType,
      //   priority,
      //   subject: data.subject || "general",
      // });

      if (typeof submitContact !== "function") {
        setIsSubmitting(false);
        const errorMsg =
          "Convex connection is not available. Please try again later.";
        setSubmitError(errorMsg);
        toast.error(errorMsg);
        return;
      }

      // Destructure to explicitly exclude budget field
      const { budget, ...validFields } = data;

      // Prepare submission data with defaults for missing values - only include fields valid for Convex
      const submissionData = {
        ...validFields,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        company: data.company || "",
        subject: data.subject || "general",
        message: data.message,
        contactType,
        priority: priority as "low" | "medium" | "high" | "urgent",
        gdprConsent: true,
        marketingConsent: false,
        source: "website-contact-form",
        userAgent: navigator.userAgent,
        // Note: budget is stored in form but not sent to Convex (not in schema)
      };

      // For debugging, show all form values including budget
      // console.log("[ContactForm] Complete form data:", {
      //   ...submissionData,
      //   budget: data.budget || "discuss", // Budget shown in logs but not sent to Convex
      //   // Log timestamp for debugging only, don't include it in the actual submission
      //   logTimestamp: Date.now(),
      // });

      // Log only the data that will be sent to Convex
      // console.log("[ContactForm] Submitting to Convex API:", submissionData);

      let result;
      const startTime = Date.now();

      try {
        // Direct call without timeout handling
        let directResult = await submitContact(submissionData);

        // Check for direct Convex response format
        if (typeof directResult === "object" && directResult !== null) {
          if (directResult.success === true && "contactId" in directResult) {
            // console.log(
            //   "[ContactForm] Detected direct Convex response format:",
            //   directResult,
            // );
            result = { success: true, contactId: directResult.contactId };
          } else {
            result = directResult;
          }
        } else {
          result = directResult;
        }

        const endTime = Date.now();
        // console.log(
        //   `[ContactForm] Convex request took ${endTime - startTime}ms`,
        // );
        // console.log("[ContactForm] Convex submission result:", result);

        // Store budget info in localStorage for reference since it's not in Convex
        if (typeof window !== "undefined" && data.budget && result.contactId) {
          try {
            // Store both budget and timestamp locally since they're not in Convex schema
            const contactMetadata = {
              budget: data.budget,
              timestamp: Date.now(),
            };
            localStorage.setItem(
              `contact_metadata_${result.contactId}`,
              JSON.stringify(contactMetadata),
            );
          } catch (e) {
            console.log(
              "[ContactForm] Could not store metadata in localStorage",
            );
          }
        }
      } catch (convexError) {
        // console.error("[ContactForm] Convex API error:", convexError);
        throw new Error(
          t("contact.form.errors.submissionError", {
            default:
              "There was a problem sending your message. Please try again.",
          }),
        );
      }

      if (!isMounted.current) return;

      if (
        result &&
        (result.success === true ||
          (typeof result === "object" && "success" in result && result.success))
      ) {
        // console.log("[ContactForm] Submission successful!");
        setIsSuccess(true);
        toast.success(
          "Thank you for your message! We've received your inquiry and will get back to you within 24 hours.",
          { duration: 6000 },
        );
        // Reset form with default values
        form.reset({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "general",
          message: "",
          budget: "discuss",
        });

        // Set redirecting state
        setRedirecting(true);

        // Use a timeout to ensure loading state is resolved before redirect
        setTimeout(() => {
          if (isMounted.current) {
            // Redirect to thank you page
            router.push("/thank-you");
          }
        }, 1000); // 1-second delay for better UX and to ensure state updates complete
      } else if (
        typeof result === "string" &&
        (result as string).indexOf('success":true') >= 0
      ) {
        // Handle string response that might be JSON
        // console.log("[ContactForm] Received string success response");
        setIsSuccess(true);
        toast.success(
          "Thank you for your message! We've received your inquiry and will get back to you within 24 hours.",
          { duration: 6000 },
        );
        form.reset({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "general",
          message: "",
          budget: "discuss",
        });

        // Set redirecting state
        setRedirecting(true);

        // Redirect to thank you page after a short delay
        setTimeout(() => {
          if (isMounted.current) {
            router.push("/thank-you");
          }
        }, 1000);
      } else {
        const errorMessage = result?.error || "Failed to submit form";
        // console.error("[ContactForm] Submission failed:", errorMessage);
        setSubmitError(errorMessage);
        toast.error(errorMessage);
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("[ContactForm] Form submission error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setSubmitError(errorMessage);
      toast.error(errorMessage);
      setIsSubmitting(false);
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  const subjectOptions = [
    {
      value: "general",
      label: t("contact.form.contactTypes.general", {
        default: "General Inquiry",
      }),
    },
    {
      value: "project",
      label: t("contact.form.contactTypes.business", {
        default: "Business Opportunity",
      }),
    },
    {
      value: "design",
      label: t("contact.form.contactTypes.business", {
        default: "Business Opportunity",
      }),
    },
    {
      value: "development",
      label: t("contact.form.contactTypes.business", {
        default: "Business Opportunity",
      }),
    },
    {
      value: "mobile",
      label: t("contact.form.contactTypes.business", {
        default: "Business Opportunity",
      }),
    },
    {
      value: "ai",
      label: t("contact.form.contactTypes.business", {
        default: "Business Opportunity",
      }),
    },
    {
      value: "support",
      label: t("contact.form.contactTypes.support", {
        default: "Technical Support",
      }),
    },
    {
      value: "other",
      label: t("contact.form.contactTypes.general", {
        default: "General Inquiry",
      }),
    },
  ];

  const budgetOptions = [
    {
      value: "under-5k",
      label: t("contact.form.budgetOptions.under5k", {
        default: "Under $5,000",
      }),
    },
    {
      value: "5k-10k",
      label: t("contact.form.budgetOptions.fiveToTenK", {
        default: "$5,000 - $10,000",
      }),
    },
    {
      value: "10k-25k",
      label: t("contact.form.budgetOptions.tenToTwentyFiveK", {
        default: "$10,000 - $25,000",
      }),
    },
    {
      value: "25k-50k",
      label: t("contact.form.budgetOptions.twentyFiveToFiftyK", {
        default: "$25,000 - $50,000",
      }),
    },
    {
      value: "50k-100k",
      label: t("contact.form.budgetOptions.fiftyToHundredK", {
        default: "$50,000 - $100,000",
      }),
    },
    {
      value: "over-100k",
      label: t("contact.form.budgetOptions.overHundredK", {
        default: "Over $100,000",
      }),
    },
    {
      value: "discuss",
      label: t("contact.form.budgetOptions.letsDiscuss", {
        default: "Let's discuss",
      }),
    },
  ];

  // We no longer need this since we set defaults in the main useEffect

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {t("contact.form.title", { default: "Send us a Message" })}
        </CardTitle>
        <p className="text-muted-foreground text-center">
          {t("contact.form.subtitle", {
            default: "We'll get back to you as soon as possible",
          })}
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t("contact.form.nameLabel", { default: "Your Name" })} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("contact.form.namePlaceholder", {
                        default: "Enter your name",
                      })}
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t("contact.form.emailLabel", {
                      default: "Email Address",
                    })}{" "}
                    *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("contact.form.emailPlaceholder", {
                        default: "name@example.com",
                      })}
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {t("contact.form.phoneLabel", { default: "Phone Number" })}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder={t("contact.form.phonePlaceholder", {
                        default: "+1 (123) 456-7890",
                      })}
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormDescription>
                    {t("contact.form.phoneDescription", {
                      default: "Optional, but helpful for quick follow-ups",
                    })}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company Field */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {t("contact.form.companyLabel", { default: "Company" })}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("contact.form.companyPlaceholder", {
                        default: "Your organization",
                      })}
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormDescription>
                    {t("contact.form.companyDescription", {
                      default: "Optional company or organization name",
                    })}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject Field */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("contact.form.subjectLabel", {
                      default: "How can we help?",
                    })}{" "}
                    *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || "general"}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                        <SelectValue
                          placeholder={t("contact.form.subjectPlaceholder", {
                            default: "Select a topic",
                          })}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjectOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {t("contact.form.subjectDescription", {
                      default: "Choose the topic that best fits your inquiry",
                    })}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget Field */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("contact.form.budgetLabel", {
                      default: "Project Budget",
                    })}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || "discuss"}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                        <SelectValue
                          placeholder={t("contact.form.budgetPlaceholder", {
                            default: "Select your budget range",
                          })}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budgetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {t("contact.form.budgetDescription", {
                      default: "Helps us provide appropriate solutions",
                    })}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {t("contact.form.messageLabel", {
                      default: "Your Message",
                    })}{" "}
                    *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("contact.form.messagePlaceholder")}
                      className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-vertical"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        console.log(
                          "[ContactForm] Message updated:",
                          e.target.value,
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/1000{" "}
                    {t("contact.form.characters", { default: "characters" })}
                    {field.value?.length > 0 && field.value?.length < 3 && (
                      <span className="text-red-500 ml-2">
                        (
                        {t("contact.form.validation.minLength", {
                          default: "Message is too short",
                        })}
                        )
                      </span>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 transition-all duration-200"
                disabled={isSubmitting}
                onClick={() => {
                  // console.log("[ContactForm] Submit button clicked");
                  // console.log("[ContactForm] Form state:", form.formState);
                  // console.log("[ContactForm] Form values:", form.getValues());
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("contact.form.sending", { default: "Sending..." })}
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-2"
                    data-testid="send-button"
                  >
                    <Send className="h-4 w-4" />
                    {t("contact.form.submit", {
                      default: "Send Message",
                    })}
                  </div>
                )}
              </Button>
            </div>

            {/* Privacy Notice */}
            {/* <p className="text-xs text-muted-foreground text-center mt-4">
              {t("contact.form.privacyNotice")}
            </p> */}

            {/* Error Message */}
            {submitError && (
              <div
                className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm"
                data-testid="error-message"
              >
                <p className="font-medium">{t("contact.form.errorTitle")}</p>
                <p>{submitError}</p>
              </div>
            )}

            {/* Convex Connection Status */}
            {!isInitialized && (
              <div
                className="mt-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-md text-sm"
                data-testid="connection-status"
              >
                <p className="font-medium">
                  {t("contact.form.systemStatus", { default: "System Status" })}
                </p>
                <p>
                  {t("contact.form.connectionWarning", {
                    default:
                      "We're having trouble connecting to our server. Your message will still be saved locally until connection is restored.",
                  })}
                </p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
