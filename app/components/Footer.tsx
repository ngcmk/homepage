"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "../contexts/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">
              <span className="gradient-text">ngc</span>
            </h3>
            <p className="text-neutral-400 mb-6 max-w-md">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.services")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t("footer.uiux")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t("footer.webdev")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t("footer.mobileapps")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t("footer.branding")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t("footer.careers")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t("footer.blog")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-800 text-neutral-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} ngc. {t("footer.copyright")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
