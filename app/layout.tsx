import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import type React from "react";
import { LanguageProvider } from "./contexts/language-context";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "ngc | Creative Web Solutions",
  description: "Crafting digital experiences with purpose and precision",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} font-sans bg-neutral-50 text-neutral-900`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
