"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "../../contexts/language-context";
import Image from "next/image";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/10" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl gradient-text md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6"
          >
            {t("hero.subtitle") ||
              "We transform ideas into exceptional digital solutions that drive growth and deliver results."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-6"
          >
            <Button
              asChild
              size="lg"
              className="px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform duration-200"
            >
              <Link href="/initialize-project">
                {t("hero.startProject")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            {/* <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold group hover:scale-105 transition-transform duration-200"
            >
              <Link href="#work" className="flex items-center">
                {t("hero.viewWork")}
                <Play className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button> */}
          </motion.div>

          {/* Logo Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center mt-2 mb-2"
          >
            <Image
              src="/ngc-logo.png"
              alt="NGC Logo"
              width={350}
              height={120}
              priority
              className="w-auto h-auto max-w-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
