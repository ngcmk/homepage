"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavigationItems = () => (
    <>
      {isHomePage ? (
        <>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#services"
              className={navigationMenuTriggerStyle()}
            >
              {t("nav.services")}
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <NavigationMenuLink
              href="#portfolio"
              className={navigationMenuTriggerStyle()}
            >
              {t("nav.work")}
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#testimonials"
              className={navigationMenuTriggerStyle()}
            >
              {t("nav.clients")}
            </NavigationMenuLink>
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#contact"
              className={navigationMenuTriggerStyle()}
            >
              {t("nav.contact")}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </>
      ) : (
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">{t("nav.home")}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      )}
    </>
  );

  const MobileNavigationItems = () => (
    <nav className="flex flex-col space-y-3">
      {isHomePage ? (
        <>
          <a
            href="#services"
            className="block px-4 py-3 text-foreground hover:bg-muted hover:text-foreground rounded-lg transition-all duration-200 text-base font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("nav.services")}
          </a>
          <a
            href="#portfolio"
            className="block px-4 py-3 text-foreground hover:bg-muted hover:text-foreground rounded-lg transition-all duration-200 text-base font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("nav.work")}
          </a>
          <a
            href="#testimonials"
            className="block px-4 py-3 text-foreground hover:bg-muted hover:text-foreground rounded-lg transition-all duration-200 text-base font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("nav.clients")}
          </a>
          <a
            href="#contact"
            className="block px-4 py-3 text-foreground hover:bg-muted hover:text-foreground rounded-lg transition-all duration-200 text-base font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("nav.contact")}
          </a>
        </>
      ) : (
        <Link
          href="/"
          className="block px-4 py-3 text-foreground hover:bg-muted hover:text-foreground rounded-lg transition-all duration-200 text-base font-medium"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {t("nav.home")}
        </Link>
      )}
    </nav>
  );

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm border-b py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="gradient-text">ngc</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationItems />
              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild size="sm" className="ml-4">
              <Link href="/initialize-project">{t("nav.startProject")}</Link>
            </Button>

            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="px-6 py-6 border-b bg-background">
                    <SheetTitle className="text-left text-xl font-bold">
                      <span className="gradient-text">ngc</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 px-6 py-6 bg-background">
                    <MobileNavigationItems />
                  </div>

                  <div className="px-6 py-6 border-t bg-muted/50">
                    <Button
                      asChild
                      className="w-full h-12 text-base font-medium"
                    >
                      <Link
                        href="/initialize-project"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t("nav.startProject")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
