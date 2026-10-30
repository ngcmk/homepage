"use client";
import {convexHttpUrl} from "@/lib/convexHttpUrl";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";
import { useLanguage } from "@/components/Language";
import "./business-check.css";

type Lang = "mk" | "sr" | "en";
type Tr = Record<Lang, string>;
type Option = { id: string; label: Tr };
type Question = { title: Tr; options: Option[]; multiple: boolean };
type Answer = string[];

const t = (mk: string, sr: string, en: string): Tr => ({ mk, sr, en });
const opt = (id: string, mk: string, sr: string, en: string): Option => ({
  id,
  label: t(mk, sr, en),
});
const question = (title: Tr, options: Option[], multiple = true): Question => ({
  title,
  options,
  multiple,
});

const ui = {
  headline: t(
    "Што му недостига на твојот бизнис?",
    "Šta nedostaje tvom biznisu?",
    "What is your business missing?"
  ),
  intro: t(
    "Откриј каде губиш време и можности за раст. Добиј бесплатна анализа и конкретни решенија.",
    "Otkrij gde gubiš vreme i prilike za rast. Dobij besplatnu analizu i konkretna rešenja.",
    "Discover where your business loses time and growth opportunities. Get a free assessment and practical solutions."
  ),
  free: t("Бесплатно", "Besplatno", "Free"),
  five: t("5 кратки прашања", "5 kratkih pitanja", "5 short questions"),
  solutions: t("Конкретни решенија", "Konkretna rešenja", "Practical solutions"),
  question: t("Прашање", "Pitanje", "Question"),
  of: t("од", "od", "of"),
  choose: t(
    "Избери ги сите одговори што важат за твојот бизнис.",
    "Izaberi sve odgovore koji važe za tvoj biznis.",
    "Select all answers that apply to your business."
  ),
  chooseOne: t(
    "Избери ја твојата дејност.",
    "Izaberi svoju delatnost.",
    "Choose your industry."
  ),
  next: t("Продолжи", "Nastavi", "Continue"),
  back: t("Назад", "Nazad", "Back"),
  other: t("Внеси ја дејноста", "Unesi delatnost", "Enter your industry"),
  otherPlaceholder: t(
    "Пр. земјоделска аптека",
    "Npr. poljoprivredna apoteka",
    "E.g. agricultural supply store"
  ),
  finalStep: t("Последен чекор", "Poslednji korak", "Final step"),
  ready: t("Подготвени сме за твојата анализа", "Spremni smo za tvoju analizu", "Your assessment is ready"),
  optional: t(
    "Додај име на фирма или дополнителен проблем, ако сакаш.",
    "Dodaj naziv firme ili dodatni problem, ako želiš.",
    "Optionally add your company name or another challenge."
  ),
  company: t("Име на бизнис", "Naziv biznisa", "Business name"),
  note: t("Дополнителен проблем", "Dodatni problem", "Additional challenge"),
  notePlaceholder: t(
    "Што друго би сакал да подобриш?",
    "Šta još želiš da poboljšaš?",
    "What else would you like to improve?"
  ),
  privacy: t(
    "Ништо не се испраќа автоматски. Дополнителниот опис ќе биде вклучен во барањето за понуда, но не влијае на автоматската анализа.",
    "Ništa se ne šalje automatski. Dodatni opis ulazi u zahtev za ponudu, ali ne utiče na automatsku analizu.",
    "Nothing is sent automatically. Your note is included in the proposal request but does not affect the automatic assessment."
  ),
  show: t("Откриј го решението", "Otkrij rešenje", "Discover your solution"),
  done: t("NGC BUSINESS ANALYSIS", "NGC BUSINESS ANALYSIS", "NGC BUSINESS ANALYSIS"),
  title: t(
    "Твојот бизнис може да работи попаметно.",
    "Tvoj biznis može da radi pametnije.",
    "Your business can work smarter."
  ),
  for: t("Анализа за", "Analiza za", "Assessment for"),
  summary: t(
    "Ги анализиравме твоите одговори и го издвоивме најважниот простор за подобрување.",
    "Analizirali smo tvoje odgovore i izdvojili najvažniju priliku za poboljšanje.",
    "We analyzed your answers and identified the strongest opportunity for improvement."
  ),
  priority: t("ТВОЈОТ ПРВ ПРИОРИТЕТ", "TVOJ PRVI PRIORITET", "YOUR TOP PRIORITY"),
  problem: t(
    "Каде твојот бизнис губи потенцијал?",
    "Gde tvoj biznis gubi potencijal?",
    "Where is your business losing potential?"
  ),
  vision: t(
    "Замисли поинаков начин на работа",
    "Zamisli drugačiji način rada",
    "Imagine a better way of working"
  ),
  offer: t(
    "Како NGC ќе ти помогне?",
    "Kako će ti NGC pomoći?",
    "How can NGC help?"
  ),
  benefits: t(
    "Што добива твојот бизнис?",
    "Šta dobija tvoj biznis?",
    "What does your business gain?"
  ),
  nextStep: t(
    "Следниот чекор кон подобар бизнис",
    "Sledeći korak ka boljem biznisu",
    "Your next step toward a better business"
  ),
  contactTitle: t(
    "Подготвен си да го претвориш потенцијалот во резултати?",
    "Spreman si da potencijal pretvoriš u rezultate?",
    "Ready to turn potential into results?"
  ),
  contactText: t(
    "NGC може да ти подготви конкретен план: што да изградиме, како ќе функционира и од каде е најпаметно да започнеме.",
    "NGC može da pripremi konkretan plan: šta da izgradimo, kako će funkcionisati i odakle je najbolje početi.",
    "NGC can prepare a concrete plan: what to build, how it will work and where to start."
  ),
  contact: t(
    "Сакам конкретен план од NGC",
    "Želim konkretan plan od NGC",
    "Get my NGC action plan"
  ),
  restart: t("Нова анализа", "Nova analiza", "New assessment"),
  home: t("Назад на NGC", "Nazad na NGC", "Back to NGC"),
  disclaimer: t(
    "Ова е почетна анализа базирана на твоите одговори и однапред дефинирани правила, не целосна ревизија или AI дијагноза. Точниот опсег, инвестицијата и очекуваните резултати се утврдуваат по консултација.",
    "Ovo je početna analiza zasnovana na odgovorima i pravilima, ne potpuna revizija niti AI dijagnoza. Tačan obim, investicija i očekivani rezultati utvrđuju se nakon konsultacije.",
    "This is a rule-based initial assessment, not a full audit or AI diagnosis. Scope, investment and expected outcomes are confirmed during consultation."
  ),
};

const industryQuestion = question(
  t(
    "Со која дејност се занимава твојот бизнис?",
    "Kojom delatnošću se bavi tvoj biznis?",
    "What industry is your business in?"
  ),
  [
    opt("fitness", "Фитнес и спорт", "Fitnes i sport", "Fitness and sports"),
    opt("hospitality", "Ресторан / угостителство", "Restoran / ugostiteljstvo", "Hospitality"),
    opt("retail", "Трговија", "Trgovina", "Retail"),
    opt("services", "Професионални услуги", "Profesionalne usluge", "Professional services"),
    opt("production", "Производство и дистрибуција", "Proizvodnja i distribucija", "Manufacturing and distribution"),
    opt("health", "Здравство и убавина", "Zdravstvo i lepota", "Healthcare and beauty"),
    opt("logistics", "Транспорт и логистика", "Transport i logistika", "Transport and logistics"),
    opt("other", "Друга дејност", "Druga delatnost", "Other industry"),
  ],
  false
);

