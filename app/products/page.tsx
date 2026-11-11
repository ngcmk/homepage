"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/Language";
import styles from "./products.module.css";

const products = [
  {
    name: "ShiftMate PRO", slug: "shiftmate",
    color: "blue",
    mk: ["Планирање на работна сила", "Автоматско планирање смени, следење на покриеноста по тим и управување со замени и отсуства."],
    en: ["Workforce management", "Build shift schedules automatically, track team coverage against targets, and manage swaps and absences."],
    sr: ["Planiranje radne snage", "Automatski planirajte smene, pratite pokrivenost timova u odnosu na ciljeve i upravljajte zamenama i odsustvima."],
  },
  {
    name: "TableFlow", slug: "tableflow",
    color: "green",
    mk: ["Софтвер за угостителство", "Гостите го отвораат менито преку QR код и нарачуваат од маса. Персоналот ги гледа нарачките и забелешките на едно место."],
    en: ["Restaurant software", "Guests scan a QR code to view the menu and order from their table. Staff see orders and notes in one place."],
    sr: ["Softver za ugostiteljstvo", "Gosti skeniraju QR kod za meni i naručuju sa stola. Osoblje vidi porudžbine i napomene na jednom mestu."],
  },
  {
    name: "NGC Online Shop", slug: "online-shop",
    color: "orange",
    mk: ["Онлајн продажба", "Прилагодлива онлајн продавница со каталог, категории и кошничка. Управувајте со нарачките и доставата на едно место."],
    en: ["E-commerce", "A customizable storefront with product categories and a cart. Manage orders and delivery in one place."],
    sr: ["Onlajn prodaja", "Prilagodljiva onlajn prodavnica sa kategorijama proizvoda i korpom. Upravljajte porudžbinama i dostavom na jednom mestu."],
  },
  {
    name: "NextForm AI", slug: "nextform-ai",
    color: "violet",
    mk: ["Фитнес платформа", "Платформа за вежбачи, тренери и теретани со персонализирани планови за тренинг и следење на напредокот."],
    en: ["Fitness platform", "A platform for trainees, coaches, and gyms with personalized training plans and progress tracking."],
    sr: ["Fitnes platforma", "Platforma za vežbače, trenere i teretane sa personalizovanim planovima treninga i praćenjem napretka."],
  },
] as const;

const copy = {
  mk: {
    title: "Софтвер што го движи вашиот бизнис",
    intro: "Софтвер од NGC за планирање смени, угостителство, онлајн продажба и фитнес.",
    contact: "Разговарајте со NGC", details: "Детали",
  },
  en: {
    title: "Software that moves your business forward",
    intro: "NGC software for workforce scheduling, restaurants, e-commerce, and fitness.",
    contact: "Talk to NGC", details: "Details",
  },
  sr: {
    title: "Softver koji pokreće vaše poslovanje",
    intro: "NGC softver za planiranje smena, ugostiteljstvo, onlajn prodaju i fitnes.",
    contact: "Razgovarajte sa NGC timom", details: "Detalji",
  },
};

export default function ProductsPage() {
  const { lang } = useLanguage();
  const locale = lang === "en" ? "en" : lang === "sr" ? "sr" : "mk";
  const text = copy[locale];

  return (
    <main className={`${styles.page} ${styles.catalogPage}`}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <h1>{text.title}</h1>
          <p>{text.intro}</p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => {
            const [category, description] = product[locale];
            return (
              <article key={product.name} className={`${styles.card} ${styles[product.color]}`}>
                <p className={styles.category}>{category}</p>
                {product.slug === "shiftmate" && (
                  <Image
                    src="/products/shiftmate-overview.png"
                    alt={locale === "en" ? "ShiftMate PRO dashboard with demo data" : locale === "sr" ? "ShiftMate PRO pregled sa demo podacima" : "Преглед на ShiftMate PRO со демо податоци"}
                    width={1738}
                    height={905}
                    sizes="(max-width: 640px) 90vw, 520px"
                    style={{ display: "block", width: "100%", height: "auto", borderRadius: 12, marginBottom: 20 }}
                  />
                )}
                {product.slug === "tableflow" && (
                  <Image
                    src="/products/tableflow-guest.png"
                    alt={locale === "en" ? "TableFlow guest page" : locale === "sr" ? "TableFlow stranica za goste" : "Гостинска страница на TableFlow"}
                    width={1803}
                    height={872}
                    sizes="(max-width: 640px) 90vw, 520px"
                    style={{ display: "block", width: "100%", height: "auto", borderRadius: 12, marginBottom: 20 }}
                  />
                )}
                <h2>{product.name}</h2>
                <p className={styles.description}>{description}</p>
                <div className={styles.actions}>
                  <Link className={styles.contact} href={`/products/${product.slug}`} aria-label={`${text.details} – ${product.name}`}>
                    {text.details}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.actions}>
          <Link className={styles.contact} href="/start-project">{text.contact}</Link>
        </div>
      </div>
    </main>
  );
}
