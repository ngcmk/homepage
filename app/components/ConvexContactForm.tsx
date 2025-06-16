"use client";

import { useEffect, useRef, useState } from "react";
import { useContactForm } from "../hooks/use-contacts";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  contactType: "general" | "business" | "support" | "partnership" | "careers";
  priority: "low" | "medium" | "high" | "urgent";
  gdprConsent: boolean;
  marketingConsent: boolean;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
  contactType: "general",
  priority: "medium",
  gdprConsent: false,
  marketingConsent: false,
};

export function ConvexContactForm() {
  const router = useRouter();
  const isMounted = useRef(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [redirecting, setRedirecting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  useEffect(() => {
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Handle redirection when submission is successful
  useEffect(() => {
    if (submitStatus.type === "success" && !redirecting) {
      setRedirecting(true);
      setTimeout(() => {
        if (isMounted.current) {
          router.push("/thank-you");
        }
      }, 1500);
    }
  }, [submitStatus.type, redirecting, router]);

  const { submitContact, isInitialized, createContactAvailable } =
    useContactForm();

  // Log initial form state for debugging
  useEffect(() => {
    console.log("[ConvexContactForm] Initial form state:", formData);
    console.log("[ConvexContactForm] Convex initialized:", isInitialized);
    console.log(
      "[ConvexContactForm] submitContact available:",
      typeof submitContact === "function",
    );
    console.log(
      "[ConvexContactForm] createContact available:",
      createContactAvailable,
    );
  }, [isInitialized, createContactAvailable, formData, submitContact]);

  const handleInputChange = (
    field: keyof ContactFormData,
    value: string | boolean,
  ) => {
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Clear form data completely
  const resetForm = () => {
    setFormData({ ...initialFormData });
    setSubmitStatus({ type: null, message: "" });
    // Reset checkbox UI state
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox: any) => {
        checkbox.checked = false;
      });
  };

  const validateForm = (): boolean => {
    console.log("[ConvexContactForm] Validating form...");

    if (!formData.name.trim()) {
      console.log("[ConvexContactForm] Validation failed: Name is required");
      setSubmitStatus({ type: "error", message: "Name is required" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      console.log(
        "[ConvexContactForm] Validation failed: Valid email is required",
      );
      setSubmitStatus({ type: "error", message: "Valid email is required" });
      return false;
    }

    if (!formData.message.trim()) {
      console.log("[ConvexContactForm] Validation failed: Message is required");
      setSubmitStatus({ type: "error", message: "Message is required" });
      return false;
    }

    if (!formData.gdprConsent) {
      console.log(
        "[ConvexContactForm] Validation failed: GDPR consent is required",
      );
      setSubmitStatus({ type: "error", message: "GDPR consent is required" });
      return false;
    }

    // Check if Convex is available
    if (!isInitialized || !createContactAvailable) {
      console.log("[ConvexContactForm] Validation failed: System unavailable");
      setSubmitStatus({
        type: "error",
        message: "System is currently unavailable. Please try again later.",
      });
      return false;
    }

    console.log("[ConvexContactForm] Form validation passed");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[ConvexContactForm] Form submitted with data:", formData);

    if (!validateForm()) {
      console.log("[ConvexContactForm] Form validation failed");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Verify submission function is available
    if (typeof submitContact !== "function") {
      console.error("[ConvexContactForm] submitContact is not a function");
      setSubmitStatus({
        type: "error",
        message:
          "System error: Contact submission is not available. Please try again later.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("[ConvexContactForm] *** FORM SUBMISSION STARTED ***");
      console.log("[ConvexContactForm] Preparing to submit contact form...");

      // Only use valid fields from the form data
      const validFields = { ...formData };

      // Prepare the data with trimmed values
      const submissionData = {
        name: validFields.name.trim(),
        email: validFields.email.trim(),
        phone: validFields.phone.trim() || undefined,
        company: validFields.company.trim() || undefined,
        subject: validFields.subject.trim() || undefined,
        message: validFields.message.trim(),
        contactType: validFields.contactType,
        priority: validFields.priority,
        gdprConsent: validFields.gdprConsent,
        marketingConsent: validFields.marketingConsent,
      };

      console.log("[ConvexContactForm] Submission data:", submissionData);

      // Log timestamp separately for debugging only
      console.log("[ConvexContactForm] Form submission time:", Date.now());

      // Start timer to track submission time
      const startTime = Date.now();

      // Direct call without timeout handling
      let result = await submitContact(submissionData);

      // Check for direct Convex response format
      if (typeof result === "object" && result !== null) {
        if (
          "success" in result &&
          result.success === true &&
          "contactId" in result
        ) {
          console.log(
            "[ConvexContactForm] Detected direct Convex response format",
            result,
          );
          result = { success: true, contactId: result.contactId };
        }
      }

      // Calculate submission time
      const endTime = Date.now();
      console.log(
        `[ConvexContactForm] Submission took ${endTime - startTime}ms`,
      );

      console.log("[ConvexContactForm] Submission result:", result);
      if (
        result &&
        (result.success === true ||
          (typeof result === "object" && "success" in result && result.success))
      ) {
        console.log("[ConvexContactForm] Submission successful!");
        setSubmitStatus({
          type: "success",
          message:
            "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        });
        // Reset the form completely with initial values
        setFormData({ ...initialFormData });
        // Clear any checkboxes and reset focus
        document
          .querySelectorAll('input[type="checkbox"]')
          .forEach((checkbox: any) => {
            checkbox.checked = false;
          });
        toast.success("Contact form submitted successfully!");

        // Set redirecting state
        setRedirecting(true);

        // Use a timeout to ensure loading state is resolved before redirect
        setTimeout(() => {
          if (isMounted.current) {
            // Redirect to thank you page
            router.push("/thank-you");
          }
        }, 1000); // 1-second delay for better UX and to ensure state updates complete
      } else {
        console.error("[ConvexContactForm] Submission failed:", result?.error);
        setSubmitStatus({
          type: "error",
          message: result?.error || "Failed to send message. Please try again.",
        });
        toast.error("Failed to submit contact form");
      }
    } catch (error) {
      console.error("[ConvexContactForm] Submission exception:", error);

      // More detailed error logging
      if (error instanceof Error) {
        console.error("[ConvexContactForm] Error name:", error.name);
        console.error("[ConvexContactForm] Error message:", error.message);
        console.error("[ConvexContactForm] Error stack:", error.stack);
      }

      // Handle submission errors directly
      setIsSubmitting(false);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";

      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
      toast.error(errorMessage);
      return; // Stop execution here
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  // If submission was successful, show success message with option to submit another
  if (submitStatus.type === "success") {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold">Message Sent!</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {submitStatus.message}
            </p>
            <Button
              onClick={() => {
                resetForm();
              }}
              variant="outline"
              className="mt-4"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Contact Us
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Alert - only show errors, success has its own view */}
          {submitStatus.type === "error" && (
            <Alert className="border-red-500">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700">
                {submitStatus.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Your company name"
              />
            </div>
          </div>

          {/* Contact Type and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactType">Contact Type</Label>
              <Select
                value={formData.contactType}
                defaultValue={formData.contactType}
                onValueChange={(value) => {
                  console.log(
                    "[ConvexContactForm] Contact type selected:",
                    value,
                  );
                  handleInputChange(
                    "contactType",
                    value as
                      | "general"
                      | "business"
                      | "support"
                      | "partnership"
                      | "careers",
                  );
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select contact type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="careers">Careers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                defaultValue={formData.priority}
                onValueChange={(value) => {
                  console.log("[ConvexContactForm] Priority selected:", value);
                  handleInputChange(
                    "priority",
                    value as "low" | "medium" | "high" | "urgent",
                  );
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder="Brief description of your inquiry"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Please describe your inquiry in detail..."
              className="min-h-[120px]"
              required
            />
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="gdprConsent"
                checked={formData.gdprConsent}
                onCheckedChange={(checked: boolean) =>
                  handleInputChange("gdprConsent", checked)
                }
                required
              />
              <Label htmlFor="gdprConsent" className="text-sm">
                I consent to the processing of my personal data for the purpose
                of responding to my inquiry. *
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketingConsent"
                checked={formData.marketingConsent}
                onCheckedChange={(checked: boolean) =>
                  handleInputChange("marketingConsent", checked)
                }
              />
              <Label htmlFor="marketingConsent" className="text-sm">
                I would like to receive marketing communications and updates
                (optional).
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isInitialized || !createContactAvailable}
            onClick={() => {
              console.log("[ConvexContactForm] Submit button clicked");
              console.log("[ConvexContactForm] Current form state:", formData);
              console.log(
                "[ConvexContactForm] Convex initialized:",
                isInitialized,
              );
              console.log(
                "[ConvexContactForm] createContact available:",
                createContactAvailable,
              );
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : !isInitialized || !createContactAvailable ? (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                System Unavailable
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