const industries: Record<string, Question[]> = {
  fitness: [
    question(t("Како го водиш фитнес-центарот?", "Kako vodiš fitnes centar?", "How do you manage your gym?"), [
      opt("manual", "Рачна евиденција / Excel", "Ručna evidencija / Excel", "Manual records / Excel"),
      opt("messages", "Пораки и телефон", "Poruke i telefon", "Messages and calls"),
      opt("software", "Користиме софтвер", "Koristimo softver", "We use software"),
      opt("disconnected", "Имаме повеќе неповрзани алатки", "Imamo nepovezane alate", "We use disconnected tools"),
    ]),
    question(t("Каде губиш најмногу време?", "Gde gubiš najviše vremena?", "Where do you lose the most time?"), [
      opt("members", "Членарини и евиденција", "Članarine i evidencija", "Memberships and records"),
      opt("schedule", "Распореди и тренери", "Rasporedi i treneri", "Schedules and trainers"),
      opt("communication", "Комуникација со членови", "Komunikacija sa članovima", "Member communication"),
      opt("reporting", "Извештаи и контрола", "Izveštaji i kontrola", "Reporting and control"),
    ]),
    question(t("Што го ограничува растот?", "Šta ograničava rast?", "What limits your growth?"), [
      opt("retention", "Тешко задржуваме членови", "Teško zadržavamo članove", "Member retention"),
      opt("sales", "Недоволно нови членови", "Nedovoljno novih članova", "Not enough new members"),
      opt("automation", "Премногу администрација", "Previše administracije", "Too much administration"),
      opt("experience", "Недоволно дигитално искуство", "Slabo digitalno iskustvo", "Limited digital experience"),
    ]),
    question(t("Што сакаш да постигнеш?", "Šta želiš da postigneš?", "What do you want to achieve?"), [
      opt("automation", "Помалку рачна работа", "Manje ručnog rada", "Less manual work"),
      opt("retention", "Повеќе лојални членови", "Više lojalnih članova", "More loyal members"),
      opt("sales", "Повеќе нови членови", "Više novih članova", "More new members"),
      opt("members", "Целосна контрола на работењето", "Potpuna kontrola poslovanja", "Full operational visibility"),
    ]),
  ],

  hospitality: [
    question(t("Како функционира услугата?", "Kako funkcioniše usluga?", "How does your service operate?"), [
      opt("manual", "Рачни нарачки", "Ručne porudžbine", "Manual orders"),
      opt("pos", "Каса / POS", "Kasa / POS", "POS system"),
      opt("messages", "Резервации преку телефон", "Rezervacije telefonom", "Phone reservations"),
      opt("software", "Имаме дигитален систем", "Imamo digitalni sistem", "We use a digital system"),
    ]),
    question(t("Каде настануваат застои?", "Gde nastaju zastoji?", "Where do bottlenecks occur?"), [
      opt("orders", "Нарачки и кујна", "Porudžbine i kuhinja", "Orders and kitchen"),
      opt("booking", "Резервации", "Rezervacije", "Reservations"),
      opt("schedule", "Организација на персонал", "Organizacija osoblja", "Staff organization"),
      opt("reporting", "Контрола и извештаи", "Kontrola i izveštaji", "Control and reporting"),
    ]),
    question(t("Што најмногу ти пречи во работењето?", "Šta ti najviše smeta u radu?", "What hurts your operations most?"), [
      opt("orders", "Бавна услуга", "Spora usluga", "Slow service"),
      opt("automation", "Премногу рачни задачи", "Previše ručnih zadataka", "Too much manual work"),
      opt("sales", "Недоволно гости", "Nedovoljno gostiju", "Not enough guests"),
      opt("communication", "Недоразбирања во тимот", "Nesporazumi u timu", "Team miscommunication"),
    ]),
    question(t("Што сакаш да подобриш?", "Šta želiš da poboljšaš?", "What would you improve?"), [
      opt("orders", "Побрза услуга", "Brža usluga", "Faster service"),
      opt("booking", "Полесни резервации", "Lakše rezervacije", "Easier reservations"),
      opt("sales", "Повеќе гости", "Više gostiju", "More guests"),
      opt("schedule", "Подобра организација", "Bolja organizacija", "Better organization"),
    ]),
  ],

  retail: [
    question(t("Како продаваш?", "Kako prodaješ?", "How do you sell?"), [
      opt("store", "Физичка продавница", "Fizička prodavnica", "Physical store"),
      opt("online", "Онлајн", "Onlajn", "Online"),
      opt("messages", "Преку пораки", "Preko poruka", "Through messages"),
      opt("wholesale", "Големопродажба", "Veleprodaja", "Wholesale"),
    ]),
    question(t("Каде губиш време?", "Gde gubiš vreme?", "Where do you lose time?"), [
      opt("stock", "Залихи и магацин", "Zalihe i magacin", "Inventory and warehouse"),
      opt("orders", "Нарачки и испораки", "Porudžbine i isporuke", "Orders and deliveries"),
      opt("manual", "Рачно внесување", "Ručni unos", "Manual data entry"),
      opt("reporting", "Извештаи", "Izveštaji", "Reporting"),
    ]),
    question(t("Што ја кочи продажбата?", "Šta koči prodaju?", "What limits sales?"), [
      opt("sales", "Недоволно купувачи", "Nedovoljno kupaca", "Not enough customers"),
      opt("stock", "Неточни залихи", "Netačne zalihe", "Inaccurate inventory"),
      opt("orders", "Бавна обработка на нарачки", "Spora obrada porudžbina", "Slow order processing"),
      opt("crm", "Слабо следење купувачи", "Slabo praćenje kupaca", "Weak customer follow-up"),
    ]),
    question(t("Што сакаш да постигнеш?", "Šta želiš da postigneš?", "What do you want to achieve?"), [
      opt("sales", "Повеќе продажба", "Više prodaje", "More sales"),
      opt("stock", "Точна контрола на залихи", "Tačna kontrola zaliha", "Accurate inventory control"),
      opt("orders", "Побрзи нарачки", "Brže porudžbine", "Faster orders"),
      opt("reporting", "Подобри деловни одлуки", "Bolje poslovne odluke", "Better business decisions"),
    ]),
  ],

  services: [
    question(t("Како работиш со клиентите?", "Kako radiš sa klijentima?", "How do you work with clients?"), [
      opt("messages", "Телефон и пораки", "Telefon i poruke", "Calls and messages"),
      opt("manual", "Рачна евиденција", "Ručna evidencija", "Manual records"),
      opt("software", "Софтвер", "Softver", "Software"),
      opt("web", "Преку веб-страница", "Preko sajta", "Through a website"),
    ]),
    question(t("Каде губиш време?", "Gde gubiš vreme?", "Where do you lose time?"), [
      opt("crm", "Следење клиенти", "Praćenje klijenata", "Customer tracking"),
      opt("booking", "Термини", "Termini", "Appointments"),
      opt("automation", "Администрација", "Administracija", "Administration"),
      opt("schedule", "Задачи и проекти", "Zadaci i projekti", "Tasks and projects"),
    ]),
    question(t("Што го ограничува растот?", "Šta ograničava rast?", "What limits growth?"), [
      opt("sales", "Недоволно нови клиенти", "Nedovoljno novih klijenata", "Not enough new clients"),
      opt("crm", "Пропуштени барања", "Propušteni upiti", "Missed inquiries"),
      opt("automation", "Премногу рачна работа", "Previše ručnog rada", "Too much manual work"),
      opt("reporting", "Нема јасен преглед", "Nema jasnog pregleda", "Limited business visibility"),
    ]),
    question(t("Што сакаш да подобриш?", "Šta želiš da poboljšaš?", "What would you improve?"), [
      opt("sales", "Повеќе клиенти", "Više klijenata", "More clients"),
      opt("crm", "Подобра комуникација", "Bolja komunikacija", "Better communication"),
      opt("automation", "Автоматизација", "Automatizacija", "Automation"),
      opt("booking", "Онлајн закажување", "Onlajn zakazivanje", "Online appointments"),
    ]),
  ],

  production: [
    question(t("Како го водиш производството?", "Kako vodiš proizvodnju?", "How do you manage production?"), [
      opt("manual", "Рачно / Excel", "Ručno / Excel", "Manual / Excel"),
      opt("software", "Преку софтвер", "Preko softvera", "Using software"),
      opt("disconnected", "Неповрзани системи", "Nepovezani sistemi", "Disconnected systems"),
      opt("messages", "Телефон и е-пошта", "Telefon i e-pošta", "Calls and email"),
    ]),
    question(t("Каде губиш најмногу време?", "Gde gubiš najviše vremena?", "Where do you lose the most time?"), [
      opt("automation", "Производни процеси", "Proizvodni procesi", "Production processes"),
      opt("stock", "Материјали и залихи", "Materijali i zalihe", "Materials and inventory"),
      opt("orders", "Нарачки", "Porudžbine", "Orders"),
      opt("reporting", "Извештаи", "Izveštaji", "Reporting"),
    ]),
    question(t("Што создава најголем проблем?", "Šta stvara najveći problem?", "What causes the biggest challenge?"), [
      opt("stock", "Недостаток на материјали", "Nedostatak materijala", "Material shortages"),
      opt("automation", "Повторувачки задачи", "Ponavljajući zadaci", "Repetitive tasks"),
      opt("orders", "Доцнење на нарачки", "Kašnjenje porudžbina", "Delayed orders"),
      opt("reporting", "Недоволна контрола на трошоци", "Slaba kontrola troškova", "Limited cost visibility"),
    ]),
    question(t("Што сакаш да постигнеш?", "Šta želiš da postigneš?", "What do you want to achieve?"), [
      opt("automation", "Поефикасни процеси", "Efikasniji procesi", "More efficient processes"),
      opt("stock", "Контрола на материјали", "Kontrola materijala", "Material control"),
      opt("orders", "Подобро следење нарачки", "Bolje praćenje porudžbina", "Better order tracking"),
      opt("reporting", "Контрола на трошоци", "Kontrola troškova", "Cost visibility"),
    ]),
  ],

  health: [
    question(t("Како работиш со термините?", "Kako radiš sa terminima?", "How do you handle appointments?"), [
      opt("messages", "Телефон / пораки", "Telefon / poruke", "Calls / messages"),
      opt("manual", "Рачен календар", "Ručni kalendar", "Manual calendar"),
      opt("software", "Онлајн систем", "Onlajn sistem", "Online system"),
      opt("disconnected", "Повеќе различни алатки", "Više različitih alata", "Multiple tools"),
    ]),
    question(t("Каде губиш време?", "Gde gubiš vreme?", "Where do you lose time?"), [
      opt("booking", "Закажување", "Zakazivanje", "Scheduling"),
      opt("crm", "Евиденција на клиенти", "Evidencija klijenata", "Client records"),
      opt("automation", "Потсетници и администрација", "Podsetnici i administracija", "Reminders and administration"),
      opt("reporting", "Извештаи", "Izveštaji", "Reporting"),
    ]),
    question(t("Што ти создава најмногу проблеми?", "Šta ti stvara najviše problema?", "What creates the most problems?"), [
      opt("booking", "Пропуштени термини", "Propušteni termini", "Missed appointments"),
      opt("crm", "Тешко следење клиенти", "Teško praćenje klijenata", "Difficult client tracking"),
      opt("sales", "Недоволно нови клиенти", "Nedovoljno novih klijenata", "Not enough new clients"),
      opt("automation", "Премногу администрација", "Previše administracije", "Too much administration"),
    ]),
    question(t("Што сакаш да подобриш?", "Šta želiš da poboljšaš?", "What would you improve?"), [
      opt("booking", "Онлајн термини", "Onlajn termini", "Online bookings"),
      opt("crm", "Подобра грижа за клиенти", "Bolja briga o klijentima", "Better client experience"),
      opt("automation", "Автоматски потсетници", "Automatski podsetnici", "Automated reminders"),
      opt("sales", "Повеќе клиенти", "Više klijenata", "More clients"),
    ]),
  ],

  logistics: [
    question(t("Како ги организираш испораките?", "Kako organizuješ isporuke?", "How do you organize deliveries?"), [
      opt("manual", "Рачно / Excel", "Ručno / Excel", "Manual / Excel"),
      opt("messages", "Телефон и пораки", "Telefon i poruke", "Calls and messages"),
      opt("software", "Преку софтвер", "Preko softvera", "Using software"),
      opt("disconnected", "Неповрзани системи", "Nepovezani sistemi", "Disconnected systems"),
    ]),
    question(t("Каде губиш најмногу време?", "Gde gubiš najviše vremena?", "Where do you lose the most time?"), [
      opt("tracking", "Следење испораки", "Praćenje isporuka", "Delivery tracking"),
      opt("schedule", "Распоред на возила и тимови", "Raspored vozila i timova", "Fleet and team scheduling"),
      opt("automation", "Документација", "Dokumentacija", "Documentation"),
      opt("reporting", "Извештаи", "Izveštaji", "Reporting"),
    ]),
    question(t("Што го кочи работењето?", "Šta koči poslovanje?", "What holds operations back?"), [
      opt("tracking", "Недоволна видливост", "Nedovoljna vidljivost", "Limited visibility"),
      opt("schedule", "Доцнења и лош распоред", "Kašnjenja i loš raspored", "Delays and poor scheduling"),
      opt("automation", "Рачно префрлање податоци", "Ručno prepisivanje podataka", "Manual data transfer"),
      opt("communication", "Лоша координација", "Loša koordinacija", "Poor coordination"),
    ]),
    question(t("Што сакаш да подобриш?", "Šta želiš da poboljšaš?", "What would you improve?"), [
      opt("tracking", "Следење во реално време", "Praćenje u realnom vremenu", "Real-time tracking"),
      opt("schedule", "Подобро планирање", "Bolje planiranje", "Better planning"),
      opt("automation", "Автоматизација", "Automatizacija", "Automation"),
      opt("reporting", "Контролна табла", "Kontrolna tabla", "Dashboard"),
    ]),
  ],

  other: [
    question(t("Како го водиш бизнисот?", "Kako vodiš biznis?", "How do you run your business?"), [
      opt("manual", "Рачно", "Ručno", "Manually"),
      opt("messages", "Телефон и пораки", "Telefon i poruke", "Calls and messages"),
      opt("software", "Преку софтвер", "Preko softvera", "Using software"),
      opt("disconnected", "Неповрзани алатки", "Nepovezani alati", "Disconnected tools"),
    ]),
    question(t("Каде губиш најмногу време?", "Gde gubiš najviše vremena?", "Where do you lose the most time?"), [
      opt("automation", "Рачни задачи", "Ručni zadaci", "Manual tasks"),
      opt("crm", "Комуникација со клиенти", "Komunikacija sa klijentima", "Customer communication"),
      opt("orders", "Нарачки и барања", "Porudžbine i upiti", "Orders and inquiries"),
      opt("reporting", "Извештаи", "Izveštaji", "Reporting"),
    ]),
    question(t("Што го ограничува растот?", "Šta ograničava rast?", "What limits growth?"), [
      opt("sales", "Недоволно клиенти", "Nedovoljno klijenata", "Not enough customers"),
      opt("automation", "Премногу администрација", "Previše administracije", "Too much administration"),
      opt("crm", "Пропуштени барања", "Propušteni upiti", "Missed inquiries"),
      opt("reporting", "Недоволна контрола", "Nedovoljna kontrola", "Limited visibility"),
    ]),
    question(t("Што сакаш да постигнеш?", "Šta želiš da postigneš?", "What do you want to achieve?"), [
      opt("sales", "Повеќе продажба", "Više prodaje", "More sales"),
      opt("automation", "Помалку рачна работа", "Manje ručnog rada", "Less manual work"),
      opt("crm", "Подобра организација", "Bolja organizacija", "Better organization"),
      opt("reporting", "Подобри одлуки", "Bolje odluke", "Better decisions"),
    ]),
  ],
};

