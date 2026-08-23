"use client";

import Link from "next/link";
import { useLanguage } from "@/components/Language";

export default function ThankYou() {
  const { lang } = useLanguage();

  const copyByLanguage = {
    mk: {
      title: "Благодариме.",
      text: "Вашето барање е успешно испратено. Ќе ви одговориме што е можно побрзо.",
      back: "Назад на почетна",
    },
    sr: {
      title: "Hvala.",
      text: "Vaš zahtev je uspešno poslat. Odgovorićemo vam što je pre moguće.",
      back: "Nazad na početnu",
    },
    en: {
      title: "Thank you.",
      text: "Your request was sent successfully. We’ll get back to you as soon as possible.",
      back: "Back to home",
    },
  } as const;

  const safeLang: keyof typeof copyByLanguage =
    lang === "sr" ? "sr" : lang === "en" ? "en" : "mk";

  const copy = copyByLanguage[safeLang];

  return (
    <main className="thankPage cont">
      <div className="thankMark">✓</div>

      <h1>{copy.title}</h1>

      <p>{copy.text}</p>

      <Link href="/" className="primary">
        {copy.back} →
      </Link>
    </main>
  );
}