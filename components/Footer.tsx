"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import { useLanguage } from "./Language";

export default function Footer() {
  const { lang, t } = useLanguage();

  const labelsByLanguage = {
    mk: {
      company: "КОМПАНИЈА",
      services: "УСЛУГИ",
      contact: "КОНТАКТ",
      about: "За нас",
      blog: "Блог",
      start: "Започни проект",
      web: "Веб решенија",
      ux: "UI/UX дизајн",
      mobile: "Мобилни апликации",
      ai: "AI решенија",
      support: "Поддршка и одржување",
      desc1: "Создаваме дигитални искуства со цел.",
      desc2: "Модерен дизајн. Практични решенија.",
      ceo: "Директна линија на извршниот директор",
      cto: "Директна линија на техничкиот директор",
      location: "Скопје, Македонија",
      rights: "Сите права се задржани.",
    },
    sr: {
      company: "KOMPANIJA",
      services: "USLUGE",
      contact: "KONTAKT",
      about: "O nama",
      blog: "Blog",
      start: "Pokreni projekat",
      web: "Web rešenja",
      ux: "UI/UX dizajn",
      mobile: "Mobilne aplikacije",
      ai: "AI rešenja",
      support: "Podrška i održavanje",
      desc1: "Kreiramo digitalna iskustva sa svrhom.",
      desc2: "Moderan dizajn. Praktična rešenja.",
      ceo: "Direktna linija izvršnog direktora",
      cto: "Direktna linija tehničkog direktora",
      location: "Skoplje, Makedonija",
      rights: "Sva prava zadržana.",
    },
    en: {
      company: "COMPANY",
      services: "SERVICES",
      contact: "CONTACT",
      about: "About us",
      blog: "Blog",
      start: "Start project",
      web: "Web solutions",
      ux: "UI/UX design",
      mobile: "Mobile applications",
      ai: "AI solutions",
      support: "Support & maintenance",
      desc1: "We create digital experiences with purpose.",
      desc2: "Modern design. Practical solutions.",
      ceo: "CEO direct line",
      cto: "CTO direct line",
      location: "Skopje, Macedonia",
      rights: "All rights reserved.",
    },
  } as const;

  const safeLang: keyof typeof labelsByLanguage =
    lang === "sr" ? "sr" : lang === "en" ? "en" : "mk";
  const labels = labelsByLanguage[safeLang];

  const instagram = "https://www.instagram.com/next.generation.code?igsh=MW54bjYyZjl5Z3k1eQ==";
  const linkedin = "https://linkedin.com/company/ngc-solutions";
  const github = "https://github.com/ngcmk";

  return (
    <footer className="siteFooter">
      <div className="footerGrid">
        <div className="footerBrand">
          <Link href="/" className="footerLogo" aria-label="NGC – Next Generation Code">
            <Image
              src="/ngc-logo.png"
              alt="NGC – Next Generation Code"
              width={260}
              height={120}
            />
          </Link>
          <p>{labels.desc1}</p>
          <p>{labels.desc2}</p>

          <div className="socialRow">
            <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram />
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin />
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github />
            </a>
          </div>
        </div>

        <div className="footerColumn">
          <h3>{labels.company}</h3>
          <Link href="/about">{labels.about}</Link>
          <Link href="/blog">{labels.blog}</Link>
          <Link href="/start-project">{labels.start}</Link>
          <a href="mailto:contact@ngc.solutions">{t.talk}</a>
        </div>

        <div className="footerColumn">
          <h3>{labels.services}</h3>
          <a href="/#services">{labels.web}</a>
          <a href="/#services">{labels.ux}</a>
          <a href="/#services">{labels.mobile}</a>
          <a href="/#services">{labels.ai}</a>
          <a href="/#services">{labels.support}</a>
        </div>

        <div className="footerContact">
          <h3>{labels.contact}</h3>

          <a className="contactItem" href="tel:+38978209046">
            <span className="contactIcon"><Phone /></span>
            <span><strong>+389 78 209 046</strong><small>{labels.ceo}</small></span>
          </a>

          <a className="contactItem" href="tel:+38970294386">
            <span className="contactIcon"><Phone /></span>
            <span><strong>+389 70 294 386</strong><small>{labels.cto}</small></span>
          </a>

          <a className="contactItem" href="mailto:contact@ngc.solutions">
            <span className="contactIcon"><Mail /></span>
            <span><strong>contact@ngc.solutions</strong></span>
          </a>

          <a className="contactItem" href={instagram} target="_blank" rel="noopener noreferrer">
            <span className="contactIcon"><Instagram /></span>
            <span><strong>Instagram</strong></span>
          </a>

          <a className="contactItem" href="https://www.ngc.mk/" target="_blank" rel="noopener noreferrer">
            <span className="contactIcon"><Globe /></span>
            <span><strong>www.ngc.mk</strong></span>
          </a>

          <div className="contactItem staticContact">
            <span className="contactIcon"><MapPin /></span>
            <span><strong>{labels.location}</strong><small>CET</small></span>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <span>© 2026 <span className="ngcGradientText">NGC</span> – Next Generation Code. {labels.rights}</span>
        <div className="footerQuick">
          <a href="tel:+38978209046"><Phone /> +389 78 209 046</a>
          <a href="tel:+38970294386"><Phone /> +389 70 294 386</a>
          <a href="mailto:contact@ngc.solutions"><Mail /> contact@ngc.solutions</a>
          <a href="https://www.ngc.mk/" target="_blank" rel="noopener noreferrer"><Globe /> ngc.mk</a>
        </div>
      </div>
    </footer>
  );
}