type Solution = {
  name: Tr;
  problem: Tr;
  vision: Tr;
  build: Tr;
  benefits: Tr[];
  closing: Tr;
};

const solutions: Record<string, Solution> = {
  fitness: {
    name: t("Паметен фитнес-центар со NextForm AI", "Pametan fitnes centar uz NextForm AI", "Smarter gym management with NextForm AI"),
    problem: t(
      "Кога членарините, тренинзите и комуникацијата се водат на повеќе места, администрацијата расте заедно со бројот на членови. Тоа ти одзема време од продажбата, тренерите и искуството на клиентите.",
      "Kada se članarine, treninzi i komunikacija vode na više mesta, administracija raste zajedno sa brojem članova. To oduzima vreme od prodaje, trenera i iskustva klijenata.",
      "When memberships, sessions and communication are scattered, administration grows alongside your membership base, taking time away from sales, trainers and customer experience."
    ),
    vision: t(
      "Отвораш една контролна табла и веднаш гледаш активни членови, членарини, распореди и задачи. Тимот има јасна организација, а членовите добиваат попрофесионално искуство.",
      "Otvaraš jednu kontrolnu tablu i odmah vidiš aktivne članove, članarine, rasporede i zadatke. Tim radi organizovanije, a članovi dobijaju profesionalnije iskustvo.",
      "Open one dashboard to see active members, memberships, schedules and tasks. Your team stays organized while members enjoy a more professional experience."
    ),
    build: t(
      "NGC ќе предложи дигитален систем прилагоден на твојот фитнес-центар, со можност за интеграција или прилагодување на NextForm AI. Ќе ги дефинираме потребните модули за членови, тренери, тренинзи и администрација.",
      "NGC će predložiti digitalni sistem prilagođen tvom fitnes centru, uz mogućnost integracije ili prilagođavanja NextForm AI. Definisaćemo potrebne module za članove, trenere, treninge i administraciju.",
      "NGC will propose a system tailored to your gym, potentially integrating or adapting NextForm AI. We'll define the modules needed for members, trainers, sessions and administration."
    ),
    benefits: [
      t("Повеќе време за членовите и продажбата", "Više vremena za članove i prodaju", "More time for members and sales"),
      t("Подобра контрола на членарини и распореди", "Bolja kontrola članarina i rasporeda", "Better control of memberships and schedules"),
      t("Основа за раст без исто толку дополнителна администрација", "Osnova za rast bez proporcionalnog rasta administracije", "A foundation for growth without matching administrative overhead"),
    ],
    closing: t(
      "Целта не е само дигитална евиденција. Целта е фитнес-центар што можеш полесно да го контролираш и развиваш.",
      "Cilj nije samo digitalna evidencija. Cilj je fitnes centar koji lakše kontrolišeš i razvijaš.",
      "The goal isn't just digital records. It's a gym you can manage and grow more effectively."
    ),
  },

  orders: {
    name: t("Побрзи нарачки. Подобра услуга.", "Brže porudžbine. Bolja usluga.", "Faster orders. Better service."),
    problem: t(
      "Кога нарачките се пренесуваат рачно или преку повеќе луѓе, секој дополнителен чекор може да создаде доцнење, грешка или недоразбирање. Во најголемата гужва тоа директно влијае на искуството на гостите.",
      "Kada se porudžbine prenose ručno ili preko više ljudi, svaki dodatni korak može stvoriti kašnjenje, grešku ili nesporazum. U najvećoj gužvi to direktno utiče na iskustvo gostiju.",
      "When orders pass manually between people, every extra step can cause delays, mistakes or confusion. During busy periods, that directly affects the guest experience."
    ),
    vision: t(
      "Гостинот нарачува, тимот веднаш ја гледа нарачката, кујната го следи статусот, а персоналот знае што е подготвено. Помалку непотребно движење и повеќе фокус на услугата.",
      "Gost poručuje, tim odmah vidi porudžbinu, kuhinja prati status, a osoblje zna šta je spremno. Manje nepotrebnog kretanja i više fokusa na uslugu.",
      "A guest orders, staff see it immediately, the kitchen tracks progress and servers know what's ready. Less unnecessary back-and-forth, more focus on service."
    ),
    build: t(
      "NGC може да изработи дигитален тек на нарачки, со QR мени, статуси и контролна табла за персоналот. Функциите ќе ги прилагодиме на начинот на кој работи твојот локал.",
      "NGC može da izradi digitalni tok porudžbina sa QR menijem, statusima i kontrolnom tablom za osoblje. Funkcije prilagođavamo načinu rada tvog lokala.",
      "NGC can build a digital order workflow with a QR menu, order statuses and a staff dashboard, tailored to how your venue operates."
    ),
    benefits: [
      t("Побрз и појасен тек на нарачките", "Brži i jasniji tok porudžbina", "Faster and clearer order flow"),
      t("Помал ризик од пропуштени информации", "Manji rizik od propuštenih informacija", "Lower risk of missed information"),
      t("Подобро искуство за гостите", "Bolje iskustvo za goste", "Better guest experience"),
    ],
    closing: t(
      "Твојот тим треба да се грижи за гостите, а системот да помага во организацијата.",
      "Tvoj tim treba da brine o gostima, a sistem da pomaže u organizaciji.",
      "Your team should focus on guests, while the system supports the workflow."
    ),
  },

  stock: {
    name: t("Контрола на залихи без хаос", "Kontrola zaliha bez haosa", "Inventory control without chaos"),
    problem: t(
      "Ако немаш точен преглед на артиклите и нарачките, потешко знаеш што да набавиш, што недостига и каде ти се врзани парите. Со растот на продажбата проблемот станува поголем.",
      "Ako nemaš tačan pregled artikala i porudžbina, teže znaš šta treba nabaviti, šta nedostaje i gde je vezan novac. Sa rastom prodaje problem postaje veći.",
      "Without reliable visibility into stock and orders, it's harder to know what to buy, what's missing and where cash is tied up. The challenge grows with sales."
    ),
    vision: t(
      "На една контролна табла гледаш достапни артикли, нарачки и залихи што треба да се дополнат. Наместо да бараш информации, носиш одлуки со јасни податоци.",
      "Na jednoj kontrolnoj tabli vidiš dostupne artikle, porudžbine i zalihe koje treba dopuniti. Umesto traženja informacija, donosiš odluke uz jasne podatke.",
      "One dashboard shows available products, orders and stock that needs replenishment. Instead of chasing information, you make decisions using clear data."
    ),
    build: t(
      "NGC може да изработи систем за магацин, артикли, влез и излез на залихи, нарачки и извештаи, со можни интеграции по проверка на постојната опрема.",
      "NGC može da izradi sistem za magacin, artikle, ulaz i izlaz zaliha, porudžbine i izveštaje, uz moguće integracije nakon provere postojeće opreme.",
      "NGC can build an inventory system for products, stock movements, orders and reporting, with integrations subject to compatibility checks."
    ),
    benefits: [
      t("Подобра контрола на залихите", "Bolja kontrola zaliha", "Better stock control"),
      t("Полесно планирање набавки", "Lakše planiranje nabavki", "Easier purchasing decisions"),
      t("Помалку рачни проверки и грешки", "Manje ručnih provera i grešaka", "Fewer manual checks and errors"),
    ],
    closing: t(
      "Добрата контрола не е само ред во магацинот. Таа е основа за попаметна продажба и планирање.",
      "Dobra kontrola nije samo red u magacinu. Ona je osnova za pametniju prodaju i planiranje.",
      "Good inventory control isn't just an organized warehouse. It's a foundation for smarter sales and planning."
    ),
  },

  crm: {
    name: t("Ниту еден важен клиент да не се изгуби во пораките", "Da se nijedan važan klijent ne izgubi u porukama", "Stop losing valuable leads in messages"),
    problem: t(
      "Кога барањата пристигнуваат преку телефон, е-пошта и социјални мрежи, лесно се пропушта следниот контакт. Тоа може да значи изгубени можности за продажба, дури и кога има интерес за твојата услуга.",
      "Kada upiti stižu telefonom, e-poštom i društvenim mrežama, lako se propusti sledeći kontakt. To može značiti izgubljene prodajne prilike čak i kada postoji interesovanje.",
      "When inquiries arrive through calls, email and social media, follow-ups can get missed. That can mean lost sales opportunities even when customers are interested."
    ),
    vision: t(
      "Отвораш една табла и знаеш кој клиент чека одговор, која понуда е испратена и кој е следниот чекор. Секое барање има свој статус и одговорно лице.",
      "Otvaraš jednu tablu i znaš koji klijent čeka odgovor, koja ponuda je poslata i koji je sledeći korak. Svaki upit ima status i odgovornu osobu.",
      "Open one dashboard and see who needs a reply, which proposals were sent and what happens next. Every inquiry has a status and an owner."
    ),
    build: t(
      "NGC може да изработи CRM решение со клиентски профили, барања, понуди, задачи и потсетници, прилагодено на твојот продажен процес.",
      "NGC može da izradi CRM rešenje sa profilima klijenata, upitima, ponudama, zadacima i podsetnicima, prilagođeno tvom prodajnom procesu.",
      "NGC can build a tailored CRM with customer profiles, inquiries, proposals, tasks and reminders."
    ),
    benefits: [
      t("Помалку пропуштени барања", "Manje propuštenih upita", "Fewer missed inquiries"),
      t("Побрзи и поорганизирани одговори", "Brži i organizovaniji odgovori", "Faster, more organized follow-ups"),
      t("Подобра контрола на продажните можности", "Bolja kontrola prodajnih prilika", "Better sales pipeline visibility"),
    ],
    closing: t(
      "Не ти треба само повеќе интерес. Треба подобро да го искористиш интересот што веќе го добиваш.",
      "Ne treba ti samo više interesovanja. Treba bolje da iskoristiš interesovanje koje već dobijaš.",
      "You don't only need more interest. You need to make better use of the interest you already receive."
    ),
  },

  automation: {
    name: t("Ослободи го тимот од повторувачка работа", "Oslobodi tim ponavljajućeg rada", "Free your team from repetitive work"),
    problem: t(
      "Ако вработените постојано препишуваат податоци, проверуваат статуси и испраќаат исти информации, бизнисот троши време на процеси наместо на вредност за клиентите.",
      "Ako zaposleni stalno prepisuju podatke, proveravaju statuse i šalju iste informacije, biznis troši vreme na procese umesto na vrednost za klijente.",
      "If employees repeatedly copy data, check statuses and send the same updates, your business spends time on processes instead of customer value."
    ),
    vision: t(
      "Една задача се внесува еднаш. Информациите се достапни на вистинските луѓе, статусите се ажурираат, а тимот знае што следува.",
      "Jedan zadatak se unosi jednom. Informacije su dostupne pravim ljudima, statusi se ažuriraju, a tim zna šta sledi.",
      "Enter a task once. The right people can access the information, statuses stay updated and everyone knows what comes next."
    ),
    build: t(
      "NGC ќе ги анализира клучните процеси и може да изработи софтвер по мерка со задачи, одобренија, известувања и автоматски чекори таму каде што носат реална корист.",
      "NGC će analizirati ključne procese i može izraditi softver po meri sa zadacima, odobrenjima, obaveštenjima i automatizovanim koracima tamo gde donose stvarnu korist.",
      "NGC can map your key processes and build custom software with tasks, approvals, notifications and automation where it provides measurable value."
    ),
    benefits: [
      t("Помалку двојно внесување", "Manje duplog unosa", "Less duplicate data entry"),
      t("Појасна одговорност и следење", "Jasnija odgovornost i praćenje", "Clearer accountability and tracking"),
      t("Повеќе време за работа што носи вредност", "Više vremena za posao koji donosi vrednost", "More time for higher-value work"),
    ],
    closing: t(
      "Целта е твојот бизнис да не зависи од бескрајни пораки, табели и рачни проверки.",
      "Cilj je da tvoj biznis ne zavisi od beskrajnih poruka, tabela i ručnih provera.",
      "The goal is a business that doesn't depend on endless messages, spreadsheets and manual checks."
    ),
  },

  booking: {
    name: t("Термини што се организираат полесно", "Termini koji se lakše organizuju", "Appointments made easier"),
    problem: t(
      "Резервациите преку телефон и пораки бараат постојана координација. Кога нема јасен распоред, се зголемува ризикот од пропуштени или преклопени термини.",
      "Rezervacije telefonom i porukama zahtevaju stalnu koordinaciju. Bez jasnog rasporeda raste rizik od propuštenih ili preklopljenih termina.",
      "Bookings through calls and messages require constant coordination. Without a clear schedule, missed or overlapping appointments become more likely."
    ),
    vision: t(
      "Клиентот бара термин онлајн, тимот го потврдува, календарот е ажуриран, а потсетниците помагаат сите да знаат кога е следната посета.",
      "Klijent traži termin onlajn, tim ga potvrđuje, kalendar je ažuriran, a podsetnici pomažu svima da znaju vreme sledeće posete.",
      "Customers request appointments online, staff confirm them, the calendar stays current and reminders keep everyone informed."
    ),
    build: t(
      "NGC може да изработи систем за онлајн термини со календар, достапност, потврди и потсетници, според правилата на твојот бизнис.",
      "NGC može da izradi sistem za onlajn termine sa kalendarom, dostupnošću, potvrdama i podsetnicima, prema pravilima tvog biznisa.",
      "NGC can build an online booking system with availability, confirmations, calendars and reminders tailored to your operations."
    ),
    benefits: [
      t("Полесно закажување", "Lakše zakazivanje", "Easier scheduling"),
      t("Попрегледен календар", "Pregledniji kalendar", "Clearer calendar"),
      t("Подобро искуство за клиентите", "Bolje iskustvo klijenata", "Better customer experience"),
    ],
    closing: t(
      "Олесни им на клиентите да закажат, а на тимот да ја организира работата.",
      "Olakšaj klijentima zakazivanje, a timu organizaciju rada.",
      "Make booking easier for customers and daily planning easier for your team."
    ),
  },

  sales: {
    name: t("Претвори го дигиталното присуство во продажна можност", "Pretvori digitalno prisustvo u prodajnu priliku", "Turn digital presence into sales opportunities"),
    problem: t(
      "Ако потенцијалните клиенти тешко те наоѓаат или не разбираат што нудиш, губиш можности уште пред да започне разговорот за продажба.",
      "Ako te potencijalni klijenti teško pronalaze ili ne razumeju ponudu, gubiš prilike pre nego što prodajni razgovor počne.",
      "If potential customers can't find you or understand your offer, opportunities may disappear before a sales conversation begins."
    ),
    vision: t(
      "Клиентот те пронаоѓа, за неколку секунди разбира што нудиш, гледа зошто да ти верува и лесно испраќа барање.",
      "Klijent te pronalazi, za nekoliko sekundi razume ponudu, vidi zašto da ti veruje i lako šalje upit.",
      "Customers find you, quickly understand your value, see why they can trust you and easily send an inquiry."
    ),
    build: t(
      "NGC може да изработи професионална веб-страница со јасна понуда, SEO основа, силни повици за акција и процес за собирање барања. Онлајн продавница се предлага само кога има деловна смисла.",
      "NGC može da izradi profesionalni sajt sa jasnom ponudom, SEO osnovom, pozivima na akciju i procesom za upite. Onlajn prodavnica se predlaže samo kada ima poslovnog smisla.",
      "NGC can build a professional website with clear positioning, SEO foundations, strong calls to action and lead capture. E-commerce is proposed only when commercially justified."
    ),
    benefits: [
      t("Поубедливо претставување", "Ubedljivije predstavljanje", "More compelling positioning"),
      t("Полесно добивање барања", "Lakše dobijanje upita", "Easier lead capture"),
      t("Посилна основа за маркетинг", "Jača osnova za marketing", "Stronger marketing foundation"),
    ],
    closing: t(
      "Веб-страницата не треба само да изгледа добро. Треба да му помогне на клиентот да го направи следниот чекор.",
      "Sajt ne treba samo da izgleda dobro. Treba da pomogne klijentu da napravi sledeći korak.",
      "A website shouldn't just look good. It should help customers take the next step."
    ),
  },

  reporting: {
    name: t("Носи одлуки со податоци, не со претпоставки", "Donosi odluke uz podatke, ne pretpostavke", "Make decisions with data, not guesswork"),
    problem: t(
      "Кога информациите се расфрлани низ табели и извештаи, тешко навреме гледаш што функционира и каде се создаваат трошоци или застои.",
      "Kada su informacije rasute po tabelama i izveštajima, teško na vreme vidiš šta funkcioniše i gde nastaju troškovi ili zastoji.",
      "When data is scattered across spreadsheets and reports, it's difficult to see what's working and where costs or delays arise."
    ),
    vision: t(
      "Отвораш една табла и ги гледаш клучните показатели, активните процеси и трендовите што заслужуваат внимание.",
      "Otvaraš jednu tablu i vidiš ključne pokazatelje, aktivne procese i trendove koji zahtevaju pažnju.",
      "Open one dashboard to see your key indicators, active processes and trends that deserve attention."
    ),
    build: t(
      "NGC може да изработи контролна табла што ги обединува достапните податоци и ги претвора во јасни извештаи и показатели.",
      "NGC može da izradi kontrolnu tablu koja objedinjuje dostupne podatke i pretvara ih u jasne izveštaje i pokazatelje.",
      "NGC can build a dashboard that consolidates available data into clear reports and business indicators."
    ),
    benefits: [
      t("Подобра контрола на работењето", "Bolja kontrola poslovanja", "Better operational visibility"),
      t("Помалку време за рачни извештаи", "Manje vremena za ručne izveštaje", "Less time spent on manual reports"),
      t("Побрзо препознавање проблеми", "Brže prepoznavanje problema", "Earlier identification of problems"),
    ],
    closing: t(
      "Кога ги гледаш вистинските бројки, полесно одлучуваш каде да вложиш време и пари.",
      "Kada vidiš prave brojke, lakše odlučuješ gde da uložiš vreme i novac.",
      "When you see the right numbers, it's easier to decide where to invest time and money."
    ),
  },

  tracking: {
    name: t("Целосно појасен тек на испораките", "Mnogo jasniji tok isporuka", "Clearer delivery operations"),
    problem: t(
      "Кога статусите на испораките се проверуваат преку повици и пораки, тимот губи време, а клиентите потешко добиваат точни информации.",
      "Kada se statusi isporuka proveravaju pozivima i porukama, tim gubi vreme, a klijenti teže dobijaju tačne informacije.",
      "When delivery statuses require calls and messages, your team loses time and customers struggle to get accurate updates."
    ),
    vision: t(
      "На една табла гледаш активни испораки, одговорни лица, статуси и задачи што бараат внимание.",
      "Na jednoj tabli vidiš aktivne isporuke, odgovorne osobe, statuse i zadatke koji zahtevaju pažnju.",
      "One dashboard shows active deliveries, responsible staff, statuses and tasks requiring attention."
    ),
    build: t(
      "NGC може да изработи систем за следење испораки, распределба на задачи, известувања и извештаи. Следење во реално време се планира според достапните податоци и интеграции.",
      "NGC može da izradi sistem za praćenje isporuka, raspodelu zadataka, obaveštenja i izveštaje. Praćenje u realnom vremenu zavisi od dostupnih podataka i integracija.",
      "NGC can build a delivery tracking, task assignment and reporting system. Real-time visibility depends on available data and integrations."
    ),
    benefits: [
      t("Појасна координација", "Jasnija koordinacija", "Clearer coordination"),
      t("Помалку рачни проверки", "Manje ručnih provera", "Fewer manual checks"),
      t("Подобра видливост на испораките", "Bolja vidljivost isporuka", "Better delivery visibility"),
    ],
    closing: t(
      "Кога информациите се на едно место, полесно управуваш со целиот процес.",
      "Kada su informacije na jednom mestu, lakše upravljaš celim procesom.",
      "When information lives in one place, the whole operation becomes easier to manage."
    ),
  },

  schedule: {
    name: t("Организиран тим без постојан хаос", "Organizovan tim bez stalnog haosa", "A coordinated team without constant chaos"),
    problem: t(
      "Рачните распореди, промените во последен момент и задачите без јасна одговорност создаваат недоразбирања и непотребни прекини.",
      "Ručni rasporedi, promene u poslednjem trenutku i zadaci bez jasne odgovornosti stvaraju nesporazume i nepotrebne prekide.",
      "Manual schedules, last-minute changes and unclear task ownership create confusion and unnecessary interruptions."
    ),
    vision: t(
      "Секој член на тимот го гледа својот распоред, задачите и промените. Раководителот има преглед без постојани телефонски проверки.",
      "Svaki član tima vidi svoj raspored, zadatke i promene. Menadžer ima pregled bez stalnih telefonskih provera.",
      "Every team member sees their schedule, tasks and changes. Managers stay informed without constant phone calls."
    ),
    build: t(
      "NGC може да изработи систем за распореди, задачи, замени, одобренија и известувања, прилагоден на твојата организација.",
      "NGC može da izradi sistem za rasporede, zadatke, zamene, odobrenja i obaveštenja, prilagođen tvojoj organizaciji.",
      "NGC can build a tailored system for schedules, tasks, replacements, approvals and notifications."
    ),
    benefits: [
      t("Појасни распореди", "Jasniji rasporedi", "Clearer schedules"),
      t("Подобра координација на тимот", "Bolja koordinacija tima", "Better team coordination"),
      t("Помалку недоразбирања", "Manje nesporazuma", "Fewer misunderstandings"),
    ],
    closing: t(
      "Добрата организација ти овозможува да управуваш со тимот, наместо постојано да решаваш ситни проблеми.",
      "Dobra organizacija omogućava da vodiš tim umesto da stalno rešavaš sitne probleme.",
      "Good organization lets you lead your team instead of constantly solving avoidable issues."
    ),
  },

  retention: {
    name: t("Создај причина членовите да останат", "Daj članovima razlog da ostanu", "Give members more reasons to stay"),
    problem: t(
      "Кога комуникацијата и напредокот на членовите не се следат систематски, потешко препознаваш кој губи мотивација и кому му треба дополнително внимание.",
      "Kada se komunikacija i napredak članova ne prate sistematski, teže prepoznaješ ko gubi motivaciju i kome treba dodatna pažnja.",
      "Without structured member communication and progress tracking, it's harder to spot disengagement and offer timely support."
    ),
    vision: t(
      "Тренерите имаат подобар увид во активностите, членовите полесно ги следат плановите, а центарот гради поперсонализирано искуство.",
      "Treneri imaju bolji uvid u aktivnosti, članovi lakše prate planove, a centar gradi personalizovanije iskustvo.",
      "Trainers understand member activity better, members follow their plans more easily and the gym creates a more personalized experience."
    ),
    build: t(
      "NGC може да предложи NextForm AI или прилагодена фитнес платформа со тренинг-планови, комуникација и преглед на активности.",
      "NGC može da predloži NextForm AI ili prilagođenu fitnes platformu sa planovima treninga, komunikacijom i pregledom aktivnosti.",
      "NGC can propose NextForm AI or a tailored fitness platform with training plans, communication and activity tracking."
    ),
    benefits: [
      t("Подобро искуство за членовите", "Bolje iskustvo članova", "Better member experience"),
      t("Поквалитетна комуникација со тренерите", "Kvalitetnija komunikacija sa trenerima", "Stronger trainer communication"),
      t("Подобра основа за лојалност", "Bolja osnova za lojalnost", "Stronger foundation for loyalty"),
    ],
    closing: t(
      "Растот не зависи само од нови членови. Важно е и постојните да имаат причина да продолжат.",
      "Rast ne zavisi samo od novih članova. Važno je da i postojeći imaju razlog da ostanu.",
      "Growth isn't only about attracting new members. It's also about giving existing members reasons to stay."
    ),
  },

  consult: {
    name: t("Прво откриј ја вистинската можност", "Prvo otkrij pravu priliku", "Identify the right opportunity first"),
    problem: t(
      "Од одговорите се гледаат повеќе можни насоки, но не и доволно јасен приоритет за конкретен систем. Избрзана инвестиција може да решава погрешен проблем.",
      "Odgovori ukazuju na više mogućih pravaca, ali ne i dovoljno jasan prioritet za konkretan sistem. Preuranjena investicija može rešavati pogrešan problem.",
      "Your answers point to several possible improvements, but not enough evidence for one specific system. Investing too early could solve the wrong problem."
    ),
    vision: t(
      "Заедно го издвојуваме процесот што најмногу ти одзема време или ограничува раст, а потоа градиме јасен план за подобрување.",
      "Zajedno izdvajamo proces koji oduzima najviše vremena ili ograničava rast, pa pravimo jasan plan poboljšanja.",
      "Together, we identify the process consuming the most time or limiting growth, then create a focused improvement plan."
    ),
    build: t(
      "NGC предлага кратка консултација и анализа на работниот процес пред да препорачаме конкретен софтвер.",
      "NGC predlaže kratku konsultaciju i analizu procesa pre preporuke konkretnog softvera.",
      "NGC proposes a short workflow review before recommending a specific software solution."
    ),
    benefits: [
      t("Јасен прв приоритет", "Jasan prvi prioritet", "Clear first priority"),
      t("Избегнување непотребни функции", "Izbegavanje nepotrebnih funkcija", "Avoid unnecessary features"),
      t("План според реалните потреби", "Plan prema stvarnim potrebama", "A plan based on real needs"),
    ],
    closing: t(
      "Најдобрата инвестиција започнува со правилно поставен проблем.",
      "Najbolja investicija počinje pravilno postavljenim problemom.",
      "The best investment starts with identifying the right problem."
    ),
  },
};

