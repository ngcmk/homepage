"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SkeletonLoader from "../components/SkeletonLoader";
import { ThemeToggle } from "../components/ThemeToggle";
import { toast } from "sonner";
import {
  Star,
  Heart,
  Download,
  Share,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

export default function UIShowcase() {
  const [progress, setProgress] = useState(33);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const badges = [
    { variant: "default" as const, label: "New" },
    { variant: "secondary" as const, label: "Popular" },
    { variant: "outline" as const, label: "Featured" },
    { variant: "destructive" as const, label: "Limited" },
  ];

  const avatars = [
    { name: "John Doe", initials: "JD", image: "/avatars/john.jpg" },
    { name: "Sarah Miller", initials: "SM", image: "/avatars/sarah.jpg" },
    { name: "Mike Johnson", initials: "MJ", image: "/avatars/mike.jpg" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">UI Showcase</h1>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#components"
                    className={navigationMenuTriggerStyle()}
                  >
                    Components
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#examples"
                    className={navigationMenuTriggerStyle()}
                  >
                    Examples
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            shadcn/ui Components Showcase
          </h2>
          <p className="text-muted-foreground text-lg">
            Demonstrating all the implemented UI improvements with shadcn/ui
            components.
          </p>
        </div>

        <Tabs defaultValue="buttons" className="space-y-8">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="buttons">Buttons & Badges</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="data">Data Display</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="theme">Dark Mode</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          {/* Buttons & Badges */}
          <TabsContent value="buttons" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {badges.map((badge, index) => (
                      <Badge key={index} variant={badge.variant}>
                        {badge.label}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Featured
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Heart className="h-3 w-3" />
                      Favorite
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forms */}
          <TabsContent value="forms" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Form Elements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter your message" />
                  </div>
                  <Button className="w-full">Submit Form</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress & Loading</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setProgress(Math.max(0, progress - 10))}
                      >
                        -10%
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setProgress(Math.min(100, progress + 10))
                        }
                      >
                        +10%
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowSkeleton(!showSkeleton)}
                    >
                      Toggle Skeleton Loading
                    </Button>
                    {showSkeleton && <SkeletonLoader type="form" />}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Data Display */}
          <TabsContent value="data" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Avatars</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    {avatars.map((avatar, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={avatar.image} alt={avatar.name} />
                          <AvatarFallback>{avatar.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{avatar.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Online
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>XS</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>LG</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accordion</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is ngc?</AccordionTrigger>
                      <AccordionContent>
                        ngc is a creative web solutions company specializing in
                        modern web development, mobile apps, and AI integration.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        What services do you offer?
                      </AccordionTrigger>
                      <AccordionContent>
                        We offer web development, mobile app development, UI/UX
                        design, AI integration, and digital transformation
                        services.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How can I get started?
                      </AccordionTrigger>
                      <AccordionContent>
                        You can get started by contacting us through our contact
                        form or by initializing a new project through our
                        project setup wizard.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Navigation */}
          <TabsContent value="navigation" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Dialog</CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Example Dialog</DialogTitle>
                        <DialogDescription>
                          This is an example of a dialog component. It can be
                          used for modals, confirmations, and detailed views.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>Dialog content goes here...</p>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Confirm</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sheet (Mobile Menu)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <Menu className="h-4 w-4 mr-2" />
                        Open Sheet
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Navigation Menu</SheetTitle>
                        <SheetDescription>
                          This is an example of a sheet component used for
                          mobile navigation.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="space-y-4 mt-6">
                        <a
                          href="#"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          Home
                        </a>
                        <a
                          href="#"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          Services
                        </a>
                        <a
                          href="#"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          Portfolio
                        </a>
                        <a
                          href="#"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          Contact
                        </a>
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feedback */}
          <TabsContent value="feedback" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Toast Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={() =>
                      toast.success("Success! Operation completed.")
                    }
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.error("Error! Something went wrong.")}
                  >
                    Error Toast
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      toast.info("Info: This is an information message.")
                    }
                  >
                    Info Toast
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => toast("Default toast message.")}
                  >
                    Default Toast
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Icons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Success state</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span>Error state</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    <span>Information state</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span>Pending state</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Dark Mode */}
          <TabsContent value="theme" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Toggle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Dark Mode Toggle</h4>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <ThemeToggle />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Theme Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Automatic system theme detection</li>
                      <li>• Smooth transitions between themes</li>
                      <li>• Persistent theme preference</li>
                      <li>• All components support dark mode</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color Palette</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Background Colors</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-background border rounded"></div>
                          <span className="text-sm">Background</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-card border rounded"></div>
                          <span className="text-sm">Card</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-muted rounded"></div>
                          <span className="text-sm">Muted</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Text Colors</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-foreground rounded"></div>
                          <span className="text-sm">Foreground</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-muted-foreground rounded"></div>
                          <span className="text-sm">Muted Text</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-primary rounded"></div>
                          <span className="text-sm">Primary</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dark Mode Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Sun className="h-5 w-5" />
                        <span>Light Theme</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex space-x-2">
                        <Badge>Primary</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                      </div>
                      <Separator />
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>LT</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Light Mode</p>
                          <p className="text-xs text-muted-foreground">
                            Active
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Moon className="h-5 w-5" />
                        <span>Dark Theme</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex space-x-2">
                        <Badge>Primary</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                      </div>
                      <Separator />
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>DT</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Dark Mode</p>
                          <p className="text-xs text-muted-foreground">
                            Active
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>System</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex space-x-2">
                        <Badge variant="outline">Auto</Badge>
                        <Badge variant="secondary">Adaptive</Badge>
                      </div>
                      <Separator />
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>SY</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">System Theme</p>
                          <p className="text-xs text-muted-foreground">Auto</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout */}
          <TabsContent value="layout" className="space-y-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Skeleton Loading States</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Services Skeleton</h4>
                    <SkeletonLoader type="services" count={3} />
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">Testimonials Skeleton</h4>
                    <SkeletonLoader type="testimonials" count={2} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card Layouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <Card
                        key={item}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Card {item}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge variant="secondary">Category</Badge>
                            <Badge variant="outline">Tag</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            This is an example card with badges and proper
                            spacing.
                          </p>
                          <Separator className="my-3" />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  U{item}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">User {item}</span>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Share className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Implementation Summary */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Implementation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This showcase demonstrates all the UI improvements implemented
                based on the recommendations in the
                UI_IMPROVEMENT_SUGGESTIONS.md document:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    ✅ Completed High Priority
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Form Components with validation</li>
                    <li>• NavigationMenu implementation</li>
                    <li>• Toast notifications (Sonner)</li>
                    <li>• Progress component for multi-step forms</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    ✅ Completed Medium Priority
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Badge components for categorization</li>
                    <li>• Avatar components for testimonials</li>
                    <li>• Skeleton loading states</li>
                    <li>• Sheet component for mobile navigation</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  ✅ Completed Advanced Features
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Accordion for expandable content</li>
                  <li>• Tabs for content organization</li>
                  <li>• Dialog components for modals</li>
                  <li>• Separator for visual content division</li>
                  <li>• Dark mode with theme switching</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
