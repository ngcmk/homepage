"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../contexts/language-context";
import { Mail, Bell, CheckCircle, ArrowRight } from "lucide-react";

// Validation schema
const newsletterFormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  firstName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .optional()
    .or(z.literal("")),
});

type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

interface NewsletterFormProps {
  onSubmit?: (data: NewsletterFormValues) => void;
  className?: string;
  variant?: "default" | "minimal" | "inline";
  title?: string;
  description?: string;
  showBenefits?: boolean;
}

export default function NewsletterForm({
  onSubmit,
  className,
  variant = "default",
  title,
  description,
  showBenefits = true,
}: NewsletterFormProps) {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
    },
  });

  const handleSubmit = async (data: NewsletterFormValues) => {
    try {
      console.log("Newsletter subscription:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call parent onSubmit if provided
      if (onSubmit) {
        onSubmit(data);
      } else {
        // Default behavior
        setIsSubmitted(true);
        form.reset();

        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    }
  };

  const benefits = [
    "Weekly design & development insights",
    "Latest industry trends and best practices",
    "Exclusive project case studies",
    "Early access to our new services",
    "No spam, unsubscribe anytime",
  ];

  // Success state
  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Successfully Subscribed!
              </h3>
              <p className="text-green-600 text-sm">
                Thank you for subscribing to our newsletter. You'll receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <div className={className}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Subscribing...
                </div>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  // Inline variant
  if (variant === "inline") {
    return (
      <div className={className}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="shrink-0"
              >
                {form.formState.isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
              </Button>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }

  // Default variant
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Bell className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">
          {title || "Stay Updated"}
        </CardTitle>
        <p className="text-muted-foreground">
          {description || "Get the latest insights on web design, development, and digital strategy delivered to your inbox."}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {showBenefits && (
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
              What you'll get:
            </h4>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormDescription>
                    Help us personalize your newsletter experience
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Subscribing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Subscribe to Newsletter
                </div>
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              Free
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Weekly
            </Badge>
            <Badge variant="secondary" className="text-xs">
              No Spam
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