const solutionKeys = [
  "fitness", "orders", "stock", "crm", "automation", "booking",
  "sales", "reporting", "tracking", "schedule", "retention",
] as const;

const issueMap: Record<string, Record<string, string>> = {
  fitness: {
    members: "fitness", schedule: "schedule",
    communication: "fitness", experience: "retention",
    retention: "retention", sales: "sales",
    automation: "fitness", reporting: "reporting",
  },
  hospitality: {
    orders: "orders", booking: "booking", schedule: "schedule",
    communication: "orders", automation: "orders",
    sales: "sales", reporting: "reporting",
  },
  retail: {
    stock: "stock", orders: "orders", sales: "sales",
    crm: "crm", manual: "automation", reporting: "reporting",
  },
  services: {
    crm: "crm", booking: "booking", automation: "automation",
    schedule: "schedule", sales: "sales", reporting: "reporting",
  },
  production: {
    automation: "automation", stock: "stock", orders: "orders",
    reporting: "reporting",
  },
  health: {
    booking: "booking", crm: "crm", automation: "automation",
    sales: "sales", reporting: "reporting",
  },
  logistics: {
    tracking: "tracking", schedule: "schedule",
    automation: "automation", communication: "schedule",
    reporting: "reporting",
  },
  other: {
    automation: "automation", crm: "crm", orders: "orders",
    sales: "sales", reporting: "reporting",
  },
};

