"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ContactForm from "../components/ContactForm";
import NewsletterForm from "../components/NewsletterForm";
import SearchForm from "../components/SearchForm";
import PageBreadcrumb from "../components/Breadcrumb";
import { useLanguage } from "../contexts/language-context";
import {
  FileText,
  Mail,
  Search,
  MessageSquare,
  Bell,
  Filter,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

export default function FormsDemo() {
  const { t } = useLanguage();

  const handleContactSubmit = (data: any) => {
    console.log("[FormsDemo] Contact form data received:", data);
    console.log("[FormsDemo] Form submission processed successfully");

    // Use toast instead of alert for better UX
    toast.success(
      `Thank you ${data.name}, we'll contact you at ${data.email} soon.`,
      {
        duration: 5000,
      },
    );

    // Simulate API call
    console.log("[FormsDemo] Would normally send this data to an API endpoint");
    return true;
  };

  const handleNewsletterSubmit = (data: any) => {
    console.log("Newsletter form data:", data);
    alert("Newsletter subscription successful!");
  };

  const handleSearchSubmit = (data: any) => {
    console.log("Search form data:", data);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24">
      <PageBreadcrumb />
      <div className="container mx-auto px-6 pt-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Form Components Demo</h1>
            </div>
            <p className="text-xl text-neutral-600 mb-6">
              Explore our comprehensive form components with validation,
              accessibility, and modern design.
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                React Hook Form
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Zod Validation
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                shadcn/ui Components
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Accessibility Ready
              </Badge>
            </div>
          </div>

          {/* Form Components Showcase */}
          <Tabs defaultValue="contact" className="space-y-8">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full max-w-2xl mx-auto h-auto p-1">
              <TabsTrigger
                value="contact"
                className="flex items-center gap-2 py-3"
              >
                <MessageSquare className="w-4 h-4" />
                Contact Form
              </TabsTrigger>
              <TabsTrigger
                value="newsletter"
                className="flex items-center gap-2 py-3"
              >
                <Bell className="w-4 h-4" />
                Newsletter
              </TabsTrigger>
              <TabsTrigger
                value="search"
                className="flex items-center gap-2 py-3"
              >
                <Search className="w-4 h-4" />
                Search
              </TabsTrigger>
            </TabsList>

            {/* Contact Form Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  Contact Form Component
                </h2>
                <p className="text-neutral-600">
                  A comprehensive contact form with validation, field
                  descriptions, and professional styling.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Demo */}
                <div>
                  <ContactForm
                    onSubmit={handleContactSubmit}
                    className="max-w-lg mx-auto"
                  />
                </div>

                {/* Features */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        Key Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Advanced Validation</p>
                          <p className="text-sm text-muted-foreground">
                            Email validation, phone number formatting, required
                            field checks
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Rich Field Types</p>
                          <p className="text-sm text-muted-foreground">
                            Text inputs, textareas, select dropdowns, with icons
                            and descriptions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Loading States</p>
                          <p className="text-sm text-muted-foreground">
                            Animated loading indicators and disabled states
                            during submission
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Accessibility</p>
                          <p className="text-sm text-muted-foreground">
                            ARIA labels, keyboard navigation, screen reader
                            support
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        Technical Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Validation:
                        </span>
                        <span className="font-medium">Zod Schema</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Form Library:
                        </span>
                        <span className="font-medium">React Hook Form</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          UI Components:
                        </span>
                        <span className="font-medium">shadcn/ui</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          TypeScript:
                        </span>
                        <span className="font-medium">Full Support</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Newsletter Form Tab */}
            <TabsContent value="newsletter" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  Newsletter Form Variants
                </h2>
                <p className="text-neutral-600">
                  Multiple newsletter form variants for different use cases and
                  design requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Default Variant */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">
                    Default Variant
                  </h3>
                  <NewsletterForm
                    variant="default"
                    onSubmit={handleNewsletterSubmit}
                  />
                </div>

                {/* Minimal Variant */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">
                    Minimal Variant
                  </h3>
                  <Card className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg">Stay Updated</CardTitle>
                      <CardDescription>Get our latest updates</CardDescription>
                    </CardHeader>
                    <NewsletterForm
                      variant="minimal"
                      onSubmit={handleNewsletterSubmit}
                    />
                  </Card>
                </div>

                {/* Inline Variant */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">
                    Inline Variant
                  </h3>
                  <Card className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg">Quick Subscribe</CardTitle>
                      <CardDescription>Join our mailing list</CardDescription>
                    </CardHeader>
                    <NewsletterForm
                      variant="inline"
                      onSubmit={handleNewsletterSubmit}
                    />
                  </Card>
                </div>
              </div>

              {/* Newsletter Features */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Newsletter Form Features</CardTitle>
                  <CardDescription>
                    Flexible newsletter subscription forms with multiple
                    variants and customization options.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Variant Options</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Default - Full featured with benefits list
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Minimal - Simple email input and submit
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Inline - Horizontal layout for headers/footers
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Customization</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Custom titles and descriptions
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Show/hide benefits section
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Success state animations
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Search Form Tab */}
            <TabsContent value="search" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  Search Form Components
                </h2>
                <p className="text-neutral-600">
                  Advanced search forms with filtering, suggestions, and results
                  display.
                </p>
              </div>

              <div className="space-y-8">
                {/* Default Search Form */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Full Featured Search
                  </h3>
                  <SearchForm
                    variant="default"
                    onSearch={handleSearchSubmit}
                    showFilters={true}
                    showResults={true}
                  />
                </div>

                {/* Search Variants */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Header Search
                    </h3>
                    <Card className="p-6">
                      <SearchForm
                        variant="header"
                        placeholder="Search the site..."
                        onSearch={handleSearchSubmit}
                      />
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Minimal Search
                    </h3>
                    <Card className="p-6">
                      <SearchForm
                        variant="minimal"
                        placeholder="Quick search..."
                        onSearch={handleSearchSubmit}
                      />
                    </Card>
                  </div>
                </div>

                {/* Search Features */}
                <Card>
                  <CardHeader>
                    <CardTitle>Search Form Capabilities</CardTitle>
                    <CardDescription>
                      Powerful search functionality with multiple display modes
                      and advanced features.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          Search Features
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Real-time suggestions
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Recent searches memory
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Category filtering
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Sort options
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          Display Modes
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Full featured (filters + results)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Header mode (dropdown suggestions)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Minimal (input + button only)
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          User Experience
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Loading states
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Empty state handling
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Keyboard navigation
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Mobile responsive
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Implementation Guide */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-2xl">Implementation Guide</CardTitle>
              <CardDescription>
                How to use these form components in your projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Quick Start</h3>
                  <div className="bg-neutral-100 p-4 rounded-lg text-sm font-mono">
                    <div className="text-blue-600">import</div>
                    <div className="ml-2">
                      ContactForm from './components/ContactForm';
                    </div>
                    <div className="mt-2">
                      <div className="text-green-600">{`// Basic usage`}</div>
                      <div>
                        &lt;ContactForm onSubmit={`{handleSubmit}`} /&gt;
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Dependencies</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">react-hook-form</Badge>
                      Form management
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">zod</Badge>
                      Schema validation
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">@hookform/resolvers</Badge>
                      Zod integration
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">shadcn/ui</Badge>
                      UI components
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
