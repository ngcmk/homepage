"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-6"}`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="gradient-text">ngc</span>
            </span>
          </Link>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-700 hover:text-neutral-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <ul
            className={`md:flex items-center space-y-6 md:space-y-0 md:space-x-8 ${isMenuOpen ? "absolute left-0 right-0 top-full bg-white shadow-lg p-6" : "hidden"} md:relative md:bg-transparent md:shadow-none md:p-0`}
          >
            {isHomePage ? (
              <>
                <li>
                  <a
                    href="#services"
                    className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm uppercase tracking-wide font-medium"
                  >
                    {t("nav.services")}
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#portfolio"
                    className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm uppercase tracking-wide font-medium"
                  >
                    {t("nav.work")}
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm uppercase tracking-wide font-medium"
                  >
                    {t("nav.clients")}
                  </a>
                </li> */}
                <li>
                  <a
                    href="#contact"
                    className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm uppercase tracking-wide font-medium"
                  >
                    {t("nav.contact")}
                  </a>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm uppercase tracking-wide font-medium"
                >
                  {t("nav.home")}
                </Link>
              </li>
            )}
            <li className="md:ml-4">
              <Link
                href="/initialize-project"
                className="inline-block px-5 py-2 bg-neutral-900 text-white text-sm uppercase tracking-wide font-medium hover:bg-neutral-800 transition-colors"
              >
                {t("nav.startProject")}
              </Link>
            </li>
            <li className="md:ml-4">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