function analyze(industry: string, answers: Answer[]): string {
  const map = issueMap[industry] || issueMap.other;
  const scores: Record<string, number> = {};

  const add = (value: string, weight: number) => {
    const key = map[value] || value;
    if (solutionKeys.some((id) => id === key)) {
      scores[key] = (scores[key] || 0) + weight;
    }
  };

  // Прашање 2: тековен начин на работа.
  for (const value of answers[1] || []) {
    if (value === "manual" || value === "disconnected") {
      if (industry === "fitness") add("fitness", 2);
      else if (industry === "hospitality") add("orders", 2);
      else if (industry === "retail") add("stock", 2);
      else if (industry === "health") add("booking", 2);
      else if (industry === "logistics") add("tracking", 2);
      else add("automation", 2);
    }
    if (value === "messages") {
      if (industry === "hospitality" || industry === "health") add("booking", 1);
      else if (industry === "logistics") add("schedule", 1);
      else add("crm", 1);
    }
  }

  // Прашање 3: каде се губи време.
  for (const value of answers[2] || []) add(value, 3);

  // Прашање 4: што го кочи бизнисот.
  for (const value of answers[3] || []) add(value, 5);

  // Прашање 5: што сака да постигне.
  for (const value of answers[4] || []) add(value, 4);

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  if (!ranked.length || ranked[0][1] < 4) return "consult";

  return ranked[0][0];
}

