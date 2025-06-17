"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  Clock,
  Send,
  Zap,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Linkedin,
  Github,
  Twitter,
  AlertCircle,
  Wifi,
  WifiOff,
  Instagram,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../../contexts/language-context";
import ContactForm from "../ContactForm";
import { useCreateContact } from "../../hooks/use-contacts";

interface ContactHubProps {
  className?: string;
}

export default function ContactHub({ className = "" }: ContactHubProps) {
  const { t } = useLanguage();
  const [selectedContactMethod, setSelectedContactMethod] = useState<
    string | null
  >(null);
  const [convexStatus, setConvexStatus] = useState<
    "connected" | "error" | "unknown"
  >("unknown");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const createContact = useCreateContact();

  useEffect(() => {
    const checkConvexConnection = () => {
      try {
        if (createContact !== undefined) {
          setConvexStatus("connected");
        } else {
          setConvexStatus("error");
        }
      } catch (error) {
        setConvexStatus("error");
      }
    };

    checkConvexConnection();
  }, [createContact]);

  const contactMethods = [
    {
      id: "email",
      icon: Mail,
      title: "Email Us",
      subtitle: "Get a response within 24 hours",
      description: "Send us a detailed message about your project",
      action: "Send Email",
      href: "mailto:contact@ngc.solutions",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      badge: "24h Response",
      stats: "95% response rate",
    },
    {
      id: "call",
      icon: Phone,
      title: "Schedule a Call",
      subtitle: "Free 30-minute consultation",
      description: "Book a call to discuss your project in detail",
      action: "Book Call",
      href: "/book-consultation",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      badge: "Free",
      stats: "Available Mon-Fri",
    },
    {
      id: "project",
      icon: Zap,
      title: "Start Project",
      subtitle: "Begin with our project wizard",
      description: "Get an instant quote and project timeline",
      action: "Get Started",
      href: "/initialize-project",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      badge: "Instant Quote",
      stats: "5-min setup",
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "Office Location",
      value: "Remote & Global",
      description: "Serving clients worldwide",
    },
    {
      icon: Phone,
      label: "CEO Phone",
      value: "+389 78 209 406",
      description: "Call us ...",
    },
    {
      icon: Phone,
      label: "CTO Phone",
      value: "+389 70 294 386",
      description: "Call us ...",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon - Fri, 9AM - 6PM CET",
      description: "Emergency support available",
    },
    {
      icon: Globe,
      label: "Languages",
      value: "English, Macedonian, Serbian",
      description: "Multilingual support",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com/company/ngc-solutions",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "https://twitter.com/ngc_solutions",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://instagram.com/ngc_solutions",
      color: "hover:text-pink-600",
    },
    {
      icon:Facebook,
      name: "Facebook",
      href: "https://facebook.com/ngc_solutions",
      color: "hover:text-blue-600",
    }
  ];

  const testimonialQuotes = [
    {
      text: "Outstanding service and incredible attention to detail. Highly recommended!",
      author: "Sarah M.",
      role: "CEO, TechStart",
      rating: 5,
    },
    {
      text: "The team delivered exactly what we needed, on time and within budget.",
      author: "Michael R.",
      role: "CTO, InnovateCorp",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="contact"
      className={`py-20 md:py-32 bg-gradient-to-b from-background to-muted/20 ${className}`}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6"
          >
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm">
              Let's Work Together
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            {t("contact.title") || "Get In Touch"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("contact.subtitle") ||
              "Ready to bring your ideas to life? Choose how you'd like to connect with us."}
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const isSelected = selectedContactMethod === method.id;

            return (
              <motion.div key={method.id} variants={itemVariants}>
                <Card
                  className={`
                    group cursor-pointer transition-all duration-300 h-full
                    border-2 hover:shadow-lg hover:shadow-primary/10
                    ${isSelected ? "border-primary/50 bg-primary/5" : "border-border/50 hover:border-primary/30"}
                    bg-gradient-to-br ${method.color}
                  `}
                  onClick={() => setSelectedContactMethod(method.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`p-3 rounded-full bg-background/80 border ${method.borderColor}`}
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {method.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">
                      {method.title}
                    </CardTitle>
                    <p className="text-sm text-primary font-medium">
                      {method.subtitle}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {method.description}
                    </p>
                    <Separator className="mb-4" />
                    <div className="flex items-center justify-between">
                      {/* <span className="text-xs text-muted-foreground">
                        {method.stats}
                      </span> */}
                      <Button
                        asChild
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        className="group/btn"
                      >
                        <Link href={method.href}>
                          <span>{method.action}</span>
                          <ArrowRight className="w-3 h-3 ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Send className="w-5 h-5 text-primary" />
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                </div>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>

                {/* Connection status indicator */}
                {convexStatus === "connected" && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-green-600 bg-green-50 p-1.5 px-2 rounded-md">
                    <Wifi className="h-3.5 w-3.5" />
                    <span>Connected to database</span>
                  </div>
                )}
                {convexStatus === "error" && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-1.5 px-2 rounded-md">
                    <WifiOff className="h-3.5 w-3.5" />
                    <span>
                      Using offline mode - messages will be sent via email
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Info */}
            <Card className="border border-border/50 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{info.label}</div>
                        <div className="text-foreground font-semibold">
                          {info.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {info.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border border-border/50 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          p-3 bg-background border border-border/50 rounded-lg
                          transition-all duration-200 hover:border-primary/30
                          ${social.color}
                        `}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Testimonials */}
            {/* <Card className="border border-border/50 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Client Love</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {testimonialQuotes.map((quote, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex space-x-1">
                      {[...Array(quote.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "{quote.text}"
                    </p>
                    <div className="text-xs">
                      <span className="font-medium">{quote.author}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        - {quote.role}
                      </span>
                    </div>
                    {index < testimonialQuotes.length - 1 && (
                      <Separator className="mt-3" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card> */}

            {/* Quick Start CTA */}
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-3">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Ready to Start?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get an instant quote for your project in just 5 minutes.
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link href="/initialize-project">
                    <Zap className="w-4 h-4 mr-2" />
                    Start Your Project
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
