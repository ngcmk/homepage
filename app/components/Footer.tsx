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

// const SocialLink = ({ href, icon: Icon, name }: { href: string; icon: React.ComponentType<{ size: number }>; name: string }) => (
//   <a
//     href={href}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="text-neutral-400 hover:text-white transition-colors"
//     aria-label={name}
//   >
//     <Icon size={18} />
//     <span className="sr-only">{name}</span>
//   </a>
// );

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

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      href={href}
      className="text-neutral-400 hover:text-white transition-colors"
    >
      {children}
    </Link>
  </li>
);

export default function Footer() {
  const { t } = useLanguage();

  // Social media links
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
      href: "https://www.instagram.com/next.generation.code?igsh=MW54bjYyZjl5Z3k1eQ==",
      icon: Instagram,
    },
  ];

  // Services links
  // const servicesLinks = [
  //   {
  //     name: t("footer.links.services.design", { default: "Design" }),
  //     href: "/services/design",
  //   },
  //   {
  //     name: t("footer.links.services.webdev", { default: "Web Development" }),
  //     href: "/services/development",
  //   },
  //   {
  //     name: t("footer.links.services.mobile", { default: "Mobile Apps" }),
  //     href: "/services/mobile",
  //   },
  // { name: t("footer.links.services.branding", { default: "Branding" }), href: "/services/branding" },
  // ];

  // Company links
  // const companyLinks = [
  //   {
  //     name: t("footer.links.company.about", { default: "About Us" }),
  //     href: "/about",
  //   },
  //   {
  //     name: t("footer.links.company.careers", { default: "Careers" }),
  //     href: "/careers",
  //   },
  //   // { name: t("footer.links.company.blog", { default: "Blog" }), href: "/blog" },
  //   {
  //     name: t("footer.links.company.contact", { default: "Contact Us" }),
  //     href: "#contact",
  //   },
  // ];

  // Legal links
  // const legalLinks = [
  //   {
  //     name: t("footer.legal.privacy", { default: "Privacy Policy" }),
  //     href: "/privacy",
  //   },
  //   {
  //     name: t("footer.legal.terms", { default: "Terms of Service" }),
  //     href: "/terms",
  //   },
  // ];

  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-2">
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

          {/* Services links */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.sections.services", { default: "Services" })}
            </h4>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div> */}

          {/* Company links */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.sections.company", { default: "Company" })}
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>
        </div> */}

          {/* Copyright and legal links */}
          {/* <div className="mt-12 pt-8 border-t border-neutral-800 text-neutral-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} ngc.{" "}
              {t("footer.copyright", { default: "All rights reserved." })}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