export default function BusinessCheck() {
  const { lang: rawLang } = useLanguage();
  const lang: Lang = rawLang === "sr" || rawLang === "en" ? rawLang : "mk";
  const tr = (value: Tr) => value[lang];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([[], [], [], [], []]);
  const [customIndustry, setCustomIndustry] = useState("");
  const [business, setBusiness] = useState("");
  const [note, setNote] = useState("");
  const [result, setResult] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [leadOpen,setLeadOpen] = useState(false);
  const [leadName,setLeadName] = useState("");
  const [leadEmail,setLeadEmail] = useState("");
  const [leadSent,setLeadSent] = useState(false);
  const [assessmentId,setAssessmentId] = useState("");
  const [assessmentToken,setAssessmentToken] = useState("");

  const industry = answers[0][0] || "";
  const allQuestions = [industryQuestion, ...(industries[industry] || industries.other)];
  const current = allQuestions[step];
  const selected = answers[step] || [];

  const valid =
    answers.every((answer) => answer.length > 0) &&
    (industry !== "other" || customIndustry.trim().length > 0);

  const recommendation = useMemo(
    () => analyze(industry, answers),
    [industry, answers]
  );
  const solution = solutions[recommendation] || solutions.consult;

  const choose = (id: string) => {
    if (step === 0) {
      setAnswers([[id], [], [], [], []]);
      setCustomIndustry("");
      if (id !== "other") setStep(1);
      return;
    }

    setAnswers((previous) =>
      previous.map((answer, index) => {
        if (index !== step) return answer;
        return answer.includes(id)
          ? answer.filter((value) => value !== id)
          : [...answer, id];
      })
    );
  };

  const saveAssessment = async () => {
    if (!valid || saving) return;
    setSaving(true);setSaveError("");
    try {
      const response=await fetch(convexHttpUrl()+"/business-check",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({company:business,industry:industryName,language:lang,answers,answersText,note,
          recommendation,solutionName:tr(solution.name),problem:tr(solution.problem),
          proposedSolution:tr(solution.build),benefits:solution.benefits.map(tr)})
      });
      if(!response.ok) throw new Error("Save failed");
      const saved = await response.json();
      if (!saved.id || !saved.editToken) throw new Error("Missing saved assessment");
      setAssessmentId(saved.id);
      setAssessmentToken(saved.editToken);
      if (leadName.trim() || leadEmail.trim()) {
        const contactResponse = await fetch(convexHttpUrl()+"/business-check/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:saved.id,editToken:saved.editToken,contactName:leadName.trim(),contactEmail:leadEmail.trim()})});
        if (!contactResponse.ok) console.error("Contact save failed");
      }
      setResult(true);
    } catch(e){console.error(e);setSaveError(lang==="mk"?"Не успеавме да ја зачуваме анализата. Пробај повторно.":lang==="sr"?"Analiza nije sačuvana. Pokušaj ponovo.":"Could not save the analysis. Please try again.");}
    finally{setSaving(false);}
  };

  const reset = () => {
    setStep(0);
    setAnswers([[], [], [], [], []]);
    setCustomIndustry("");
    setBusiness("");
    setNote("");
    setResult(false);
    setSaveError("");
    setLeadOpen(false);setLeadSent(false);setLeadName("");setLeadEmail("");
    setAssessmentId("");setAssessmentToken("");
  };

  const industryName =
    industry === "other"
      ? customIndustry
      : industryQuestion.options.find((item) => item.id === industry)?.label[lang] || "";

  const answersText = allQuestions
    .map((item, index) => {
      const labels = answers[index]
        .map((id) => item.options.find((option) => option.id === id)?.label[lang] || id)
        .join(", ");
      return `${index + 1}. ${tr(item.title)}\n${labels}`;
    })
    .join("\n\n");

  const sendLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(saving || !assessmentId || !assessmentToken) return;
    if(leadEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) {
      setSaveError(lang==="mk"?"Провери ја е-поштата.":lang==="sr"?"Proveri e-poštu.":"Check your email address.");return;
    }
    setSaving(true);setSaveError("");
    try {
      const response = await fetch(convexHttpUrl()+"/business-check/contact",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:assessmentId,editToken:assessmentToken,
          contactName:leadName.trim(),contactEmail:leadEmail.trim()})
      });
      if(!response.ok) throw new Error("Lead save failed");
      setLeadSent(true);
    } catch(e){console.error(e);setSaveError(lang==="mk"?"Неуспешно испраќање. Обиди се повторно.":lang==="sr"?"Slanje nije uspelo. Pokušaj ponovo.":"Could not send. Please try again.");}
    finally{setSaving(false);}
  };

  return (
    <main className="bc">
      <section className="bc-hero">
        <div className="cont">
          <div className="bc-kicker">
            <Sparkles size={15} /> NGC BUSINESS CHECK
          </div>
          <h1>{tr(ui.headline)}</h1>
          <p>{tr(ui.intro)}</p>
          <div className="bc-trust">
            <span><ShieldCheck size={16} />{tr(ui.free)}</span>
            <span><CheckCircle2 size={16} />{tr(ui.five)}</span>
            <span><Lightbulb size={16} />{tr(ui.solutions)}</span>
          </div>
        </div>
      </section>

      <section className="cont bc-main">
        {!result && step < 5 && (
          <div className="bc-panel">
            <div className="bc-progress-top">
              <span>{tr(ui.question)} {step + 1} {tr(ui.of)} 5</span>
              <span>{Math.round((step / 5) * 100)}%</span>
            </div>
            <div className="bc-progress">
              <i style={{ width: `${(step / 5) * 100}%` }} />
            </div>

            <h2>{tr(current.title)}</h2>
            <p className="bc-muted">
              {tr(step === 0 ? ui.chooseOne : ui.choose)}
            </p>

            <div className="bc-options">
              {current.options.map((option) => {
                const active = selected.includes(option.id);
                return (
                  <button
                    type="button"
                    key={option.id}
                    aria-pressed={active}
                    className={active ? "bc-selected" : ""}
                    onClick={() => choose(option.id)}
                  >
                    <span>{tr(option.label)}</span>
                    {step === 0
                      ? <ArrowRight size={19} />
                      : <span className="bc-checkbox">{active ? "✓" : ""}</span>}
                  </button>
                );
              })}
            </div>

            {step === 0 && industry === "other" && (
              <label className="bc-label">
                {tr(ui.other)}
                <input
                  value={customIndustry}
                  maxLength={100}
                  placeholder={tr(ui.otherPlaceholder)}
                  onChange={(event) => setCustomIndustry(event.target.value)}
                />
              </label>
            )}

            <div className="bc-actions">
              {step > 0 ? (
                <button type="button" className="bc-back" onClick={() => setStep(step - 1)}>
                  <ArrowLeft size={16} /> {tr(ui.back)}
                </button>
              ) : <span />}

              {(step > 0 || industry === "other") && (
                <button
                  type="button"
                  className="bc-cta"
                  disabled={
                    selected.length === 0 ||
                    (step === 0 && industry === "other" && !customIndustry.trim())
                  }
                  onClick={() => setStep(step + 1)}
                >
                  {tr(ui.next)} <ArrowRight size={17} />
                </button>
              )}
            </div>
          </div>
        )}

        {!result && step === 5 && (
          <div className="bc-panel">
            <div className="bc-progress-top">
              <span>{tr(ui.finalStep)}</span><span>100%</span>
            </div>
            <div className="bc-progress"><i style={{ width: "100%" }} /></div>
            <h2>{tr(ui.ready)}</h2>
            <p className="bc-muted">{tr(ui.optional)}</p>

            <label className="bc-label">
              {tr(ui.company)}
              <input
                value={business}
                maxLength={100}
                onChange={(event) => setBusiness(event.target.value)}
              />
            </label>

            <label className="bc-label">
              {tr(ui.note)}
              <textarea
                value={note}
                rows={3}
                maxLength={600}
                placeholder={tr(ui.notePlaceholder)}
                onChange={(event) => setNote(event.target.value)}
              />
            </label>

            <label className="bc-label">
              {lang === "mk" ? "Вашето име (незадолжително)" : lang === "sr" ? "Vaše ime (opciono)" : "Your name (optional)"}
              <input value={leadName} maxLength={100} onChange={(e) => setLeadName(e.target.value)} />
            </label>
            <label className="bc-label">
              {lang === "mk" ? "Е-пошта (незадолжително)" : lang === "sr" ? "E-pošta (opciono)" : "Email (optional)"}
              <input type="email" value={leadEmail} maxLength={200} onChange={(e) => setLeadEmail(e.target.value)} />
            </label>
            <p className="bc-privacy">{tr(ui.privacy)}</p>

            <div className="bc-actions">
              <button type="button" className="bc-back" onClick={() => setStep(4)}>
                <ArrowLeft size={16} />{tr(ui.back)}
              </button>
              <button
                type="button"
                className="bc-cta"
                disabled={!valid || saving}
                onClick={() => void saveAssessment()}
              >
                {tr(ui.show)} <ArrowRight size={17} />
              </button>
            </div>
            {saveError && <p role="alert" style={{color:"#b91c1c",marginTop:12}}>{saveError}</p>}
          </div>
        )}

        {result && (
          <div className="bc-results">
            <div className="bc-result-head">
              <div className="bc-kicker">
                <CheckCircle2 size={17} /> {tr(ui.done)}
              </div>
              <h2>{business ? `${tr(ui.for)} ${business}` : tr(ui.title)}</h2>
              <p>{tr(ui.summary)}</p>
            </div>

            <div className="bc-recommendations">
              <article>
                <div className="bc-number">
                  01 <span>{tr(ui.priority)}</span>
                </div>

                <h2 style={{ marginTop: 18, marginBottom: 22 }}>
                  {tr(solution.name)}
                </h2>

                <h3>{tr(ui.problem)}</h3>
                <p>{tr(solution.problem)}</p>

                <div className="bc-story">
                  <strong>{tr(ui.vision)}</strong>
                  <p>{tr(solution.vision)}</p>
                </div>

                <h3>{tr(ui.offer)}</h3>
                <p>{tr(solution.build)}</p>

                <h3>{tr(ui.benefits)}</h3>
                <ul className="bc-benefits">
                  {solution.benefits.map((benefit, index) => (
                    <li key={index}>{tr(benefit)}</li>
                  ))}
                </ul>

                <p className="bc-fit">
                  <strong>{tr(solution.closing)}</strong>
                </p>
              </article>
            </div>

            <div className="bc-contact">
              <h3>{tr(ui.contactTitle)}</h3>
              <p>{tr(ui.contactText)}</p>
              {!leadOpen && !leadSent && <button type="button" className="bc-cta" onClick={()=>window.location.assign("/start-project?"+new URLSearchParams({from:"business-check",service:tr(solution.name),industry:industryName,company:business,note:note}).toString())}>{tr(ui.contact)} <ArrowRight size={17}/></button>}
              {leadOpen && !leadSent && <form onSubmit={sendLead} style={{maxWidth:460,margin:"24px auto",display:"grid",gap:12,textAlign:"left"}}>
                <label>{lang==="mk"?"Име и презиме":lang==="sr"?"Ime i prezime":"Full name"}<input maxLength={100} value={leadName} onChange={e=>setLeadName(e.target.value)} style={{display:"block",width:"100%",padding:13,border:"1px solid #ccd5e7",borderRadius:10}} /></label>
                <label>{lang==="mk"?"Е-пошта":lang==="sr"?"E-pošta":"Email"}<input type="email" maxLength={200} value={leadEmail} onChange={e=>setLeadEmail(e.target.value)} style={{display:"block",width:"100%",padding:13,border:"1px solid #ccd5e7",borderRadius:10}} /></label>
                <p style={{fontSize:13,opacity:.8,margin:0}}>{lang==="mk"?"Полињата се незадолжителни. Анализата веќе е зачувана.":lang==="sr"?"Polja su opciona. Analiza je već sačuvana.":"Fields are optional. Your analysis is already saved."}</p>
                <button type="button" className="bc-back" onClick={()=>setLeadOpen(false)}>{lang==="mk"?"Прескокни":lang==="sr"?"Preskoči":"Skip"}</button>
                <button type="submit" className="bc-cta" disabled={saving}>{saving?"...":lang==="mk"?"Испрати барање":lang==="sr"?"Pošalji zahtev":"Send request"} <ArrowRight size={17}/></button>
                {saveError && <p role="alert" style={{color:"#b91c1c"}}>{saveError}</p>}
              </form>}
              {leadSent && <p role="status" style={{color:"#16803d",fontWeight:700}}>{lang==="mk"?"Барањето е успешно испратено!":lang==="sr"?"Zahtev je uspešno poslat!":"Request sent successfully!"}</p>}
            </div>

            <div className="bc-actions"><button type="button" className="bc-back" onClick={()=>{setResult(false);setStep(5);}}><ArrowLeft size={16} />{tr(ui.back)}</button><button type="button" className="bc-cta" onClick={reset}>{lang==="mk"?"Заврши":lang==="sr"?"Završi":"Finish"} <CheckCircle2 size={17}/></button></div><button type="button" className="bc-back" onClick={reset}>
              <RotateCcw size={16} />{tr(ui.restart)}
            </button>
          </div>
        )}

        <p className="bc-disclaimer">{tr(ui.disclaimer)}</p>
        <Link className="bc-home" href="/">← {tr(ui.home)}</Link>
      </section>
    </main>
  );
}
