"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  LucideProps,
} from "lucide-react";
import { useLanguage } from "../contexts/language-context";

interface FooterProps {
  className?: string;
}

const SocialLink = ({
  href,
  icon: Icon,
  name,
}: {
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  name: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-neutral-400 hover:text-white transition-colors"
    aria-label={name}
  >
    <Icon size={18} />
    <span className="sr-only">{name}</span>
  </a>
);

export default function Footer({ className = "" }: FooterProps) {
  const { t } = useLanguage();

  const socialLinks = [
    {
      name: t("footer.social.facebook", { default: "Facebook" }),
      href: "https://facebook.com/ngc_solutions",
      icon: Facebook,
    },
    {
      name: t("footer.social.twitter", { default: "Twitter" }),
      href: "https://twitter.com/ngc_solutions",
      icon: Twitter,
    },
    {
      name: t("footer.social.linkedin", { default: "LinkedIn" }),
      href: "https://linkedin.com/company/ngc-solutions",
      icon: Linkedin,
    },
    {
      name: t("footer.social.instagram", { default: "Instagram" }),
      href:
        "https://www.instagram.com/next.generation.code?igsh=MW54bjYyZjl5Z3k1eQ==",
      icon: Instagram,
    },
  ];

  return (
    <footer className={`bg-neutral-900 text-white py-16 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand and description */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="gradient-text">ngc</span>
            </h3>
            <p className="text-neutral-400 mb-6 max-w-md">
              {t("footer.description", {
                default:
                  "We transform ideas into exceptional digital solutions that drive growth and deliver results.",
              })}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.name}
                  name={social.name}
                  href={social.href}
                  icon={social.icon}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-neutral-400 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} NGC – Next Generation Code.{" "}
            {t("footer.copyright", { default: "All rights reserved." })}
          </p>
        </div>
      </div>
    </footer>
  );
}
