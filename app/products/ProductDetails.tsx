"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/Language";
import styles from "./products.module.css";
import { productSales, salesLabels } from "./productSales";
import { shiftMateSales } from "./shiftMateSales";
import { tableFlowSales } from "./tableFlowSales";

const products = {
  shiftmate: {
    name: "ShiftMate PRO",
    workflow: {
      mk: "Поставете таргети за утринска, попладневна и ноќна смена. ShiftMate PRO предлага распоред според правилата на тимот и ви покажува каде планираната покриеност е под таргетот. Кога ќе пристигне барање за замена или отсуство, проверете ја засегнатата смена и одлучете каде треба да го приспособите распоредот.",
      en: "Set staffing targets for morning, afternoon, and night shifts. ShiftMate PRO proposes a schedule based on your team’s rules and shows where planned coverage falls below target. When a swap or absence request comes in, check the affected shift and decide where the schedule needs adjusting.",
      sr: "Postavite ciljeve pokrivenosti za jutarnju, popodnevnu i noćnu smenu. ShiftMate PRO predlaže raspored prema pravilima tima i pokazuje gde je planirana pokrivenost ispod cilja. Kada stigne zahtev za zamenu ili odsustvo, proverite na koju smenu utiče i odlučite gde treba prilagoditi raspored.",
    },
    mk: ["Планирајте смени и следете каде недостига персонал.", "Автоматско планирање смени според правила", "Покриеност и таргети по тим и смена", "Замени, барања и отсуства", "Извештаи за планирана и реална покриеност"],
    en: ["Plan shifts and see where you need more staff.", "Automatic scheduling with configurable rules", "Coverage and staffing targets by team and shift", "Shift swaps, requests, and absences", "Planned versus actual coverage reports"],
    sr: ["Planirajte smene i proverite gde nedostaje osoblje.", "Automatsko planiranje smena prema pravilima", "Pokrivenost i ciljevi po timu i smeni", "Zamene, zahtevi i odsustva", "Izveštaji o planiranoj i stvarnoj pokrivenosti"],
  },
  tableflow: {
    name: "TableFlow",
    workflow: {
      mk: "Гостинот го скенира QR кодот на масата, го разгледува менито и ја испраќа нарачката со забелешка ако е потребно. Персоналот ја гледа нарачката со бројот на масата и забелешката на ист екран. Администраторот го одржува дигиталното мени преку посебен панел.",
      en: "Guests scan the table’s QR code, browse the menu, and send an order with a note if needed. Staff see the order, table number, and note on the same screen. Administrators maintain the digital menu in a dedicated dashboard.",
      sr: "Gost skenira QR kod na stolu, pregleda meni i šalje porudžbinu uz napomenu po potrebi. Osoblje na istom ekranu vidi porudžbinu, broj stola i napomenu. Administrator ažurira digitalni meni preko posebnog panela.",
    },
    mk: ["Од QR мени до нарачка со број на маса.", "Дигитално мени достапно преку QR код", "Нарачки поврзани со конкретна маса", "Забелешки од гостите во самата нарачка", "Панел за персоналот и администрацијата"],
    en: ["From scanning the menu to sending an order with the table number.", "Digital menu accessible by QR code", "Orders linked to the guest’s table", "Guest notes included with the order", "Staff and administration dashboard"],
    sr: ["Od skeniranja menija do porudžbine sa brojem stola.", "Digitalni meni dostupan preko QR koda", "Porudžbine povezane sa stolom", "Napomene gostiju uz porudžbinu", "Panel za osoblje i administraciju"],
  },
  "online-shop": {
    name: "NGC Online Shop",
    workflow: {
      mk: "Организирајте ги производите во категории за купувачите полесно да го најдат тоа што го бараат. Тие избираат производи, ги додаваат во кошничка и поднесуваат нарачка. Вашиот тим ги ажурира производите и ги обработува нарачките во администрацијата, со достава прилагодена на вашиот бизнис.",
      en: "Organize products into categories so customers can find what they need. Shoppers add items to their cart and place an order. Your team updates products and processes orders in the admin dashboard, with delivery options tailored to your business.",
      sr: "Rasporedite proizvode po kategorijama da kupci lakše pronađu ono što traže. Kupci dodaju proizvode u korpu i šalju porudžbinu. Vaš tim ažurira proizvode i obrađuje porudžbine u administraciji, uz opcije dostave prilagođene poslovanju.",
    },
    mk: ["Продавајте онлајн со продавница прилагодена на вашиот каталог и начинот на достава.", "Каталог со производи и категории", "Кошничка и поднесување нарачки", "Администрација на производи и нарачки", "Управување со достава"],
    en: ["Sell online with a storefront tailored to your catalog and delivery process.", "Product catalog with categories", "Shopping cart and order submission", "Product and order administration", "Delivery management"],
    sr: ["Prodajte onlajn uz prodavnicu prilagođenu vašem katalogu i načinu dostave.", "Katalog proizvoda sa kategorijama", "Korpa i slanje porudžbina", "Administracija proizvoda i porudžbina", "Upravljanje dostavom"],
  },
  "nextform-ai": {
    name: "NextForm AI",
    workflow: {
      mk: "Вежбачите добиваат персонализирани планови за тренинг и исхрана и го бележат напредокот преку дневни проверки. Тренерите имаат преглед на плановите и активноста на клиентите, а тимовите во теретаните можат да управуваат со членства и присуство.",
      en: "Trainees get personalized training and nutrition plans and record their progress through daily check-ins. Coaches can review client plans and activity, while gym teams can manage memberships and attendance.",
      sr: "Vežbači dobijaju personalizovane planove treninga i ishrane i beleže napredak kroz dnevne provere. Treneri imaju pregled planova i aktivnosti klijenata, a timovi u teretanama mogu da upravljaju članstvima i prisustvom.",
    },
    mk: ["Поврзете ги вежбачите, тренерите и теретаните во една фитнес платформа.", "Персонализирани планови за тренинг и исхрана", "Дневни проверки и следење на напредокот", "Панел за тренери со планови и преглед на клиенти", "Панел за теретани со членства и присуство"],
    en: ["Bring trainees, coaches, and gyms together on one fitness platform.", "Personalized training and nutrition plans", "Daily check-ins and progress tracking", "Coach dashboard for plans and client activity", "Gym dashboard for memberships and attendance"],
    sr: ["Povežite vežbače, trenere i teretane na jednoj fitnes platformi.", "Personalizovani planovi treninga i ishrane", "Dnevne provere i praćenje napretka", "Panel za trenere sa planovima i pregledom klijenata", "Panel za teretane sa članarinama i prisustvom"],
  },
} as const;

