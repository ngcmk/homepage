"use client";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "./Language";
import Header from "./Header";
import Footer from "./Footer";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return <>{children}</>;
  return <LanguageProvider><Header />{children}<Footer /></LanguageProvider>;
}