type ProductSlug = keyof typeof products;

const labels = {
  mk: { back: "Сите производи", features: "Функции", contact: "Контакт со NGC" },
  en: { back: "All products", features: "Features", contact: "Contact NGC" },
  sr: { back: "Svi proizvodi", features: "Funkcije", contact: "Kontaktirajte NGC" },
};

export default function ProductDetails({ slug }: { slug: ProductSlug }) {
  const { lang } = useLanguage();
  const locale = lang === "en" ? "en" : lang === "sr" ? "sr" : "mk";
  const text = labels[locale];
  const product = products[slug];
  const workflow = product.workflow[locale];
  const [problem, outcome] = productSales[slug][locale];
  const salesText = salesLabels[locale];
  const featuredSales = slug === "shiftmate" ? shiftMateSales[locale] : slug === "tableflow" ? tableFlowSales[locale] : null;
  const [intro, ...features] = product[locale];

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <Link href="/products" className={styles.backLink}>
            <span aria-hidden="true">←</span>
            {locale === "en" ? "Back to products" : locale === "sr" ? "Nazad na proizvode" : "Назад до производи"}
          </Link>
          <h1>{product.name}</h1>
          {featuredSales ? (
            <>
              <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", lineHeight: 1.2, marginBottom: "1rem" }}>
                {featuredSales.headline}
              </h2>
              <p>{featuredSales.intro}</p>
            </>
          ) : (
            <p>{intro}</p>
          )}

        </div>
        {featuredSales ? (
          <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
            {featuredSales.sections.map((section) => (
              <section key={section.title} className={`${styles.card} ${styles.blue}`}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={styles.description} style={{ marginTop: ".75rem", maxWidth: "75ch" }}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        ) : (
          <div className={styles.grid} style={{ marginBottom: 32 }}>
            {[problem, workflow, outcome].map((paragraph, index) => (
              <section key={salesText[index]} className={`${styles.card} ${styles.blue}`}>
                <h2>{salesText[index]}</h2>
                <p className={styles.description}>{paragraph}</p>
              </section>
            ))}
          </div>
        )}

        {(slug === "shiftmate" || slug === "tableflow") && (
          <div className={styles.screenGrid}>
            {(slug === "tableflow" ? [
              { file: "tableflow-guest.png", width: 1803, height: 872, mk: "Гостинска страница", en: "Guest page", sr: "Stranica za goste" },
              { file: "tableflow-menu.png", width: 1752, height: 897, mk: "Дигитално мени", en: "Digital menu", sr: "Digitalni meni" },
              { file: "tableflow-orders.png", width: 1756, height: 896, mk: "Нарачки во живо", en: "Live orders", sr: "Porudžbine uživo" },
              { file: "tableflow-tables.png", width: 1715, height: 917, mk: "Маси и QR-кодови", en: "Tables and QR codes", sr: "Stolovi i QR kodovi" },
              { file: "tableflow-overview.png", width: 1723, height: 913, mk: "Преглед на локалот", en: "Venue dashboard", sr: "Pregled lokala" },
              { file: "tableflow-payments.png", width: 1750, height: 899, mk: "Промет и наплата", en: "Sales and payments", sr: "Promet i naplata" },
            ] : [
              { file: "shiftmate-overview.png", width: 1738, height: 905, mk: "Преглед и покриеност", en: "Dashboard and coverage", sr: "Pregled i pokrivenost" },
              { file: "shiftmate-schedule.png", width: 1731, height: 909, mk: "Распоред на смени", en: "Shift schedule", sr: "Raspored smena" },
              { file: "shiftmate-chat.png", width: 1730, height: 909, mk: "Тимски чет", en: "Team chat", sr: "Timski čet" },
            ]).map((screen) => (
              <figure key={screen.file} className={styles.screenFigure}>
                <button
                  type="button"
                  className={styles.screenButton}
                  aria-haspopup="dialog"
                  aria-label={`${locale === "en" ? "Enlarge" : locale === "sr" ? "Uvećaj" : "Зголеми"}: ${screen[locale]}`}
                  onClick={(event) => event.currentTarget.parentElement?.querySelector("dialog")?.showModal()}
                >
                  <Image
                    src={`/products/${screen.file}`}
                    alt=""
                    width={screen.width}
                    height={screen.height}
                    sizes="(max-width: 640px) 90vw, 360px"
                  />
                  <span aria-hidden="true">↗</span>
                </button>
                <dialog
                  className={styles.screenDialog}
                  aria-label={screen[locale]}
                  onClick={(event) => {
                    if (event.target === event.currentTarget) event.currentTarget.close();
                  }}
                >
                  <form method="dialog">
                    <button className={styles.screenClose} type="submit" aria-label={locale === "en" ? "Close" : locale === "sr" ? "Zatvori" : "Затвори"}>
                      ×
                    </button>
                  </form>
                  <Image
                    src={`/products/${screen.file}`}
                    alt={screen[locale]}
                    width={screen.width}
                    height={screen.height}
                    sizes="96vw"
                  />
                </dialog>
                <figcaption className={styles.description} style={{ marginTop: 8 }}>
                  {screen[locale]} · {locale === "en" ? "Demo data" : locale === "sr" ? "Demo podaci" : "Демо податоци"}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        <section className={`${styles.card} ${styles.blue}`}>
          <h2>{text.features}</h2>
          <ul className={styles.description}>
            {features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </section>
        {!featuredSales && (
        <div className={styles.actions}>
          <Link className={styles.contact} href="/start-project">{salesText[3]} {product.name}</Link>
        </div>
        )}
      </div>
    </main>
  );
}
